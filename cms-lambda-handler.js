/**
 * Lambda function for MellaStudio CMS operations
 * Handles public-facing content queries with HMAC authentication
 */

const { Pool } = require('pg');
const { SecretsManager } = require('@aws-sdk/client-secrets-manager');
const crypto = require('crypto');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// S3 Configuration for DigitalOcean Spaces
const S3_CONFIG = {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.AWS_REGION,
    bucket: process.env.S3_BUCKET,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
};

// Initialize S3 client
const s3Client = new S3Client({
    endpoint: S3_CONFIG.endpoint,
    region: S3_CONFIG.region,
    credentials: S3_CONFIG.credentials,
    forcePathStyle: false // DigitalOcean Spaces uses virtual-hosted-style
});

/**
 * Generate presigned URL for S3 object
 */
async function generatePresignedUrl(fileKey) {
    try {
        if (!fileKey) return null;

        const command = new GetObjectCommand({
            Bucket: S3_CONFIG.bucket,
            Key: fileKey,
        });

        const url = await getSignedUrl(s3Client, command, {
            expiresIn: 3600 // URL expires in 1 hour
        });

        return url;
    } catch (error) {
        console.error(`❌ Error generating presigned URL for key ${fileKey}:`, error);
        return null;
    }
}

// Helper function to get GraphQL query from field name
function getGraphQLQueryFromField(field) {
    const queries = {
        'getNavbarConfig': `
	query GetNavbarConfig($tenantId: String!) {
		getNavbarConfig(tenantId: $tenantId) {
			id
			tenantId
			logo {
				src
				alt
				text
				href
			}
			centerNavigation {
				text
				href
				target
			}
			rightNavigation {
				text
				href
				target
			}
			searchConfig {
				placeholder
				enabled
			}
			cartConfig {
				enabled
				itemCount
			}
			styling {
				heroOverlayStyles {
					backgroundColor
					textColor
					
					
					
					
				}
				scrolledStyles {
					backgroundColor
					textColor
					
					
					
					
				}
			}
			createdAt
			updatedAt
		}
	}
`,
        'getHeroSections': `
    query GetHeroSections($tenantId: String!) {
        getHeroSections(tenantId: $tenantId) {
            id
            tenantId
            badge
            headline
            subtitle
            firstWordStyle { 
                fontFamily
                fontWeight
                color
            }
            lastWordStyle {
                fontFamily
                fontWeight
                color
                fontStyle
            }
            cta {
                text
                href
            }
            backgroundMedia {
                desktop
                mobile
            }
            isActive
            order
            createdAt
            updatedAt
        }
    }
`,
        'getFeaturedProducts': `
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
`,
        'getProductsByCategory': `
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
`
    };

    return queries[field] || '';
}


// Helper function to get operation name from field name
function getOperationNameFromField(field) {
    const operationNames = {
        'getNavbarConfig': 'GetNavbarConfig',
        'getHeroSections': 'GetHeroSections',
        'getFeaturedProducts': 'GetFeaturedProducts',
        'getProductsByCategory': 'GetProductsByCategory'
    };

    return operationNames[field] || field;
}

// HMAC verification function (same as in AppSync authorizer)
function verifyRequest(method, path, body, tenantId, serviceId, timestamp, signature, secret) {
    // Check timestamp (5 minute window)
    const now = Date.now();
    const timestampWindow = 5 * 60 * 1000; // 5 minutes

    if (Math.abs(now - timestamp) > timestampWindow) {
        return { valid: false, reason: 'Request timestamp too old' };
    }

    // Create canonical request string
    const canonicalRequest = [
        method.toUpperCase(),
        path,
        tenantId,
        serviceId,
        timestamp.toString(),
        body || ''
    ].join('\n');

    // Create expected signature
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(canonicalRequest)
        .digest('hex');

    // Use timing-safe comparison
    const signatureBuffer = Buffer.from(signature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (signatureBuffer.length !== expectedBuffer.length) {
        return { valid: false, reason: 'Invalid signature length' };
    }

    const isValid = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);

    return {
        valid: isValid,
        reason: isValid ? undefined : 'Invalid signature'
    };
}

// Verify HMAC authentication
function verifyAuthentication(event) {
    const headers = event.request?.headers || {};

    // Extract authentication headers
    const serviceId = headers['x-service-id'];
    const timestamp = parseInt(headers['x-service-timestamp']);
    const signature = headers['x-service-signature'];
    const tenantId = headers['x-tenant-id'];

    console.log('event.request.headers', event.request.headers);

    // Validate required headers
    if (!serviceId || !timestamp || !signature || !tenantId) {
        throw new Error('Missing required authentication headers');
    }

    // Validate service ID
    const serviceSecret = process.env.MELLASTUDIO_SERVICE_SECRET;
    console.log('serviceSecret', serviceSecret);
    if (!serviceSecret) {
        throw new Error('Service secret not configured');
    }

    if (serviceId !== 'mellastudio-cms') {
        throw new Error(`Unknown service: ${serviceId}`);
    }

    // Validate tenant
    const allowedTenants = ['23b5b436-cb52-4a97-baaa-dc37f86b6d19'];
    if (!allowedTenants.includes(tenantId)) {
        throw new Error(`Unauthorized tenant: ${tenantId}`);
    }

    // Reconstruct the original GraphQL request body that was signed
    // The frontend signs the GraphQL request: { query, variables, operationName }
    // We need to reconstruct this from the AppSync event
    const originalRequestBody = JSON.stringify({
        query: getGraphQLQueryFromField(event.field),
        variables: event.arguments || {},
        operationName: getOperationNameFromField(event.field)
    });

    console.log('Reconstructed request body for verification:', originalRequestBody);

    // Verify request signature using the reconstructed body
    const verification = verifyRequest(
        'POST',
        '/graphql',
        originalRequestBody,
        tenantId,
        serviceId,
        timestamp,
        signature,
        serviceSecret
    );

    if (!verification.valid) {
        throw new Error(`Authentication failed: ${verification.reason}`);
    }

    return { tenantId, serviceId };
}

/**
 * Main Lambda handler
 */
exports.handler = async (event) => {
    console.log('🎨 CMS Lambda Handler - Received event:', JSON.stringify(event, null, 2));

    // Verify authentication
    let authContext;
    try {
        authContext = verifyAuthentication(event);
        console.log('✅ Authentication successful:', authContext);
    } catch (error) {
        console.error('❌ Authentication failed:', error.message);
        return formatErrorResponse(`Authentication failed: ${error.message}`);
    }

    // Get database credentials from Secrets Manager
    const secretsManager = new SecretsManager();
    let secret;
    try {
        const secretData = await secretsManager.getSecretValue({
            SecretId: process.env.DB_SECRET_NAME
        });
        secret = JSON.parse(secretData.SecretString);
    } catch (error) {
        console.error('Error retrieving database credentials:', error);
        return formatErrorResponse('Database configuration error');
    }

    // Configure database connection
    const pool = new Pool({
        host: process.env.AURORA_PROXY_ENDPOINT,
        database: process.env.DB_NAME || 'pulseERP',
        user: secret.username,
        password: secret.password,
        port: parseInt(process.env.AURORA_DB_PORT || '5432'),
        ssl: {
            rejectUnauthorized: false
        },
        max: 5,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
    });

    // Extract operation information from event
    const { field } = event;
    const args = event.arguments || {};

    // Add tenant from auth context
    args.tenantId = authContext.tenantId;

    try {
        // Test database connectivity
        await pool.query('SELECT 1');

        // Route to appropriate handler based on field name
        switch (field) {
            case 'getNavbarConfig':
                return await getNavbarConfig(pool, args);

            case 'getHeroSections':
                return await getHeroSections(pool, args);

            case 'getFeaturedProducts':
                return await getFeaturedProducts(pool, args);

            case 'getProductsByCategory':
                return await getProductsByCategory(pool, args);

            default:
                console.error(`Unsupported CMS field: ${field}`);
                return formatErrorResponse(`Unsupported CMS operation: ${field}`);
        }
    } catch (error) {
        console.error(`Error processing CMS ${field} operation:`, error);
        return formatErrorResponse(error.message);
    } finally {
        // Close the pool to prevent connection leaks
        try {
            await pool.end();
        } catch (err) {
            console.error('Error closing pool:', err);
        }
    }
};

/**
 * Get navbar configuration for a tenant
 */
async function getNavbarConfig(pool, { tenantId }) {
    try {
        console.log(`🧭 Getting navbar config for tenant: ${tenantId}`);

        const query = `
            SELECT 
                id,
                tenant_id as "tenantId",
                logo_config as "logoConfig",
                center_navigation as "centerNavigation",
                right_navigation as "rightNavigation",
                search_config as "searchConfig",
                cart_config as "cartConfig",
                styling,
                created_at as "createdAt",
                updated_at as "updatedAt"
            FROM cms_navbar_config 
            WHERE tenant_id = $1
            ORDER BY created_at DESC
            LIMIT 1
        `;

        const result = await pool.query(query, [tenantId]);

        if (result.rows.length === 0) {
            console.log(`No navbar config found for tenant ${tenantId}`);
            return null;
        }

        const config = result.rows[0];
        console.log(`✅ Found navbar config for tenant ${tenantId}`);

        return {
            id: config.id,
            tenantId: config.tenantId,
            logo: config.logoConfig,
            centerNavigation: config.centerNavigation,
            rightNavigation: config.rightNavigation,
            searchConfig: config.searchConfig,
            cartConfig: config.cartConfig,
            styling: config.styling,
            createdAt: config.createdAt,
            updatedAt: config.updatedAt
        };
    } catch (error) {
        console.error('Error getting navbar config:', error);
        throw error;
    }
}

/**
 * Get hero sections for a tenant
 */
async function getHeroSections(pool, { tenantId }) {
    try {
        console.log(`🎯 Getting hero sections for tenant: ${tenantId}`);

        const query = `
            SELECT 
                id,
                tenant_id as "tenantId",
                badge,
                headline,
                subtitle,
                first_word_style as "firstWordStyle",
                last_word_style as "lastWordStyle",
                cta,
                background_media as "backgroundMedia",
                is_active as "isActive",
                order_index as "order",
                created_at as "createdAt",
                updated_at as "updatedAt"
            FROM cms_hero_sections 
            WHERE tenant_id = $1
            AND is_active = true
            ORDER BY order_index ASC, created_at DESC
        `;

        const result = await pool.query(query, [tenantId]);

        console.log(`✅ Found ${result.rows.length} hero sections for tenant ${tenantId}`);

        return result.rows.map(section => ({
            id: section.id,
            tenantId: section.tenantId,
            badge: section.badge,
            headline: section.headline,
            subtitle: section.subtitle,
            firstWordStyle: section.firstWordStyle,
            lastWordStyle: section.lastWordStyle,
            cta: section.cta,
            backgroundMedia: section.backgroundMedia,
            isActive: section.isActive,
            order: section.order,
            createdAt: section.createdAt,
            updatedAt: section.updatedAt
        }));
    } catch (error) {
        console.error('Error getting hero sections:', error);
        throw error;
    }
}

/**
 * Get featured products for a tenant
 */
async function getFeaturedProducts(pool, { tenantId, limit = 10 }) {
    try {
        console.log(`⭐ Getting featured products for tenant: ${tenantId}, limit: ${limit}`);

        const safeLimit = Math.min(Math.max(1, limit), 100);

        const query = `
            SELECT 
                p.id,
                p.name,
                p.slug,
                p.description,
                p.short_description,
                p.product_price,
                p.product_cost,
                p.featured,
                p.status,
                p.display_order,
                p.seo_title,
                p.seo_description,
                p.seo_keywords,
                p.published_at,
                p.cms_metadata,
                p.created_at,
                p.updated_at,
                c.name as category_name,
                b.name as brand_name,
                
                -- Get product files with proper ordering and file URLs
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', pf.id,
                            'file_key', pf.file_key,
                            'file_name', pf.file_name,
                            'file_type', pf.file_type,
                            'file_url', COALESCE(pf.file_url, f.key),
                            'order_index', COALESCE(pf.order_index, 0),
                            'image_type', COALESCE(pf.image_type, 'gallery')
                        ) ORDER BY COALESCE(pf.order_index, 0) ASC, pf.created_at ASC
                    ) FILTER (WHERE pf.id IS NOT NULL), 
                    '[]'
                ) as product_files
                
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN brands b ON p.brand = b.id
            LEFT JOIN product_files pf ON p.id = pf.product_id 
                AND pf.tenant_id = p.tenant_id
                AND (pf.is_deleted IS NULL OR pf.is_deleted = false)
            LEFT JOIN files f ON pf.file_id = f.id
                AND (f.deleted_at IS NULL )
            WHERE p.tenant_id = $1
            AND p.featured = true
            AND p.status = 'published'
            AND (p.is_deleted IS NULL OR p.is_deleted = false)
            GROUP BY p.id, c.name, b.name
            ORDER BY p.display_order ASC, p.created_at DESC
            LIMIT $2
        `;

        const result = await pool.query(query, [tenantId, safeLimit]);

        console.log(`✅ Found ${result.rows.length} featured products for tenant ${tenantId}`);

        // Format products with async S3 URL generation
        const formattedProducts = await Promise.all(
            result.rows.map(product => formatCMSProduct(product))
        );

        return formattedProducts;
    } catch (error) {
        console.error('Error getting featured products:', error);
        throw error;
    }
}

/**
 * Get products by category for a tenant
 */
async function getProductsByCategory(pool, { tenantId, category, limit = 10 }) {
    try {
        console.log(`📂 Getting products by category for tenant: ${tenantId}, category: ${category}, limit: ${limit}`);

        const safeLimit = Math.min(Math.max(1, limit), 100);

        const query = `
            SELECT 
                p.id,
                p.name,
                p.slug,
                p.description,
                p.short_description as "shortDescription",
                p.product_price as "price",
                p.product_cost as "originalPrice",
                p.featured,
                p.status,
                p.display_order as "displayOrder",
                p.seo_title as "seoTitle",
                p.seo_description as "seoDescription",
                p.created_at as "createdAt",
                p.updated_at as "updatedAt",
                c.name as "categoryName",
                b.name as "brandName",
                
                -- Get product files with proper ordering and file URLs
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', pf.id,
                            'file_key', pf.file_key,
                            'file_name', pf.file_name,
                            'file_type', pf.file_type,
                            'file_url', COALESCE(pf.file_url, f.key),
                            'order_index', COALESCE(pf.order_index, 0),
                            'image_type', COALESCE(pf.image_type, 'gallery')
                        ) ORDER BY COALESCE(pf.order_index, 0) ASC, pf.created_at ASC
                    ) FILTER (WHERE pf.id IS NOT NULL), 
                    '[]'
                ) as product_files
                
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN brands b ON p.brand = b.id
            LEFT JOIN product_files pf ON p.id = pf.product_id 
                AND pf.tenant_id = p.tenant_id
                AND (pf.is_deleted IS NULL OR pf.is_deleted = false)
            LEFT JOIN files f ON pf.file_id = f.id
                AND (f.deleted_at IS NULL)
            WHERE p.tenant_id = $1
            AND c.name ILIKE $2
            AND p.status = 'published'
            AND (p.is_deleted IS NULL OR p.is_deleted = false)
            GROUP BY p.id, c.name, b.name
            ORDER BY p.display_order ASC, p.created_at DESC
            LIMIT $3
        `;

        const result = await pool.query(query, [tenantId, `%${category}%`, safeLimit]);

        console.log(`✅ Found ${result.rows.length} products in category '${category}' for tenant ${tenantId}`);

        // Format products with async S3 URL generation
        const formattedProducts = await Promise.all(
            result.rows.map(product => formatCMSProduct(product))
        );

        return formattedProducts;
    } catch (error) {
        console.error('Error getting products by category:', error);
        throw error;
    }
}

/**
 * Format product for CMS responses with S3 URLs
 */
async function formatCMSProduct(product) {
    // Process product_files to generate presigned URLs
    let images = [];
    if (product.product_files && Array.isArray(product.product_files)) {
        images = await Promise.all(
            product.product_files.map(async (file) => {
                const fileUrl = await generatePresignedUrl(file.file_key);
                return {
                    id: file.id,
                    file_key: file.file_key,
                    file_name: file.file_name,
                    file_type: file.file_type,
                    file_url: fileUrl || file.file_key, // Fallback to file_key if URL generation fails
                    order_index: file.order_index || 0,
                    image_type: file.image_type || 'gallery'
                };
            })
        );
    }

    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        short_description: product.short_description,
        product_price: product.product_price ? parseFloat(product.product_price) : null,
        product_cost: product.product_cost ? parseFloat(product.product_cost) : null,
        featured: product.featured,
        status: product.status,
        display_order: product.display_order,
        seo_title: product.seo_title,
        seo_description: product.seo_description,
        seo_keywords: product.seo_keywords,
        published_at: product.published_at,
        cms_metadata: product.cms_metadata,
        category_name: product.category_name,
        brand_name: product.brand_name,
        product_files: images,
        created_at: product.created_at,
        updated_at: product.updated_at
    };
}

/**
 * Format error response
 */
function formatErrorResponse(message) {
    console.error('❌ CMS Error:', message);
    return {
        error: message,
        success: false
    };
} 