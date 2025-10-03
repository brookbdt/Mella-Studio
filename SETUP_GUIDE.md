# MellaStudio CMS Setup Guide

## 🚀 Quick Setup (5 minutes)

### 1. Environment Variables

Create a `.env` file in your project root with these variables:

```bash
# Required for CMS authentication
CMS_SERVICE_SECRET=your-64-character-secret-here
MAIL_AUTH_USER=your-email@gmail.com
MAIL_AUTH_PASS=your-gmail-app-password

# AppSync configuration
PUBLIC_APPSYNC_API_URL=https://jepidlb7t5gyhjygnp2sziyxku.appsync-api.il-central-1.amazonaws.com/graphql
PUBLIC_APPSYNC_API_KEY=da2-ydbgpg63dje7xdd45woks4irqy
PUBLIC_AWS_REGION=il-central-1
PUBLIC_TENANT_ID=mellastudio
```

**Generate a secure secret:**

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Backend Requirements (Pulse ERP)

**Lambda Function Location:** `/Users/brookbelihu/Documents/development/PulseERP/src/lambda/CMSOperations/index.js`

**Required Environment Variables in Lambda:**

```bash
CMS_SERVICE_SECRET=same-secret-as-frontend
DB_SECRET_ARN=arn:aws:secretsmanager:region:account:secret:db-secret
```

**GraphQL Schema Updates Required:**
Add these exact operations to your AppSync schema:

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

### 3. Database Setup

Run these SQL commands in your PostgreSQL database:

```sql
-- Create navbar config table
CREATE TABLE IF NOT EXISTS cms_navbar_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(50) NOT NULL UNIQUE,
    logo_config JSONB DEFAULT '{"src": "/src/lib/assets/images/Logo11.png", "alt": "MellaStudio", "href": "/", "text": "MELLASTUDIO"}',
    center_navigation JSONB DEFAULT '[{"text": "Collection", "href": "/collection"}, {"text": "Spaces", "href": "/spaces"}, {"text": "Craftsmanship", "href": "/craftsmanship"}, {"text": "About", "href": "/about"}]',
    right_navigation JSONB DEFAULT '[{"text": "Contact", "href": "/contact"}]',
    search_config JSONB DEFAULT '{"enabled": false, "placeholder": "Search..."}',
    cart_config JSONB DEFAULT '{"enabled": false, "itemCount": 0}',
    styling JSONB DEFAULT '{"heroOverlayStyles": {"backgroundColor": "bg-transparent", "textColor": "text-white"}, "scrolledStyles": {"backgroundColor": "bg-white", "textColor": "text-gray-900"}}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create hero sections table
CREATE TABLE IF NOT EXISTS cms_hero_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id VARCHAR(50) NOT NULL,
    badge TEXT,
    headline TEXT NOT NULL,
    subtitle TEXT,
    first_word_style JSONB DEFAULT '{"fontFamily": "seasons", "fontWeight": 400, "color": "#2c2c2c"}',
    last_word_style JSONB DEFAULT '{"fontFamily": "seasons", "fontWeight": 400, "color": "#2c2c2c", "fontStyle": "normal"}',
    cta JSONB DEFAULT '{"text": "Shop Collection", "href": "/collection"}',
    background_media JSONB DEFAULT '{"desktop": "", "mobile": ""}',
    is_active BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO cms_navbar_config (tenant_id) VALUES ('mellastudio') ON CONFLICT (tenant_id) DO NOTHING;

INSERT INTO cms_hero_sections (tenant_id, headline, subtitle, is_active, order_index)
VALUES (
    'mellastudio',
    'Lighting Your Space with Warmth, Culture, and Soul.',
    'Experience the pinnacle of Ethiopian craftsmanship with MellaStudio''s luxury lighting collection.',
    true,
    1
) ON CONFLICT DO NOTHING;
```

## 🔧 Current Fixes Applied

### ✅ Fixed Issues:

1. **GraphQL Schema Mismatch** - Updated NavigationItem type to match AppSync schema
2. **Operation Name Mismatch** - Changed query name from "getNavbarConfig" to "GetNavbarConfig"
3. **Image srcset Error** - Replaced `<picture>` with responsive `<img>` elements in HeroSection
4. **Documentation Consolidation** - Merged 9 separate files into 2 comprehensive guides

### 🔍 Current Status:

-   **Frontend**: Ready and configured ✅
-   **Backend Lambda**: Needs GraphQL schema updates ⚠️
-   **Database**: Needs table creation ⚠️
-   **AppSync**: Needs schema deployment ⚠️

## 🧪 Testing

### Test Frontend (should work with fallbacks):

```bash
npm run dev
# Visit http://localhost:5173
# Should see default navbar and hero section
```

### Test Backend Connection:

1. Ensure AppSync schema has the required operations
2. Check Lambda function has correct environment variables
3. Verify database tables exist
4. Test with: `npm run dev` - should fetch from CMS instead of fallbacks

## 🚨 Common Issues

### "No operation matches"

-   **Cause**: AppSync schema missing CMS operations
-   **Fix**: Add the GraphQL operations shown above to your schema

### "Authentication failed"

-   **Cause**: Lambda missing CMS_SERVICE_SECRET or different secret
-   **Fix**: Ensure both frontend and Lambda have the same secret

### "Missing headers"

-   **Cause**: API proxy not forwarding auth headers
-   **Fix**: Verify `/api/graphql/+server.ts` is using `signRequest` function

### Default content showing

-   **Cause**: Normal fallback behavior when CMS isn't available
-   **Fix**: Complete backend setup to see CMS content

## 📚 Documentation

-   **`CMS_GUIDE.md`** - Complete technical implementation guide
-   **`DEPLOYMENT_GUIDE.md`** - Production deployment procedures
-   **`SETUP_GUIDE.md`** - This quick setup guide

## 🎯 Next Steps

1. **Complete backend setup** following the database and schema instructions above
2. **Deploy AppSync resolvers** from `appsync-resolvers/` directory
3. **Test end-to-end** CMS functionality
4. **Add more content types** (products, blog posts, etc.)

Your MellaStudio CMS will be fully operational once the backend components are deployed!
