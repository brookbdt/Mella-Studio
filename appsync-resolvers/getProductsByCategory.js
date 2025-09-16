import { util } from '@aws-appsync/utils'

/**
 * Resolver for getProductsByCategory query
 * Fetches products by category for MellaStudio CMS
 */

export function request(ctx) {
    const { tenantId, category, limit } = ctx.arguments

    console.log('📂 getProductsByCategory request for tenant:', tenantId, 'category:', category, 'limit:', limit)

    return {
        operation: 'Invoke',
        payload: {
            field: 'getProductsByCategory',
            arguments: { tenantId, category, limit },
            request: {
                headers: ctx.request.headers,
                body: JSON.stringify(ctx.request)
            }
        },
    }
}

export function response(ctx) {
    if (ctx.error) {
        console.error('❌ getProductsByCategory Lambda error:', ctx.error)
        util.error(ctx.error.message, ctx.error.type)
    }

    const result = ctx.result

    if (result && result.error) {
        console.error('❌ getProductsByCategory business logic error:', result.error)
        util.error(result.error, 'CMS_ERROR')
    }

    // Ensure we return an array even if no results
    const products = Array.isArray(result) ? result : []
    console.log(`✅ getProductsByCategory success: ${products.length} products found for category '${ctx.arguments.category}'`)

    return products
} 