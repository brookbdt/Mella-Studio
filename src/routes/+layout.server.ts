import type { LayoutServerLoad } from './$types';
import { PUBLIC_TENANT_ID } from '$env/static/public';

export const load: LayoutServerLoad = async () => {
    // For now, return minimal data structure
    // This can be expanded later to include server-side CMS fetching
    return {
        cms: {
            tenantId: PUBLIC_TENANT_ID,
            // Add server-side CMS data here later
            // For now, client-side fetching will handle CMS data
            serverRendered: false
        }
    };
}; 