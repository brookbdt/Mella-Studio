import { util } from '@aws-appsync/utils'

/**
 * Resolver for getHeroSections query
 * Fetches hero sections for MellaStudio CMS
 */

export function request(ctx) {
    const { tenantId } = ctx.arguments

    console.log('🎯 getHeroSections request for tenant:', tenantId)

    return {
        operation: 'Invoke',
        payload: {
            field: 'getHeroSections',
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
        console.error('❌ getHeroSections Lambda error:', ctx.error)
        util.error(ctx.error.message, ctx.error.type)
    }

    const result = ctx.result

    if (result && result.error) {
        console.error('❌ getHeroSections business logic error:', result.error)
        util.error(result.error, 'CMS_ERROR')
    }

    // Ensure we return an array even if no results
    const heroSections = Array.isArray(result) ? result : []
    console.log(`✅ getHeroSections success: ${heroSections.length} sections found`)

    return heroSections
} 