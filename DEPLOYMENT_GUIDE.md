# MellaStudio CMS Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Database Setup

```sql
-- Create CMS tables (run in PulseERP database)
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

-- Extend products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS short_description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'draft';
ALTER TABLE products ADD COLUMN IF NOT EXISTS cms_metadata JSONB DEFAULT '{}';

-- Insert sample data
INSERT INTO cms_navbar_config (tenant_id, logo_config, center_navigation, right_navigation)
VALUES (
    'mellastudio',
    '{"src": "/src/lib/assets/images/Logo11.png", "alt": "MellaStudio", "href": "/", "text": "MELLASTUDIO"}',
    '[{"text": "Collection", "href": "/collection"}, {"text": "Spaces", "href": "/spaces"}, {"text": "Craftsmanship", "href": "/craftsmanship"}, {"text": "About", "href": "/about"}]',
    '[{"text": "Contact", "href": "/contact"}]'
) ON CONFLICT (tenant_id) DO NOTHING;

INSERT INTO cms_hero_sections (tenant_id, headline, subtitle, is_active, order_index)
VALUES (
    'mellastudio',
    'Lighting Your Space with Warmth, Culture, and Soul.',
    'Experience the pinnacle of Ethiopian craftsmanship with MellaStudio''s luxury lighting collection.',
    true,
    1
) ON CONFLICT DO NOTHING;
```

### 2. Lambda Function Setup

```bash
# Deploy Lambda function at: /Users/brookbelihu/Documents/development/PulseERP/src/lambda/CMSOperations/index.js
# Set environment variables:
CMS_SERVICE_SECRET=your-secret-key-here
DB_SECRET_ARN=arn:aws:secretsmanager:region:account:secret:db-secret
```

### 3. AppSync Schema Update

Add these types to your GraphQL schema:

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

### 4. Create AppSync Resolvers

Create JavaScript resolvers for each query pointing to your Lambda function.

### 5. Frontend Environment Variables

```bash
# .env
CMS_SERVICE_SECRET=your-secret-key-here
PUBLIC_APPSYNC_API_URL=https://your-api.appsync-api.region.amazonaws.com/graphql
PUBLIC_APPSYNC_API_KEY=your-api-key
PUBLIC_TENANT_ID=mellastudio
```

## 🔧 Troubleshooting

### Common Issues:

1. **"No operation matches"** - Check GraphQL schema has the exact query names
2. **"Authentication failed"** - Verify HMAC secret matches between frontend and Lambda
3. **"Field undefined"** - Ensure schema fields match frontend GraphQL queries
4. **"Missing headers"** - Check API proxy is forwarding auth headers

### Quick Tests:

```bash
# Test Lambda function
aws lambda invoke --function-name your-cms-function --payload '{"field":"getNavbarConfig","arguments":{"tenantId":"mellastudio"}}' response.json

# Test AppSync
curl -X POST -H "Content-Type: application/json" -H "x-api-key: YOUR_KEY" -d '{"query":"{ getNavbarConfig(tenantId: \"mellastudio\") { id } }"}' https://your-api.appsync-api.region.amazonaws.com/graphql
```

## 📋 Production Checklist

-   [ ] Database tables created
-   [ ] Lambda function deployed
-   [ ] AppSync schema updated
-   [ ] Resolvers created
-   [ ] Environment variables set
-   [ ] HMAC authentication working
-   [ ] All CMS queries return data
-   [ ] Error handling tested

For detailed implementation, see `CMS_GUIDE.md`
