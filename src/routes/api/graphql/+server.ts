import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
    PUBLIC_APPSYNC_API_URL,
    PUBLIC_APPSYNC_API_KEY,
    PUBLIC_TENANT_ID
} from '$env/static/public';

import { signRequest } from '$lib/utils/crypto';
import { CMS_SERVICE_SECRET } from '$env/static/private';

export const POST: RequestHandler = async ({ request, fetch }) => {
    try {
        // Parse the GraphQL request
        const { query, variables, operationName } = await request.json();

        // Add tenant ID to variables if not present
        const requestVariables = {
            ...variables,
            tenantId: variables?.tenantId || PUBLIC_TENANT_ID
        };

        console.log('🔗 GraphQL Proxy:', {
            operationName,
            hasTenantId: !!requestVariables.tenantId,
            endpoint: PUBLIC_APPSYNC_API_URL
        });

        // Prepare request body
        const requestBody = JSON.stringify({
            query,
            variables: requestVariables,
            operationName
        });

        // Sign the request for production security
        const serviceSecret = CMS_SERVICE_SECRET;
        console.log('serviceSecret', serviceSecret);
        const signedAuth = signRequest({
            method: 'POST',
            path: '/graphql',
            body: requestBody,
            tenantId: requestVariables.tenantId,
            serviceId: 'mellastudio-cms',
            secret: serviceSecret
        });
        console.log('signedAuth', signedAuth);

        console.log('API KEY being sent →', PUBLIC_APPSYNC_API_KEY);
        // Forward to AppSync with enhanced security headers
        const response = await fetch(PUBLIC_APPSYNC_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': PUBLIC_APPSYNC_API_KEY,
                'x-tenant-id': requestVariables.tenantId,
                // Enhanced security headers
                'x-service-id': signedAuth.serviceId,
                'x-service-timestamp': signedAuth.timestamp.toString(),
                'x-service-signature': signedAuth.signature,
                'x-source-service': 'mellastudio'
            },
            body: requestBody
        });

        if (!response.ok) {
            console.error('❌ AppSync request failed:', response.status, response.statusText);
            const errorText = await response.text();
            return json(
                {
                    error: 'GraphQL request failed',
                    details: errorText
                },
                { status: response.status }
            );
        }

        const result = await response.json();

        // Log errors if any
        if (result.errors && result.errors.length > 0) {
            console.warn('⚠️ GraphQL errors:', result.errors);
        }

        return json(result);

    } catch (error) {
        console.error('💥 GraphQL proxy error:', error);
        return json(
            {
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}; 