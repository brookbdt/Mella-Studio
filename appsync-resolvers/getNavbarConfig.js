import { util } from '@aws-appsync/utils'

/**
 * Resolver for getNavbarConfig query
 * Fetches navbar configuration for MellaStudio CMS
 */

export function request(ctx) {
    const { tenantId } = ctx.arguments

    console.log('🧭 getNavbarConfig request for tenant:', tenantId)

    return {
        operation: 'Invoke',
        payload: {
            field: 'getNavbarConfig',
            arguments: { tenantId },
            request: {
                headers: ctx.request.headers,
                body: JSON.stringify(ctx.request)
            }
        },
    }
}

export function response(ctx) {
    if (ctx.error) {
        console.error('❌ getNavbarConfig Lambda error:', ctx.error)
        util.error(ctx.error.message, ctx.error.type)
    }

    const result = ctx.result

    if (result && result.error) {
        console.error('❌ getNavbarConfig business logic error:', result.error)
        util.error(result.error, 'CMS_ERROR')
    }

    console.log('✅ getNavbarConfig success:', result ? 'Config found' : 'No config')
    return result || null
} 