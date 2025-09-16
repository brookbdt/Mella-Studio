import type { NavbarConfig, Product } from '$lib/types/cms';

// Utility function to validate navbar config
export function validateNavbarConfig(config: unknown): config is NavbarConfig {
    if (!config || typeof config !== 'object') return false;

    const c = config as Record<string, unknown>;

    return (
        typeof c.id === 'string' &&
        typeof c.tenantId === 'string' &&
        typeof c.logo === 'object' &&
        Array.isArray(c.centerNavigation) &&
        Array.isArray(c.rightNavigation) &&
        typeof c.searchConfig === 'object' &&
        typeof c.cartConfig === 'object' &&
        typeof c.styling === 'object'
    );
}

// Utility function to validate product
export function validateProduct(product: unknown): product is Product {
    if (!product || typeof product !== 'object') return false;

    const p = product as Record<string, unknown>;

    return (
        typeof p.id === 'string' &&
        typeof p.tenantId === 'string' &&
        typeof p.name === 'string' &&
        typeof p.slug === 'string' &&
        typeof p.price === 'number'
    );
}

// Utility function to sort navigation items by order
export function sortNavigationItems<T extends { order: number }>(items: T[]): T[] {
    return [...items].sort((a, b) => a.order - b.order);
}

// Utility function to filter active items
export function filterActiveItems<T extends { isActive?: boolean }>(items: T[]): T[] {
    return items.filter(item => item.isActive !== false);
}

// Utility function to get image URL with CDN fallback
export function getImageUrl(imageUrl: string, fallback?: string): string {
    if (!imageUrl) return fallback || '';

    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) return imageUrl;

    // If it's a relative path, you might want to add your CDN base URL here
    // For now, return as is
    return imageUrl;
}

// Utility function to format price
export function formatPrice(price: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(price);
}

// Utility function to create a slug from text
export function createSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Utility function to handle CMS errors gracefully
export function handleCMSError(error: unknown, context: string): string {
    console.error(`CMS Error in ${context}:`, error);

    if (error instanceof Error) {
        return `Failed to load ${context}: ${error.message}`;
    }

    return `Failed to load ${context}: Unknown error`;
}

// Type guard for checking if we're in browser environment
export function isBrowser(): boolean {
    return typeof window !== 'undefined';
}
