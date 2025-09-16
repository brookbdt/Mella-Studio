import { util } from '@aws-appsync/utils'

/**
 * Resolver for getFeaturedProducts query
 * Fetches featured products for MellaStudio CMS
 */

export function request(ctx) {
    const { tenantId, limit } = ctx.arguments

    console.log('⭐ getFeaturedProducts request for tenant:', tenantId, 'limit:', limit)

    return {
        operation: 'Invoke',
        payload: {
            field: 'getFeaturedProducts',
            arguments: { tenantId, limit },
            request: {
                headers: ctx.request.headers,
                body: JSON.stringify(ctx.request)
            }
        },
    }
}

export function response(ctx) {
    if (ctx.error) {
        console.error('❌ getFeaturedProducts Lambda error:', ctx.error)
        util.error(ctx.error.message, ctx.error.type)
    }

    const result = ctx.result

    if (result && result.error) {
        console.error('❌ getFeaturedProducts business logic error:', result.error)
        util.error(result.error, 'CMS_ERROR')
    }

    console.log('✅ getFeaturedProducts success:', result ? `${result.length} products found` : 'No products')
    return result || []
} 