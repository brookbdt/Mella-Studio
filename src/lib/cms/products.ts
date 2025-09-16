import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { executeGraphQLQuery } from '$lib/graphql/client';
import { PUBLIC_TENANT_ID } from '$env/static/public';

// Raw API response interfaces (snake_case from GraphQL)
export interface ProductFileRaw {
    id: string;
    file_key: string;
    file_name: string;
    file_type: string;
    file_url?: string;
    order_index?: number;
    image_type?: string;
}

export interface ProductRaw {
    id: string;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    product_price: number;
    product_cost?: number;
    featured: boolean;
    status: string;
    display_order: number;
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string;
    published_at?: string;
    category_name?: string;
    brand_name?: string;
    product_files: ProductFileRaw[];
    cms_metadata?: string;
    created_at: string;
    updated_at: string;
}

// Frontend interfaces (camelCase for component consumption)
export interface ProductImage {
    id: string;
    fileKey: string;
    fileName: string;
    fileType: string;
    fileUrl: string;
    orderIndex: number;
    imageType: 'primary' | 'hover' | 'gallery';
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    price: number;
    originalPrice?: number;
    featured: boolean;
    status: string;
    displayOrder: number;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    publishedAt?: string;
    categoryName?: string;
    brandName?: string;
    images: ProductImage[];
    cmsMetadata?: string;
    createdAt: string;
    updatedAt: string;
}

// Legacy alias for backward compatibility
export type FeaturedProduct = Product;

// Mapping function to convert raw API data to frontend format
function mapProductFromRaw(rawProduct: ProductRaw): Product {
    return {
        id: rawProduct.id,
        name: rawProduct.name,
        slug: rawProduct.slug,
        description: rawProduct.description,
        shortDescription: rawProduct.short_description,
        price: rawProduct.product_price,
        originalPrice: rawProduct.product_cost,
        featured: rawProduct.featured,
        status: rawProduct.status,
        displayOrder: rawProduct.display_order,
        seoTitle: rawProduct.seo_title,
        seoDescription: rawProduct.seo_description,
        seoKeywords: rawProduct.seo_keywords,
        publishedAt: rawProduct.published_at,
        categoryName: rawProduct.category_name,
        brandName: rawProduct.brand_name,
        images: rawProduct.product_files?.map((file: ProductFileRaw, index) => ({
            id: file.id,
            fileKey: file.file_key,
            fileName: file.file_name,
            fileType: file.file_type,
            fileUrl: file.file_url || file.file_key, // Use file_url from database or file_key as fallback
            orderIndex: file.order_index ?? index,
            imageType: (file.image_type === 'primary' || file.image_type === 'hover' || file.image_type === 'gallery')
                ? file.image_type
                : (index === 0 ? 'primary' : index === 1 ? 'hover' : 'gallery') as 'primary' | 'hover' | 'gallery'
        })) || [],
        cmsMetadata: rawProduct.cms_metadata,
        createdAt: rawProduct.created_at,
        updatedAt: rawProduct.updated_at
    };
}

// GraphQL queries for products
const GET_FEATURED_PRODUCTS = `
	query GetFeaturedProducts($tenantId: String!, $limit: Int = 6) {
		getFeaturedProducts(tenantId: $tenantId, limit: $limit) {
			id
			name
			slug
			description
			short_description
			product_price
			product_cost
			featured
			status
			display_order
			seo_title
			seo_description
			seo_keywords
			published_at
			category_name
			brand_name
			product_files {
				id
				file_key
				file_name
				file_type
				file_url
				order_index
				image_type
			}
			cms_metadata
			created_at
			updated_at
		}
	}
`;

const GET_PRODUCTS_BY_CATEGORY = `
	query GetProductsByCategory($tenantId: String!, $category: String!, $limit: Int) {
		getProductsByCategory(tenantId: $tenantId, category: $category, limit: $limit) {
			id
			tenantId
			name
			slug
			description
			shortDescription
			imageUrl
			category
			price
			originalPrice
			inStock
			featured
			createdAt
			updatedAt
		}
	}
`;

// Product stores
export const featuredProducts = writable<Product[]>([]);
export const productsLoading = writable<boolean>(false);
export const productsError = writable<string | null>(null);

// Products by category store
export const productsByCategory = writable<Record<string, Product[]>>({});

// Derived store for products ready state
export const productsReady = derived(
    [featuredProducts, productsLoading],
    ([$featuredProducts, $productsLoading]) => {
        return $featuredProducts.length > 0 && !$productsLoading;
    }
);

// Derived store for published featured products (backward compatibility)
export const publishedFeaturedProducts = derived(
    featuredProducts,
    ($featuredProducts) => {
        return $featuredProducts.filter(product => product.featured && product.status === 'published');
    }
);

// Function to fetch featured products
export async function fetchFeaturedProducts(
    limit: number = 6,
    options?: { fetch?: typeof fetch }
): Promise<Product[]> {
    if (!browser) return [];

    productsLoading.set(true);
    productsError.set(null);

    try {
        const result = await executeGraphQLQuery(
            GET_FEATURED_PRODUCTS,
            { tenantId: PUBLIC_TENANT_ID, limit },
            'GetFeaturedProducts',
            {
                fetch: options?.fetch,
                tenantId: PUBLIC_TENANT_ID
            }
        );

        if (result?.getFeaturedProducts) {
            const rawProducts = result.getFeaturedProducts as ProductRaw[];
            const products = rawProducts.map(mapProductFromRaw);
            featuredProducts.set(products);
            return products;
        } else {
            featuredProducts.set([]);
            return [];
        }
    } catch (error) {
        console.error('Error fetching featured products:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
        productsError.set(errorMessage);
        featuredProducts.set([]);
        return [];
    } finally {
        productsLoading.set(false);
    }

}

// Function to fetch products by category
export async function fetchProductsByCategory(
    category: string,
    limit?: number,
    options?: { fetch?: typeof fetch }
): Promise<Product[]> {
    if (!browser) return [];

    try {
        const result = await executeGraphQLQuery(
            GET_PRODUCTS_BY_CATEGORY,
            { tenantId: PUBLIC_TENANT_ID, category, limit },
            'GetProductsByCategory',
            {
                fetch: options?.fetch,
                tenantId: PUBLIC_TENANT_ID
            }
        );

        if (result?.getProductsByCategory) {
            const rawProducts = result.getProductsByCategory as ProductRaw[];
            const products = rawProducts.map(mapProductFromRaw);

            // Update category store
            productsByCategory.update(current => ({
                ...current,
                [category]: products
            }));

            return products;
        } else {
            return [];
        }
    } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
        return [];
    }
}

// Function to refresh products
export async function refreshProducts(options?: { fetch?: typeof fetch }): Promise<Product[]> {
    featuredProducts.set([]); // Clear current products
    return fetchFeaturedProducts(6, options);
}

export const formatProductPrice = (price: number, originalPrice?: number) => {
    if (!price) return { price: 'Price on request', hasDiscount: false };
    const formattedPrice = `$${price.toLocaleString()}`;
    const formattedOriginalPrice = originalPrice ? `$${originalPrice.toLocaleString()}` : undefined;
    const hasDiscount = !!(originalPrice && originalPrice > price);
    return { price: formattedPrice, originalPrice: formattedOriginalPrice, hasDiscount };
}
