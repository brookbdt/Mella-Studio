import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

// Import placeholder images (in real CMS, these would come from API)
import new2 from '$lib/assets/images/new2.jpg';
import new3 from '$lib/assets/images/new3.jpg';
import new5 from '$lib/assets/images/new5.jpg';
import new14 from '$lib/assets/images/new14.jpg';

// Related Product interface for CMS
export interface RelatedProduct {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    imageUrlLit?: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    reviewCount?: number;
    isSignature?: boolean;
    isSoldOut?: boolean;
    culturalStory?: string;
}

// Enhanced Product interfaces for full CMS support
export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    imageUrl: string;
    productImages: ProductImage[];
    category: 'pendant' | 'table' | 'floor' | 'accent';
    dimensions: string;
    craftingTime: string;
    artisan: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    isSoldOut?: boolean;
    isSignature?: boolean;
    culturalStory: string;
    features: string[];
    variants: ProductVariant[];

    // Enhanced specifications section with full CMS control
    specificationsSection: SpecificationsSection;

    // Technical diagram section
    technicalDiagram: TechnicalDiagram;

    // Reviews section with full CMS control
    reviewsSection: ReviewsSection;

    warranty: string;
    shippingInfo: string;
    materials: string[];
    inStock: boolean;
    stockQuantity: number;
    freeShippingEligible: boolean;
    returns: {
        policy: string;
        days: number;
    };

    // SEO and meta data
    seo: SEOData;

    // Related products for CMS
    relatedProducts?: RelatedProduct[];
}

export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    isPrimary?: boolean;
    isLitVersion?: boolean;
}

export interface ProductVariant {
    id: string;
    name: string;
    colorName: string;
    colorHex: string;
    price?: number;
    imageUrl?: string;
    inStock: boolean;
}

// Enhanced Specifications Section for full CMS control
export interface SpecificationsSection {
    title: string; // e.g., "Technical Specifications"
    measurementSection: {
        title: string; // e.g., "MEASUREMENT"
        items: MeasurementItem[];
    };
    specsSection: {
        title: string; // e.g., "SPECS"
        items: SpecItem[];
    };
}

export interface MeasurementItem {
    label: string; // e.g., "WEIGHT", "DIMENSIONS"
    value: string; // e.g., "2.5 KG", "70 × 70 × 110 cm"
    unit?: string; // e.g., "KG", "CM"
}

export interface SpecItem {
    label: string; // e.g., "TYPE", "MATERIAL", "BULB"
    value: string; // e.g., "PENDANT LAMP", "HANDWOVEN COTTON"
    icon?: string;
}

// Technical Diagram Section
export interface TechnicalDiagram {
    title: string; // e.g., "Technical Drawing"
    imageUrl: string; // CMS uploaded technical diagram image
    imageAlt: string;
    caption?: string;
    showDimensions: boolean;
    dimensions?: DiagramDimension[];
}

export interface DiagramDimension {
    label: string; // e.g., "Width", "Height", "Base"
    value: string; // e.g., "70cm", "110cm", "25cm"
}

// Reviews Section with full CMS control
export interface ReviewsSection {
    title: string; // e.g., "OUR REVIEWS", "Customer Reviews"
    subtitle?: string; // e.g., "What our customers say"
    showRatingSummary: boolean;
    ratingSummaryText?: string; // e.g., "{percentage}% of reviewers recommend this product"
    reviews: Review[];
    showWriteReviewButton: boolean;
    writeReviewButtonText: string; // e.g., "Write a Review"
}

export interface Review {
    id: string;
    customerName: string;
    customerLocation: string; // e.g., "ADDIS ABABA, ET"
    customerAge?: string; // e.g., "AGE 28 TO 34"
    isVerifiedBuyer: boolean;
    rating: number; // 1-5
    title: string; // e.g., "ABSOLUTELY STUNNING!"
    content: string;
    date: string; // e.g., "2 months ago"
    isRecommended: boolean;
    helpfulCount?: number;
}

// SEO Data for enhanced optimization
export interface SEOData {
    metaTitle?: string; // Custom title, falls back to product name
    metaDescription?: string; // Custom description, falls back to shortDescription
    keywords: string[];
    openGraph: {
        title?: string;
        description?: string;
        image?: string;
        imageAlt?: string;
    };
    structuredData: {
        brand: string;
        category: string;
        availability: 'InStock' | 'OutOfStock' | 'PreOrder';
        condition: 'New' | 'Used' | 'Refurbished';
        gtin?: string;
        mpn?: string;
        sku: string;
    };
}

// Mock products data - In a real CMS, this would be fetched from an API
const PRODUCTS: Record<string, Product> = {
    'mender-pendant': {
        id: 1,
        name: 'Mender Pendant',
        slug: 'mender-pendant',
        description:
            'Celebrating the Ethiopian tradition of recovery and renewal, the Mender Pendant represents a harmonious blend of ancient craftsmanship and contemporary design.',
        shortDescription: 'Handwoven Ethiopian pendant celebrating tradition and renewal',
        imageUrl: new2,
        productImages: [
            { id: '1', url: new2, alt: 'Mender Pendant - Main View', isPrimary: true },
            { id: '2', url: new3, alt: 'Mender Pendant - Detail View' },
            { id: '3', url: new5, alt: 'Mender Pendant - Lifestyle' },
            { id: '4', url: new14, alt: 'Mender Pendant - Close Up' }
        ],
        category: 'pendant',
        dimensions: '70 × 70 × 110 cm',
        craftingTime: '3-4 weeks',
        artisan: 'Master Alemayehu',
        price: 2400,
        originalPrice: 3200,
        rating: 4.8,
        reviewCount: 127,
        isSignature: false,
        culturalStory:
            'Inspired by the ancient Amharic word "mender" meaning recovery, this piece represents renewal and strength through adversity.',
        features: [
            'Handwoven Ethiopian cotton',
            'LED compatible bulb included',
            'Adjustable hanging height',
            'Sustainable materials only',
            'Master artisan crafted'
        ],
        variants: [
            {
                id: 'natural',
                name: 'Natural Cotton',
                colorName: 'Natural',
                colorHex: '#F5F5DC',
                imageUrl: new2,
                inStock: true
            },
            {
                id: 'charcoal',
                name: 'Charcoal Weave',
                colorName: 'Charcoal',
                colorHex: '#36454F',
                price: 2500,
                imageUrl: new3,
                inStock: true
            }
        ],
        specificationsSection: {
            title: "Technical Specifications",
            measurementSection: {
                title: "MEASUREMENT",
                items: [
                    { label: "WEIGHT", value: "2.5 KG", unit: "KG" },
                    { label: "DIMENSIONS", value: "70 × 70 × 110 cm" }
                ]
            },
            specsSection: {
                title: "SPECS",
                items: [
                    { label: "TYPE", value: "PENDANT LAMP", icon: '💡' },
                    { label: "MATERIAL", value: "HANDWOVEN COTTON", icon: '🧵' },
                    { label: "BULB", value: "LED E27 (Included)", icon: '💡' }
                ]
            }
        },
        technicalDiagram: {
            title: "Technical Drawing",
            imageUrl: new2,
            imageAlt: "Mender Pendant - Technical Drawing",
            caption: "This is a technical drawing of the Mender Pendant",
            showDimensions: true,
            dimensions: [
                { label: "Width", value: "70cm" },
                { label: "Height", value: "70cm" },
                { label: "Base", value: "110cm" }
            ]
        },
        reviewsSection: {
            title: "OUR REVIEWS",
            subtitle: "What our customers say",
            showRatingSummary: true,
            ratingSummaryText: "{percentage}% of reviewers recommend this product",
            reviews: [
                {
                    id: "review1",
                    customerName: "John Doe",
                    customerLocation: "ADDIS ABABA, ET",
                    customerAge: "AGE 28 TO 34",
                    isVerifiedBuyer: true,
                    rating: 5,
                    title: "ABSOLUTELY STUNNING!",
                    content: "I absolutely love this pendant! It's beautifully crafted and adds a touch of elegance to my living room.",
                    date: "2 months ago",
                    isRecommended: true,
                    helpfulCount: 12
                },
                {
                    id: "review2",
                    customerName: "Jane Smith",
                    customerLocation: "ADDIS ABABA, ET",
                    customerAge: "AGE 35 TO 44",
                    isVerifiedBuyer: true,
                    rating: 4,
                    title: "Great Quality",
                    content: "I've been using this pendant for a few weeks now and it's holding up well. The craftsmanship is top-notch.",
                    date: "1 month ago",
                    isRecommended: true,
                    helpfulCount: 5
                }
            ],
            showWriteReviewButton: true,
            writeReviewButtonText: "Write a Review"
        },
        warranty: '5 Year Limited Warranty',
        shippingInfo: 'Free shipping worldwide. 2-4 weeks delivery.',
        materials: ['Ethiopian Cotton', 'Brass Hardware', 'LED Technology'],
        inStock: true,
        stockQuantity: 12,
        freeShippingEligible: true,
        returns: {
            policy: 'Free returns within 30 days',
            days: 30
        },
        seo: {
            metaTitle: "Mender Pendant - Elegant Ethiopian Pendant",
            metaDescription: "Discover the beauty and craftsmanship of the Mender Pendant. Handwoven in Ethiopia, it's a harmonious blend of ancient tradition and contemporary design.",
            keywords: ["Mender Pendant", "Ethiopian craftsmanship", "Handwoven cotton", "LED compatible", "Adjustable hanging height"],
            openGraph: {
                title: "Mender Pendant - Elegant Ethiopian Pendant",
                description: "Discover the beauty and craftsmanship of the Mender Pendant. Handwoven in Ethiopia, it's a harmonious blend of ancient tradition and contemporary design.",
                image: new2,
                imageAlt: "Mender Pendant - Main View"
            },
            structuredData: {
                brand: "Master Alemayehu",
                category: "pendant",
                availability: "InStock",
                condition: "New",
                gtin: "123456789012",
                mpn: "Mender Pendant",
                sku: "Mender Pendant"
            }
        },
        relatedProducts: [
            {
                id: 2,
                name: 'Gum Gum Pendant',
                slug: 'gum-gum-pendant',
                imageUrl: new3,
                imageUrlLit: new3,
                price: 1800,
                originalPrice: 2400,
                rating: 4.9,
                reviewCount: 89,
                isSignature: true,
                culturalStory: 'Named after the traditional Ethiopian basket, each strand tells a story of community and craftsmanship.'
            },
            {
                id: 3,
                name: 'Nikisat Table Lamp',
                slug: 'nikisat-table-lamp',
                imageUrl: new5,
                imageUrlLit: new5,
                price: 980,
                originalPrice: 1400,
                rating: 4.7,
                reviewCount: 203,
                culturalStory: 'Embodying the warmth of Ethiopian hospitality'
            },
            {
                id: 4,
                name: 'Qedamawi Floor Lamp',
                slug: 'qedamawi-floor-lamp',
                imageUrl: new14,
                imageUrlLit: new14,
                price: 3200,
                originalPrice: 4500,
                rating: 4.9,
                reviewCount: 156,
                isSignature: true,
                culturalStory: 'Qedamawi means "first" in Ge\'ez, representing the beginning of enlightenment.'
            }
        ]
    },
    'gum-gum-pendant': {
        id: 2,
        name: 'Gum Gum Pendant',
        slug: 'gum-gum-pendant',
        description:
            'A modern interpretation of traditional Ethiopian basket weaving, the Gum Gum Pendant showcases the intricate artistry passed down through generations.',
        shortDescription: 'Modern interpretation of traditional Ethiopian basket weaving',
        imageUrl: new3,
        productImages: [
            { id: '1', url: new3, alt: 'Gum Gum Pendant - Main View', isPrimary: true },
            { id: '2', url: new2, alt: 'Gum Gum Pendant - Detail View' },
            { id: '3', url: new5, alt: 'Gum Gum Pendant - Lifestyle' },
            { id: '4', url: new14, alt: 'Gum Gum Pendant - Environment' }
        ],
        category: 'pendant',
        dimensions: '60 × 60 × 30 cm',
        craftingTime: '2-3 weeks',
        artisan: 'Master Tigist',
        price: 1800,
        originalPrice: 2400,
        rating: 4.9,
        reviewCount: 89,
        isSignature: true,
        culturalStory:
            'Named after the traditional Ethiopian basket, each strand tells a story of community and craftsmanship.',
        features: [
            'Traditional weaving technique',
            'Sustainable materials',
            'Dimmable LED compatible',
            'Handcrafted details',
            'Heritage design'
        ],
        variants: [
            {
                id: 'natural-weave',
                name: 'Natural Weave',
                colorName: 'Natural',
                colorHex: '#DEB887',
                imageUrl: new3,
                inStock: true
            },
            {
                id: 'deep-brown',
                name: 'Deep Brown',
                colorName: 'Deep Brown',
                colorHex: '#8B4513',
                imageUrl: new5,
                inStock: true
            }
        ],
        specificationsSection: {
            title: "Technical Specifications",
            measurementSection: {
                title: "MEASUREMENT",
                items: [
                    { label: "WEIGHT", value: "1.8 KG", unit: "KG" },
                    { label: "DIMENSIONS", value: "60 × 60 × 30 cm" }
                ]
            },
            specsSection: {
                title: "SPECS",
                items: [
                    { label: "TYPE", value: "PENDANT LAMP", icon: '💡' },
                    { label: "MATERIAL", value: "WOVEN GRASS & METAL", icon: '🌾' },
                    { label: "BULB", value: "LED E27 (Included)", icon: '💡' }
                ]
            }
        },
        technicalDiagram: {
            title: "Technical Drawing",
            imageUrl: new3,
            imageAlt: "Gum Gum Pendant - Technical Drawing",
            caption: "This is a technical drawing of the Gum Gum Pendant",
            showDimensions: true,
            dimensions: [
                { label: "Width", value: "60cm" },
                { label: "Height", value: "60cm" },
                { label: "Base", value: "30cm" }
            ]
        },
        reviewsSection: {
            title: "OUR REVIEWS",
            subtitle: "What our customers say",
            showRatingSummary: true,
            ratingSummaryText: "{percentage}% of reviewers recommend this product",
            reviews: [
                {
                    id: "review1",
                    customerName: "Jane Smith",
                    customerLocation: "ADDIS ABABA, ET",
                    customerAge: "AGE 35 TO 44",
                    isVerifiedBuyer: true,
                    rating: 5,
                    title: "Great Quality",
                    content: "I've been using this pendant for a few weeks now and it's holding up well. The craftsmanship is top-notch.",
                    date: "1 month ago",
                    isRecommended: true,
                    helpfulCount: 5
                },
                {
                    id: "review2",
                    customerName: "John Doe",
                    customerLocation: "ADDIS ABABA, ET",
                    customerAge: "AGE 28 TO 34",
                    isVerifiedBuyer: true,
                    rating: 4,
                    title: "Beautiful Design",
                    content: "I love the traditional weaving technique and the vibrant colors. It's a beautiful addition to my living room.",
                    date: "2 months ago",
                    isRecommended: true,
                    helpfulCount: 8
                }
            ],
            showWriteReviewButton: true,
            writeReviewButtonText: "Write a Review"
        },
        warranty: '5 Year Limited Warranty',
        shippingInfo: 'Free shipping worldwide. 2-4 weeks delivery.',
        materials: ['Woven Grass', 'Metal Framework', 'LED Technology'],
        inStock: true,
        stockQuantity: 8,
        freeShippingEligible: true,
        returns: {
            policy: 'Free returns within 30 days',
            days: 30
        },
        seo: {
            metaTitle: "Gum Gum Pendant - Traditional Ethiopian Basket Weaving",
            metaDescription: "Discover the intricate artistry and cultural significance of the Gum Gum Pendant. Handcrafted in Ethiopia, it's a beautiful addition to any space.",
            keywords: ["Gum Gum Pendant", "Traditional Ethiopian basket weaving", "Handcrafted", "Heritage design", "Sustainable materials"],
            openGraph: {
                title: "Gum Gum Pendant - Traditional Ethiopian Basket Weaving",
                description: "Discover the intricate artistry and cultural significance of the Gum Gum Pendant. Handcrafted in Ethiopia, it's a beautiful addition to any space.",
                image: new3,
                imageAlt: "Gum Gum Pendant - Main View"
            },
            structuredData: {
                brand: "Master Tigist",
                category: "pendant",
                availability: "InStock",
                condition: "New",
                gtin: "123456789012",
                mpn: "Gum Gum Pendant",
                sku: "Gum Gum Pendant"
            }
        },
        relatedProducts: [
            {
                id: 1,
                name: 'Mender Pendant',
                slug: 'mender-pendant',
                imageUrl: new2,
                imageUrlLit: new2,
                price: 2400,
                originalPrice: 3200,
                rating: 4.8,
                reviewCount: 127,
                culturalStory: 'Inspired by the ancient Amharic word "mender" meaning recovery, this piece represents renewal and strength.'
            },
            {
                id: 3,
                name: 'Nikisat Table Lamp',
                slug: 'nikisat-table-lamp',
                imageUrl: new5,
                imageUrlLit: new5,
                price: 980,
                originalPrice: 1400,
                rating: 4.7,
                reviewCount: 203,
                culturalStory: 'Embodying the warmth of Ethiopian hospitality'
            },
            {
                id: 4,
                name: 'Qedamawi Floor Lamp',
                slug: 'qedamawi-floor-lamp',
                imageUrl: new14,
                imageUrlLit: new14,
                price: 3200,
                originalPrice: 4500,
                rating: 4.9,
                reviewCount: 156,
                isSignature: true,
                culturalStory: 'Qedamawi means "first" in Ge\'ez, representing the beginning of enlightenment.'
            }
        ]
    },
    'nikisat-table-lamp': {
        id: 3,
        name: 'Nikisat Table Lamp',
        slug: 'nikisat-table-lamp',
        description:
            'Embodying the warmth of Ethiopian hospitality, the Nikisat Table Lamp brings gentle illumination and cultural elegance to any space.',
        shortDescription: 'Embodying the warmth of Ethiopian hospitality',
        imageUrl: new5,
        productImages: [
            { id: '1', url: new5, alt: 'Nikisat Table Lamp - Main View', isPrimary: true },
            { id: '2', url: new2, alt: 'Nikisat Table Lamp - Detail' },
            { id: '3', url: new3, alt: 'Nikisat Table Lamp - Lifestyle' },
            { id: '4', url: new14, alt: 'Nikisat Table Lamp - Close Up' }
        ],
        category: 'table',
        dimensions: '30 × 30 × 50 cm',
        craftingTime: '1-2 weeks',
        artisan: 'Master Dawit',
        price: 980,
        originalPrice: 1400,
        rating: 4.7,
        reviewCount: 203,
        isSignature: false,
        culturalStory:
            'Nikisat represents the Ethiopian value of hospitality, creating warm spaces for gathering and connection.',
        features: [
            'Touch control',
            'USB charging port',
            'Warm light technology',
            'Compact design',
            'Energy efficient'
        ],
        variants: [
            {
                id: 'warm-brass',
                name: 'Warm Brass',
                colorName: 'Brass',
                colorHex: '#B8860B',
                imageUrl: new5,
                inStock: true
            },
            {
                id: 'matte-black',
                name: 'Matte Black',
                colorName: 'Black',
                colorHex: '#2C2C2C',
                imageUrl: new14,
                inStock: true
            }
        ],
        specificationsSection: {
            title: "Technical Specifications",
            measurementSection: {
                title: "MEASUREMENT",
                items: [
                    { label: "WEIGHT", value: "2.1 KG", unit: "KG" },
                    { label: "DIMENSIONS", value: "30 × 30 × 50 cm" }
                ]
            },
            specsSection: {
                title: "SPECS",
                items: [
                    { label: "TYPE", value: "TABLE LAMP", icon: '💡' },
                    { label: "MATERIAL", value: "METAL & FABRIC", icon: '🔧' },
                    { label: "BULB", value: "INTEGRATED LED", icon: '💡' }
                ]
            }
        },
        technicalDiagram: {
            title: "Technical Drawing",
            imageUrl: new5,
            imageAlt: "Nikisat Table Lamp - Technical Drawing",
            caption: "This is a technical drawing of the Nikisat Table Lamp",
            showDimensions: true,
            dimensions: [
                { label: "Width", value: "30cm" },
                { label: "Height", value: "30cm" },
                { label: "Base", value: "50cm" }
            ]
        },
        reviewsSection: {
            title: "OUR REVIEWS",
            subtitle: "What our customers say",
            showRatingSummary: true,
            ratingSummaryText: "{percentage}% of reviewers recommend this product",
            reviews: [
                {
                    id: "review1",
                    customerName: "Jane Smith",
                    customerLocation: "ADDIS ABABA, ET",
                    customerAge: "AGE 35 TO 44",
                    isVerifiedBuyer: true,
                    rating: 5,
                    title: "Great Quality",
                    content: "I've been using this lamp for a few weeks now and it's holding up well. The craftsmanship is top-notch.",
                    date: "1 month ago",
                    isRecommended: true,
                    helpfulCount: 5
                },
                {
                    id: "review2",
                    customerName: "John Doe",
                    customerLocation: "ADDIS ABABA, ET",
                    customerAge: "AGE 28 TO 34",
                    isVerifiedBuyer: true,
                    rating: 4,
                    title: "Beautiful Design",
                    content: "I love the warm light technology and the compact design. It's a beautiful addition to my living room.",
                    date: "2 months ago",
                    isRecommended: true,
                    helpfulCount: 8
                }
            ],
            showWriteReviewButton: true,
            writeReviewButtonText: "Write a Review"
        },
        warranty: '3 Year Limited Warranty',
        shippingInfo: 'Free shipping worldwide. 1-2 weeks delivery.',
        materials: ['Brass/Steel', 'Fabric Shade', 'LED Technology'],
        inStock: true,
        stockQuantity: 15,
        freeShippingEligible: true,
        returns: {
            policy: 'Free returns within 30 days',
            days: 30
        },
        seo: {
            metaTitle: "Nikisat Table Lamp - Warm and Elegant Table Lamp",
            metaDescription: "Discover the warmth and elegance of the Nikisat Table Lamp. Handcrafted in Ethiopia, it's a beautiful addition to any space.",
            keywords: ["Nikisat Table Lamp", "Warm light technology", "Compact design", "Elegant table lamp", "Ethiopian craftsmanship"],
            openGraph: {
                title: "Nikisat Table Lamp - Warm and Elegant Table Lamp",
                description: "Discover the warmth and elegance of the Nikisat Table Lamp. Handcrafted in Ethiopia, it's a beautiful addition to any space.",
                image: new5,
                imageAlt: "Nikisat Table Lamp - Main View"
            },
            structuredData: {
                brand: "Master Dawit",
                category: "table",
                availability: "InStock",
                condition: "New",
                gtin: "123456789012",
                mpn: "Nikisat Table Lamp",
                sku: "Nikisat Table Lamp"
            }
        },
        relatedProducts: [
            {
                id: 1,
                name: 'Mender Pendant',
                slug: 'mender-pendant',
                imageUrl: new2,
                imageUrlLit: new2,
                price: 2400,
                originalPrice: 3200,
                rating: 4.8,
                reviewCount: 127,
                culturalStory: 'Inspired by the ancient Amharic word "mender" meaning recovery, this piece represents renewal and strength.'
            },
            {
                id: 2,
                name: 'Gum Gum Pendant',
                slug: 'gum-gum-pendant',
                imageUrl: new3,
                imageUrlLit: new3,
                price: 1800,
                originalPrice: 2400,
                rating: 4.9,
                reviewCount: 89,
                isSignature: true,
                culturalStory: 'Named after the traditional Ethiopian basket, each strand tells a story of community and craftsmanship.'
            },
            {
                id: 4,
                name: 'Qedamawi Floor Lamp',
                slug: 'qedamawi-floor-lamp',
                imageUrl: new14,
                imageUrlLit: new14,
                price: 3200,
                originalPrice: 4500,
                rating: 4.9,
                reviewCount: 156,
                isSignature: true,
                culturalStory: 'Qedamawi means "first" in Ge\'ez, representing the beginning of enlightenment.'
            }
        ]
    },
    'qedamawi-floor-lamp': {
        id: 4,
        name: 'Qedamawi Floor Lamp',
        slug: 'qedamawi-floor-lamp',
        description:
            'Standing tall like the ancient obelisks of Axum, the Qedamawi Floor Lamp represents the beginning of enlightenment and architectural grandeur.',
        shortDescription: 'Standing tall like the ancient obelisks of Axum',
        imageUrl: new14,
        productImages: [
            { id: '1', url: new14, alt: 'Qedamawi Floor Lamp - Main View', isPrimary: true },
            { id: '2', url: new2, alt: 'Qedamawi Floor Lamp - Detail' },
            { id: '3', url: new3, alt: 'Qedamawi Floor Lamp - Environment' },
            { id: '4', url: new5, alt: 'Qedamawi Floor Lamp - Close Up' }
        ],
        category: 'floor',
        dimensions: '50 × 50 × 150 cm',
        craftingTime: '4-5 weeks',
        artisan: 'Master Haile',
        price: 3200,
        originalPrice: 4500,
        rating: 4.9,
        reviewCount: 156,
        isSignature: true,
        culturalStory:
            'Qedamawi means "first" in Ge\'ez, representing the beginning of enlightenment and wisdom.',
        features: [
            'Smart home compatible',
            'Multiple lighting modes',
            'Handcrafted base',
            'Premium materials',
            'Architectural design'
        ],
        variants: [
            {
                id: 'antique-bronze',
                name: 'Antique Bronze',
                colorName: 'Bronze',
                colorHex: '#CD7F32',
                imageUrl: new14,
                inStock: true
            },
            {
                id: 'charcoal-steel',
                name: 'Charcoal Steel',
                colorName: 'Charcoal',
                colorHex: '#36454F',
                price: 3400,
                imageUrl: new2,
                inStock: true
            }
        ],
        specificationsSection: {
            title: "Technical Specifications",
            measurementSection: {
                title: "MEASUREMENT",
                items: [
                    { label: "WEIGHT", value: "8.5 KG", unit: "KG" },
                    { label: "DIMENSIONS", value: "50 × 50 × 150 cm" }
                ]
            },
            specsSection: {
                title: "SPECS",
                items: [
                    { label: "TYPE", value: "FLOOR LAMP", icon: '💡' },
                    { label: "MATERIAL", value: "BRONZE & STEEL", icon: '🏛️' },
                    { label: "BULB", value: "SMART LED (Included)", icon: '💡' }
                ]
            }
        },
        technicalDiagram: {
            title: "Technical Drawing",
            imageUrl: new14,
            imageAlt: "Qedamawi Floor Lamp - Technical Drawing",
            caption: "This is a technical drawing of the Qedamawi Floor Lamp",
            showDimensions: true,
            dimensions: [
                { label: "Width", value: "50cm" },
                { label: "Height", value: "50cm" },
                { label: "Base", value: "150cm" }
            ]
        },
        reviewsSection: {
            title: "OUR REVIEWS",
            subtitle: "What our customers say",
            showRatingSummary: true,
            ratingSummaryText: "{percentage}% of reviewers recommend this product",
            reviews: [
                {
                    id: "review1",
                    customerName: "Jane Smith",
                    customerLocation: "ADDIS ABABA, ET",
                    customerAge: "AGE 35 TO 44",
                    isVerifiedBuyer: true,
                    rating: 5,
                    title: "Great Quality",
                    content: "I've been using this lamp for a few weeks now and it's holding up well. The craftsmanship is top-notch.",
                    date: "1 month ago",
                    isRecommended: true,
                    helpfulCount: 5
                },
                {
                    id: "review2",
                    customerName: "John Doe",
                    customerLocation: "ADDIS ABABA, ET",
                    customerAge: "AGE 28 TO 34",
                    isVerifiedBuyer: true,
                    rating: 4,
                    title: "Beautiful Design",
                    content: "I love the smart home compatibility and the multiple lighting modes. It's a beautiful addition to my living room.",
                    date: "2 months ago",
                    isRecommended: true,
                    helpfulCount: 8
                }
            ],
            showWriteReviewButton: true,
            writeReviewButtonText: "Write a Review"
        },
        warranty: '10 Year Limited Warranty',
        shippingInfo: 'Free white-glove delivery worldwide. 3-5 weeks.',
        materials: ['Bronze', 'Steel', 'Smart LED Technology'],
        inStock: true,
        stockQuantity: 5,
        freeShippingEligible: true,
        returns: {
            policy: 'Free returns within 30 days',
            days: 30
        },
        seo: {
            metaTitle: "Qedamawi Floor Lamp - Elegant and Smart Floor Lamp",
            metaDescription: "Discover the elegance and smart features of the Qedamawi Floor Lamp. Handcrafted in Ethiopia, it's a beautiful addition to any space.",
            keywords: ["Qedamawi Floor Lamp", "Smart home compatible", "Multiple lighting modes", "Elegant floor lamp", "Ethiopian craftsmanship"],
            openGraph: {
                title: "Qedamawi Floor Lamp - Elegant and Smart Floor Lamp",
                description: "Discover the elegance and smart features of the Qedamawi Floor Lamp. Handcrafted in Ethiopia, it's a beautiful addition to any space.",
                image: new14,
                imageAlt: "Qedamawi Floor Lamp - Main View"
            },
            structuredData: {
                brand: "Master Haile",
                category: "floor",
                availability: "InStock",
                condition: "New",
                gtin: "123456789012",
                mpn: "Qedamawi Floor Lamp",
                sku: "Qedamawi Floor Lamp"
            }
        },
        relatedProducts: [
            {
                id: 1,
                name: 'Mender Pendant',
                slug: 'mender-pendant',
                imageUrl: new2,
                imageUrlLit: new2,
                price: 2400,
                originalPrice: 3200,
                rating: 4.8,
                reviewCount: 127,
                culturalStory: 'Inspired by the ancient Amharic word "mender" meaning recovery, this piece represents renewal and strength.'
            },
            {
                id: 2,
                name: 'Gum Gum Pendant',
                slug: 'gum-gum-pendant',
                imageUrl: new3,
                imageUrlLit: new3,
                price: 1800,
                originalPrice: 2400,
                rating: 4.9,
                reviewCount: 89,
                isSignature: true,
                culturalStory: 'Named after the traditional Ethiopian basket, each strand tells a story of community and craftsmanship.'
            },
            {
                id: 3,
                name: 'Nikisat Table Lamp',
                slug: 'nikisat-table-lamp',
                imageUrl: new5,
                imageUrlLit: new5,
                price: 980,
                originalPrice: 1400,
                rating: 4.7,
                reviewCount: 203,
                culturalStory: 'Embodying the warmth of Ethiopian hospitality'
            }
        ]
    }
};

// CMS-ready function to fetch product data
async function getProductBySlug(slug: string): Promise<Product | null> {
    // In a real CMS, this would be:
    // const response = await fetch(`${CMS_API_URL}/products/${slug}`);
    // return response.json();

    // For now, return mock data
    return PRODUCTS[slug] || null;
}

export const load: PageServerLoad = async ({ params }) => {
    const { slug } = params;

    if (!slug) {
        throw error(404, 'Product not found');
    }

    const product = await getProductBySlug(slug);

    if (!product) {
        throw error(404, 'Product not found');
    }

    return {
        product
    };
}; 