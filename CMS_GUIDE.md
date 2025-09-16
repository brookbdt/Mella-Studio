# MellaStudio CMS Implementation Guide

## 🎯 Overview

This guide covers the complete CMS integration between **MellaStudio** (SvelteKit frontend) and **Pulse ERP** (GraphQL backend). The system provides secure, multi-tenant content management with HMAC authentication.

### Architecture

```
MellaStudio (SvelteKit) → HMAC Auth → AppSync → Lambda → PostgreSQL
```

## 🏗️ Tech Stack

-   **Frontend**: SvelteKit + TypeScript + TailwindCSS
-   **Backend**: AWS AppSync + Lambda + PostgreSQL
-   **Authentication**: HMAC-based request signing
-   **Security**: Multi-tenant isolation, replay protection

---

## 📊 CMS Operations

### 1. Navbar Configuration (`getNavbarConfig`)

-   **Purpose**: Dynamic navigation, logo, styling
-   **Input**: `tenantId: String!`
-   **Output**: `NavbarConfig` with logo, navigation items, styling

### 2. Hero Sections (`getHeroSections`)

-   **Purpose**: Hero banners with dynamic styling
-   **Input**: `tenantId: String!`
-   **Output**: `[HeroSection!]!` with headlines, CTAs, media

### 3. Featured Products (`getFeaturedProducts`)

-   **Purpose**: Homepage featured product showcase
-   **Input**: `tenantId: String!`, `limit: Int`
-   **Output**: `[Product!]!` with CMS metadata

### 4. Products by Category (`getProductsByCategory`)

-   **Purpose**: Category-filtered product listings
-   **Input**: `tenantId: String!`, `category: String!`, `limit: Int`
-   **Output**: `[Product!]!` with category data

---

## 🔐 Security Implementation

### HMAC Authentication Flow

1. **Frontend** generates HMAC signature using secret + timestamp + payload
2. **Headers** sent: `x-service-id`, `x-service-timestamp`, `x-service-signature`, `x-tenant-id`
3. **Lambda** validates signature with timing-safe comparison
4. **Database** query executed only if authentication passes

### Security Features

-   ✅ **Replay Protection**: 5-minute timestamp window
-   ✅ **Tenant Isolation**: Multi-tenant data security
-   ✅ **Service Validation**: Authorized services only
-   ✅ **Timing Safety**: Prevents timing attacks

---

## 🗃️ Database Schema

### Required Tables

#### CMS Navbar Config

```sql
CREATE TABLE cms_navbar_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(50) NOT NULL UNIQUE,
    logo_config JSONB NOT NULL DEFAULT '{"src": "", "alt": "", "href": "/", "text": ""}',
    center_navigation JSONB NOT NULL DEFAULT '[]',
    right_navigation JSONB NOT NULL DEFAULT '[]',
    search_config JSONB NOT NULL DEFAULT '{"enabled": false}',
    cart_config JSONB NOT NULL DEFAULT '{"enabled": false}',
    styling JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### CMS Hero Sections

```sql
CREATE TABLE cms_hero_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(50) NOT NULL,
    badge TEXT,
    headline TEXT NOT NULL,
    subtitle TEXT,
    first_word_style JSONB NOT NULL DEFAULT '{"fontFamily": "seasons", "fontWeight": 400, "color": "#2c2c2c"}',
    last_word_style JSONB NOT NULL DEFAULT '{"fontFamily": "seasons", "fontWeight": 400, "color": "#2c2c2c"}',
    cta JSONB NOT NULL DEFAULT '{"text": "Shop Collection", "href": "/collection"}',
    background_media JSONB NOT NULL DEFAULT '{"desktop": "", "mobile": ""}',
    is_active BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Products Table Extensions

```sql
-- Add CMS fields to existing products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS seo_keywords TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft';
ALTER TABLE products ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS cms_metadata JSONB DEFAULT '{}';
```

### Performance Indexes

```sql
CREATE INDEX idx_cms_hero_sections_tenant ON cms_hero_sections(tenant_id);
CREATE INDEX idx_cms_hero_sections_active ON cms_hero_sections(tenant_id, is_active, order_index);
CREATE INDEX idx_products_tenant_featured ON products(tenant_id, featured, status) WHERE featured = true;
CREATE INDEX idx_products_tenant_category ON products(tenant_id, category_name, status) WHERE status = 'published';
```

---

## 🔧 GraphQL Schema (AppSync)

### Core Types

#### Navigation Types

```graphql
type NavbarConfig @aws_api_key @aws_cognito_user_pools {
    id: ID!
    tenantId: String!
    logo: LogoConfig!
    centerNavigation: [NavigationItem!]!
    rightNavigation: [NavigationItem!]!
    searchConfig: SearchConfig!
    cartConfig: CartConfig!
    styling: NavbarStyling!
    createdAt: AWSDateTime!
    updatedAt: AWSDateTime!
}

type NavigationItem @aws_api_key @aws_cognito_user_pools {
    text: String!
    href: String!
    target: String
}

type LogoConfig @aws_api_key @aws_cognito_user_pools {
    src: String!
    alt: String!
    href: String!
    text: String
}

type StyleConfig @aws_api_key @aws_cognito_user_pools {
    backgroundColor: String!
    textColor: String!
}

type NavbarStyling @aws_api_key @aws_cognito_user_pools {
    heroOverlayStyles: StyleConfig!
    scrolledStyles: StyleConfig!
}

type SearchConfig @aws_api_key @aws_cognito_user_pools {
    enabled: Boolean!
    placeholder: String
}

type CartConfig @aws_api_key @aws_cognito_user_pools {
    enabled: Boolean!
    itemCount: Int
}
```

#### Hero Section Types

```graphql
type HeroSection @aws_api_key @aws_cognito_user_pools {
    id: ID!
    tenantId: String!
    badge: String
    headline: String!
    subtitle: String
    firstWordStyle: WordStyle!
    lastWordStyle: WordStyle!
    cta: CallToAction!
    backgroundMedia: BackgroundMedia!
    isActive: Boolean!
    order: Int!
    createdAt: AWSDateTime!
    updatedAt: AWSDateTime!
}

type WordStyle @aws_api_key @aws_cognito_user_pools {
    fontFamily: String!
    fontWeight: Int!
    color: String!
    fontStyle: String
}

type CallToAction @aws_api_key @aws_cognito_user_pools {
    text: String!
    href: String!
}

type BackgroundMedia @aws_api_key @aws_cognito_user_pools {
    desktop: String!
    mobile: String!
}
```

#### Product Types

```graphql
type Product @aws_api_key @aws_cognito_user_pools {
    id: ID!
    name: String!
    description: String
    slug: String
    shortDescription: String
    price: Float
    originalPrice: Float
    featured: Boolean
    displayOrder: Int
    seoTitle: String
    seoDescription: String
    seoKeywords: String
    status: String
    publishedAt: AWSDateTime
    categoryName: String
    brandName: String
    images: [ProductImage!]!
    cmsMetadata: AWSJSON
    createdAt: AWSDateTime!
    updatedAt: AWSDateTime!
}

type ProductImage @aws_api_key @aws_cognito_user_pools {
    fileKey: String!
    fileName: String!
    fileUrl: String!
    fileType: String
}
```

### Query Definitions

```graphql
type Query {
    getNavbarConfig(tenantId: String!): NavbarConfig
        @aws_api_key
        @aws_cognito_user_pools
    getHeroSections(tenantId: String!): [HeroSection!]!
        @aws_api_key
        @aws_cognito_user_pools
    getFeaturedProducts(tenantId: String!, limit: Int): [Product!]!
        @aws_api_key
        @aws_cognito_user_pools
    getProductsByCategory(
        tenantId: String!
        category: String!
        limit: Int
    ): [Product!]! @aws_api_key @aws_cognito_user_pools
}
```

---

## 🚀 Lambda Handler Implementation

### HMAC Authentication

```javascript
const crypto = require('crypto')

async function validateHMAC(event) {
    const {
        'x-service-id': serviceId,
        'x-service-timestamp': timestamp,
        'x-service-signature': signature,
        'x-tenant-id': tenantId,
    } = event.headers

    // Validate required headers
    if (!serviceId || !timestamp || !signature || !tenantId) {
        throw new Error('Missing required authentication headers')
    }

    // Check timestamp (5-minute window)
    const requestTime = parseInt(timestamp)
    const currentTime = Math.floor(Date.now() / 1000)
    if (Math.abs(currentTime - requestTime) > 300) {
        throw new Error('Request timestamp out of window')
    }

    // Validate signature
    const payload = JSON.stringify(event.body || {})
    const expectedSignature = crypto
        .createHmac('sha256', process.env.CMS_SERVICE_SECRET)
        .update(`${timestamp}.${payload}`)
        .digest('hex')

    if (
        !crypto.timingSafeEqual(
            Buffer.from(signature.replace('sha256=', ''), 'hex'),
            Buffer.from(expectedSignature, 'hex')
        )
    ) {
        throw new Error('Invalid signature')
    }

    // Validate service and tenant
    if (serviceId !== 'mellastudio-cms' || tenantId !== 'mellastudio') {
        throw new Error('Invalid service or tenant')
    }

    return true
}
```

### Database Query Functions

```javascript
async function getNavbarConfig(tenantId) {
    const result = await client.query(
        'SELECT * FROM cms_navbar_config WHERE tenant_id = $1 LIMIT 1',
        [tenantId]
    )

    if (result.rows.length === 0) return null

    const config = result.rows[0]
    return {
        id: config.id,
        tenantId: config.tenant_id,
        logo: parseJSON(config.logo_config),
        centerNavigation: parseJSON(config.center_navigation),
        rightNavigation: parseJSON(config.right_navigation),
        searchConfig: parseJSON(config.search_config),
        cartConfig: parseJSON(config.cart_config),
        styling: parseJSON(config.styling),
        createdAt: config.created_at,
        updatedAt: config.updated_at,
    }
}

async function getHeroSections(tenantId) {
    const result = await client.query(
        `SELECT * FROM cms_hero_sections 
         WHERE tenant_id = $1 AND is_active = true 
         ORDER BY order_index ASC`,
        [tenantId]
    )

    return result.rows.map((section) => ({
        id: section.id,
        tenantId: section.tenant_id,
        badge: section.badge,
        headline: section.headline,
        subtitle: section.subtitle,
        firstWordStyle: parseJSON(section.first_word_style),
        lastWordStyle: parseJSON(section.last_word_style),
        cta: parseJSON(section.cta),
        backgroundMedia: parseJSON(section.background_media),
        isActive: section.is_active,
        order: section.order_index,
        createdAt: section.created_at,
        updatedAt: section.updated_at,
    }))
}

async function getFeaturedProducts(tenantId, limit = 10) {
    const result = await client.query(
        `SELECT p.*, 
                json_agg(
                    json_build_object(
                        'fileKey', pf.file_key,
                        'fileName', pf.file_name,
                        'fileUrl', pf.file_url,
                        'fileType', pf.file_type
                    )
                ) FILTER (WHERE pf.id IS NOT NULL) as product_files
         FROM products p
         LEFT JOIN product_files pf ON p.id = pf.product_id
         WHERE p.tenant_id = $1 AND p.featured = true AND p.status = 'published'
         GROUP BY p.id
         ORDER BY p.display_order ASC, p.created_at DESC
         LIMIT $2`,
        [tenantId, limit]
    )

    return result.rows.map(formatProductForCMS)
}

function formatProductForCMS(product) {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        slug: product.slug,
        shortDescription: product.short_description,
        price: product.product_price,
        originalPrice: product.product_cost,
        featured: product.featured || false,
        displayOrder: product.display_order || 0,
        seoTitle: product.seo_title,
        seoDescription: product.seo_description,
        seoKeywords: product.seo_keywords,
        status: product.status || 'draft',
        publishedAt: product.published_at,
        categoryName: product.category_name,
        brandName: product.brand_name,
        images: product.product_files || [],
        cmsMetadata: JSON.stringify(parseJSON(product.cms_metadata)),
        createdAt: product.created_at,
        updatedAt: product.updated_at,
    }
}

function parseJSON(jsonString, fallback = {}) {
    try {
        return typeof jsonString === 'string'
            ? JSON.parse(jsonString)
            : jsonString || fallback
    } catch {
        return fallback
    }
}
```

### Main Handler

```javascript
exports.handler = async (event) => {
    console.log(
        '🎨 CMS Lambda Handler - Event:',
        JSON.stringify(event, null, 2)
    )

    try {
        // Validate HMAC authentication
        await validateHMAC(event)

        const { field, arguments: args } = event
        const { tenantId } = args

        switch (field) {
            case 'getNavbarConfig':
                return await getNavbarConfig(tenantId)
            case 'getHeroSections':
                return await getHeroSections(tenantId)
            case 'getFeaturedProducts':
                return await getFeaturedProducts(tenantId, args.limit)
            case 'getProductsByCategory':
                return await getProductsByCategory(
                    tenantId,
                    args.category,
                    args.limit
                )
            default:
                throw new Error(`Unknown field: ${field}`)
        }
    } catch (error) {
        console.error('❌ CMS Lambda Error:', error)
        throw error
    }
}
```

---

## 🎯 Frontend Integration

### GraphQL Client Setup

```typescript
// src/lib/graphql/client.ts
import {
    PUBLIC_APPSYNC_API_URL,
    PUBLIC_APPSYNC_API_KEY,
} from '$env/static/public'

export async function executeGraphQLQuery(
    query: string,
    variables: Record<string, any> = {},
    operationName: string,
    options: { fetch?: typeof fetch; tenantId?: string } = {}
) {
    const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
            operationName,
        }),
    })

    if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.status}`)
    }

    const result = await response.json()

    if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`)
    }

    return result.data
}
```

### API Proxy with HMAC

```typescript
// src/routes/api/graphql/+server.ts
import { json } from '@sveltejs/kit'
import { CMS_SERVICE_SECRET } from '$env/static/private'
import {
    PUBLIC_APPSYNC_API_URL,
    PUBLIC_APPSYNC_API_KEY,
    PUBLIC_TENANT_ID,
} from '$env/static/public'
import crypto from 'crypto'

export async function POST({ request }) {
    try {
        const body = await request.json()

        // Generate HMAC signature
        const timestamp = Math.floor(Date.now() / 1000).toString()
        const payload = JSON.stringify(body)
        const signature = crypto
            .createHmac('sha256', CMS_SERVICE_SECRET)
            .update(`${timestamp}.${payload}`)
            .digest('hex')

        // Forward to AppSync with auth headers
        const response = await fetch(PUBLIC_APPSYNC_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': PUBLIC_APPSYNC_API_KEY,
                'x-service-id': 'mellastudio-cms',
                'x-service-timestamp': timestamp,
                'x-service-signature': `sha256=${signature}`,
                'x-tenant-id': PUBLIC_TENANT_ID,
                'x-source-service': 'mellastudio-website',
            },
            body: JSON.stringify(body),
        })

        const result = await response.json()
        return json(result)
    } catch (error) {
        console.error('API proxy error:', error)
        return json({ errors: [{ message: error.message }] }, { status: 500 })
    }
}
```

### CMS Data Fetching

```typescript
// src/lib/cms/navbar.ts
import { writable } from 'svelte/store'
import { executeGraphQLQuery } from '$lib/graphql/client'

export const navbarConfig = writable(null)
export const navbarLoading = writable(false)
export const navbarError = writable(null)

const GET_NAVBAR_CONFIG = `
  query GetNavbarConfig($tenantId: String!) {
    getNavbarConfig(tenantId: $tenantId) {
      id
      tenantId
      logo {
        src
        alt
        href
        text
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
        enabled
        placeholder
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
    }
  }
`

export async function fetchNavbarConfig() {
    navbarLoading.set(true)
    navbarError.set(null)

    try {
        const result = await executeGraphQLQuery(
            GET_NAVBAR_CONFIG,
            { tenantId: 'mellastudio' },
            'GetNavbarConfig'
        )

        if (result?.getNavbarConfig) {
            navbarConfig.set(result.getNavbarConfig)
        } else {
            // Use fallback config
            navbarConfig.set(getDefaultNavbarConfig())
        }
    } catch (error) {
        console.error('Error fetching navbar config:', error)
        navbarError.set(error.message)
        navbarConfig.set(getDefaultNavbarConfig())
    } finally {
        navbarLoading.set(false)
    }
}

function getDefaultNavbarConfig() {
    return {
        id: 'default',
        tenantId: 'mellastudio',
        logo: {
            src: '/src/lib/assets/images/Logo11.png',
            alt: 'MellaStudio',
            href: '/',
            text: 'MELLASTUDIO',
        },
        centerNavigation: [
            { text: 'Collection', href: '/collection', target: null },
            { text: 'Spaces', href: '/spaces', target: null },
            { text: 'Craftsmanship', href: '/craftsmanship', target: null },
            { text: 'About', href: '/about', target: null },
        ],
        rightNavigation: [{ text: 'Contact', href: '/contact', target: null }],
        searchConfig: { enabled: false, placeholder: 'Search...' },
        cartConfig: { enabled: false, itemCount: 0 },
        styling: {
            heroOverlayStyles: {
                backgroundColor: 'bg-transparent',
                textColor: 'text-white',
            },
            scrolledStyles: {
                backgroundColor: 'bg-white',
                textColor: 'text-gray-900',
            },
        },
    }
}
```

---

## 🔧 AppSync Resolvers

### JavaScript Resolver Pattern

```javascript
// appsync-resolvers/getNavbarConfig.js
export function request(ctx) {
    console.log(
        '🧭 getNavbarConfig resolver - Request:',
        JSON.stringify(ctx, null, 2)
    )

    return {
        operation: 'Invoke',
        payload: {
            field: 'getNavbarConfig',
            arguments: {
                tenantId: ctx.arguments.tenantId,
            },
            request: {
                headers: ctx.request.headers,
                body: JSON.stringify(ctx.request),
            },
        },
    }
}

export function response(ctx) {
    console.log(
        '🧭 getNavbarConfig resolver - Response:',
        JSON.stringify(ctx, null, 2)
    )

    if (ctx.error) {
        console.error('❌ getNavbarConfig resolver error:', ctx.error)
        throw new Error(`CMS_ERROR: ${ctx.error.message}`)
    }

    return ctx.result
}
```

---

## 🧪 Testing & Debugging

### Test Queries

```graphql
# Test all CMS operations
query TestCMS {
    navbar: getNavbarConfig(tenantId: "mellastudio") {
        logo {
            src
            alt
            text
        }
        centerNavigation {
            text
            href
        }
    }

    hero: getHeroSections(tenantId: "mellastudio") {
        headline
        subtitle
        cta {
            text
            href
        }
    }

    featured: getFeaturedProducts(tenantId: "mellastudio", limit: 3) {
        name
        slug
        price
        featured
        images {
            fileName
            fileUrl
        }
    }
}
```

### Environment Variables

```bash
# Frontend (.env)
CMS_SERVICE_SECRET=your-secret-key-here
PUBLIC_APPSYNC_API_URL=https://your-api.appsync-api.region.amazonaws.com/graphql
PUBLIC_APPSYNC_API_KEY=your-api-key
PUBLIC_TENANT_ID=mellastudio

# Lambda Environment
CMS_SERVICE_SECRET=your-secret-key-here
DB_SECRET_ARN=arn:aws:secretsmanager:region:account:secret:db-secret
```

### Common Issues & Solutions

1. **Authentication Failed**: Check HMAC secret matches between frontend and Lambda
2. **Query Name Mismatch**: Ensure GraphQL operation names match exactly
3. **Field Validation Errors**: Verify schema field names match frontend queries
4. **Missing Headers**: Ensure all auth headers are forwarded through AppSync

---

## 📈 Performance Optimization

### Database

-   Use proper indexes for tenant-based queries
-   Optimize JSON field parsing
-   Implement connection pooling

### Lambda

-   Minimize cold starts with proper memory allocation
-   Use connection reuse for database
-   Implement proper error handling

### Frontend

-   Use proper loading states
-   Implement error boundaries
-   Cache CMS data appropriately

---

## 🚀 Production Deployment

### Pre-deployment Checklist

-   [ ] Database tables created with proper indexes
-   [ ] Lambda function deployed with correct environment variables
-   [ ] AppSync schema updated with all required types
-   [ ] All 4 JavaScript resolvers deployed
-   [ ] HMAC secrets match between frontend and Lambda
-   [ ] Test all CMS operations work end-to-end

### Monitoring

-   CloudWatch logs for Lambda execution
-   AppSync metrics for query performance
-   Custom metrics for authentication success/failure
-   Error tracking for CMS operations

This guide provides everything needed to implement, deploy, and maintain the MellaStudio CMS system with secure, scalable architecture.
