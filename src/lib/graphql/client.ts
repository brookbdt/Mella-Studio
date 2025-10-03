import { browser } from '$app/environment';

// TypeScript declaration for window.__env
declare global {
    interface Window {
        __env?: {
            PUBLIC_APPSYNC_API_URL?: string;
            VITE_APPSYNC_API_KEY?: string;
            AWS_REGION?: string;
            [key: string]: string | undefined;
        };
    }
}

// Define proper types for the Apollo client
type ApolloClientType = unknown; // Will be properly typed through dynamic imports

// Define a placeholder for the Apollo client
let apolloClient: ApolloClientType | null = null;

// Polyfill for 'global' in browser environment
if (browser && typeof window !== 'undefined') {
    window.global = window;
}

// Only execute Apollo-related code in the browser
if (browser) {
    // Import all required modules
    const initApollo = async () => {
        try {
            // Dynamically import all required modules
            const [apolloCore, apolloLinkError, apolloLinkHttp] = await Promise.all([
                import('@apollo/client/core'),
                import('@apollo/client/link/error'),
                import('@apollo/client/link/http')
            ]);

            // Access the PUBLIC environment variables through window
            const APPSYNC_API_URL =
                ((window as unknown) as { __env?: Record<string, string> }).__env?.APPSYNC_API_URL ||
                'https://jepidlb7t5gyhjygnp2sziyxku.appsync-api.il-central-1.amazonaws.com/graphql';

            if (!APPSYNC_API_URL) {
                console.error(
                    'Missing AppSync API URL in client environment. Make sure __env is properly set in +layout.server.ts'
                );
                console.debug('Available window.__env:', (window as unknown as { __env?: Record<string, string> }).__env);
                return createFallbackClient();
            }

            const { ApolloClient, InMemoryCache } = apolloCore;
            const { createHttpLink } = apolloLinkHttp;
            const { onError } = apolloLinkError;

            // Always use the proxy endpoint by default
            const httpLink = createHttpLink({
                uri: '/api/graphql'
            });

            // Error handling link
            const errorLink = onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) =>
                        console.error(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    );
                if (networkError) console.error(`[Network error]:`, networkError);
            });

            // Create Apollo Client with proxy endpoint
            return new ApolloClient({
                link: errorLink.concat(httpLink),
                cache: new InMemoryCache(),
                ssrMode: false,
                devtools: {
                    enabled: true,
                    name: 'MellaStudio Apollo Client'
                }
            });
        } catch (error) {
            console.error('Error initializing Apollo client:', error);
            return createFallbackClient();
        }
    };

    // Create a fallback Apollo client that uses our API proxy
    const createFallbackClient = async () => {
        try {
            const [apolloCore, apolloLinkError, apolloLinkHttp] = await Promise.all([
                import('@apollo/client/core'),
                import('@apollo/client/link/error'),
                import('@apollo/client/link/http')
            ]);

            const { ApolloClient, InMemoryCache } = apolloCore;
            const { onError } = apolloLinkError;
            const { createHttpLink } = apolloLinkHttp;

            // Create a client that uses our API proxy
            const httpLink = createHttpLink({
                uri: '/api/graphql'
            });

            const errorLink = onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) =>
                        console.error(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                        )
                    );
                if (networkError) console.error(`[Network error]:`, networkError);
            });

            return new ApolloClient({
                link: errorLink.concat(httpLink),
                cache: new InMemoryCache(),
                ssrMode: false
            });
        } catch (err) {
            console.error('Error creating fallback Apollo client:', err);
            return null;
        }
    };

    // Initialize Apollo Client
    initApollo()
        .then((client) => {
            apolloClient = client;
            console.log('MellaStudio Apollo client initialized');
        })
        .catch((err) => {
            console.error('Failed to initialize Apollo client:', err);
        });
}

/**
 * Get the Apollo client instance
 * @returns The Apollo client or null if not initialized or in SSR
 */
export function getApolloClient(): ApolloClientType | null {
    if (!browser) {
        console.warn('Attempted to access Apollo client in SSR context');
        return null;
    }

    if (!apolloClient) {
        console.warn('Apollo client not initialized yet');
        return null;
    }

    return apolloClient;
}

// Define types for public env variables
interface EnvVariables {
    PUBLIC_APPSYNC_API_URL?: string;
    APPSYNC_API_KEY?: string;
}

// Get environment variables based on context (browser or server)
const getEnvVariables = (): EnvVariables => {
    // Client-side environment variables accessible through import.meta.env
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return {
            PUBLIC_APPSYNC_API_URL: import.meta.env.VITE_PUBLIC_APPSYNC_API_URL,
            APPSYNC_API_KEY: import.meta.env.VITE_APPSYNC_API_KEY
        };
    }

    // Server-side environment variables accessible through process.env
    if (typeof process !== 'undefined' && process.env) {
        return {
            PUBLIC_APPSYNC_API_URL: process.env.PUBLIC_APPSYNC_API_URL,
            APPSYNC_API_KEY: process.env.APPSYNC_API_KEY
        };
    }

    return {};
};

/**
 * Execute a GraphQL query against the AppSync API
 */
export async function executeGraphQLQuery(
    query: string,
    variables?: Record<string, unknown>,
    operationName?: string,
    options?: {
        fetch?: typeof fetch;
        authMode?: 'API_KEY' | 'COGNITO';
        tenantId?: string;
    }
) {
    const env = getEnvVariables();

    // Add tenant ID to variables if provided
    if (options?.tenantId) {
        variables = { ...variables, tenantId: options.tenantId };
    }

    console.log('🔎 executeGraphQLQuery invoked:', {
        operation: operationName,
        envVariables: {
            hasPublicApiUrl: !!env.PUBLIC_APPSYNC_API_URL,
            hasApiKey: !!env.APPSYNC_API_KEY
        },
        authMode: options?.authMode || 'API_KEY',
        context: browser ? 'browser' : 'server'
    });

    // Get the fetch function to use
    const customFetch = options?.fetch || fetch;

    // Use SvelteKit proxy in browser context for HMAC authentication
    // Use AppSync directly in server context
    let endpoint: string;
    let headers: Record<string, string>;

    if (browser) {
        // Browser context: use SvelteKit proxy that adds HMAC headers
        endpoint = '/api/graphql';
        headers = {
            'Content-Type': 'application/json'
        };
    } else {
        // Server context: call AppSync directly with API key
        endpoint = env.PUBLIC_APPSYNC_API_URL ||
            'https://jepidlb7t5gyhjygnp2sziyxku.appsync-api.il-central-1.amazonaws.com/graphql';

        const apiKey = env.APPSYNC_API_KEY || 'da2-ydbgpg63dje7xdd45woks4irqy';

        headers = {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        };

        // Check for server context with relative URL but no custom fetch
        if (endpoint.startsWith('/') && customFetch === fetch) {
            throw new Error(
                'Cannot use relative URL (' +
                endpoint +
                ') with global fetch — use `event.fetch` instead: ' +
                'https://svelte.dev/docs/kit/web-standards#fetch-apis'
            );
        }
    }

    try {
        console.log(`🚀 Executing ${operationName || 'GraphQL operation'} via ${browser ? 'SvelteKit proxy' : 'direct AppSync'}`);

        const requestBody = JSON.stringify({
            query,
            variables,
            operationName
        });

        const response = await customFetch(endpoint, {
            method: 'POST',
            headers,
            body: requestBody
        });

        console.log(`📥 Response status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ GraphQL request failed: ${response.status} ${response.statusText}`);
            throw new Error(`GraphQL request failed: ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();

        if (result.errors && result.errors.length > 0) {
            console.error('❌ GraphQL response contains errors:', JSON.stringify(result.errors, null, 2));
            return result;
        }

        return result.data;
    } catch (error) {
        console.error('💥 Error executing GraphQL query:', error);
        throw error;
    }
}

export { apolloClient }; 