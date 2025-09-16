import type { PageServerLoad } from './$types';

// Import actual images from assets as CMS placeholders
import new1 from '$lib/assets/images/new1.jpg';
import new2 from '$lib/assets/images/new2.jpg';
import new3 from '$lib/assets/images/new3.jpg';
import new4 from '$lib/assets/images/new4.jpg';
import new5 from '$lib/assets/images/new5.jpg';
import new6 from '$lib/assets/images/new6.jpg';
import new7 from '$lib/assets/images/new7.jpg';
import new8 from '$lib/assets/images/new8.jpg';
import services1 from '$lib/assets/images/services1.jpg';
import services2 from '$lib/assets/images/services2.jpg';
import services3 from '$lib/assets/images/services3.jpg';
import QedamawiArt from '$lib/assets/images/QedamawiArt.jpg';

export const load: PageServerLoad = async () => {
    // CMS-ready data structure for blog
    // Using actual assets as placeholders - replace with CMS API calls once integrated
    const blogData = {
        hero: {
            title: "INSIGHTS & INSPIRATION",
            subtitle: "Stories from the world of lighting design",
            description: "Discover the latest trends in lighting design, behind-the-scenes stories from our projects, and insights into Ethiopian craftsmanship."
        },
        featured: {
            id: 'ethiopian-patterns-modern-lighting',
            title: 'How Ethiopian Patterns Transform Modern Lighting Design',
            excerpt: 'Explore the rich heritage of Ethiopian artistic traditions and how we translate centuries-old patterns into contemporary lighting masterpieces.',
            author: 'MellaStudio Team',
            publishedDate: '2024-01-15',
            readTime: '8 min read',
            category: 'Design',
            imageUrl: QedamawiArt,
            tags: ['Ethiopian Heritage', 'Design Process', 'Cultural Arts']
        },
        posts: [
            {
                id: 'lighting-trends-2024',
                title: 'Top Lighting Trends for 2024: What\'s Illuminating Interior Design',
                excerpt: 'From sustainable materials to smart integration, discover the lighting trends shaping modern interiors this year.',
                author: 'Sarah Johnson',
                publishedDate: '2024-01-10',
                readTime: '6 min read',
                category: 'Trends',
                imageUrl: new1,
                tags: ['Trends', 'Interior Design', 'Technology'],
                featured: true
            },
            {
                id: 'sustainable-lighting-practices',
                title: 'Sustainable Lighting: How We\'re Reducing Environmental Impact',
                excerpt: 'Learn about our commitment to sustainability and the eco-friendly practices we implement in every lighting project.',
                author: 'Mark Chen',
                publishedDate: '2024-01-08',
                readTime: '5 min read',
                category: 'Sustainability',
                imageUrl: new2,
                tags: ['Sustainability', 'Environment', 'LED Technology'],
                featured: true
            },
            {
                id: 'residential-lighting-guide',
                title: 'Complete Guide to Residential Lighting Design',
                excerpt: 'Everything homeowners need to know about creating the perfect lighting scheme for their living spaces.',
                author: 'Emily Rodriguez',
                publishedDate: '2024-01-05',
                readTime: '10 min read',
                category: 'How-to',
                imageUrl: services1,
                tags: ['Residential', 'Design Guide', 'Home Lighting'],
                featured: true
            },
            {
                id: 'commercial-lighting-benefits',
                title: 'The Business Case for Quality Commercial Lighting',
                excerpt: 'How investing in professional lighting design can boost productivity, customer experience, and your bottom line.',
                author: 'David Park',
                publishedDate: '2024-01-03',
                readTime: '7 min read',
                category: 'Business',
                imageUrl: services2,
                tags: ['Commercial', 'Business', 'ROI'],
                featured: false
            },
            {
                id: 'lighting-psychology',
                title: 'The Psychology of Light: How Lighting Affects Mood and Behavior',
                excerpt: 'Understanding the psychological impact of lighting design and how to create spaces that positively influence well-being.',
                author: 'Dr. Lisa Wang',
                publishedDate: '2024-01-01',
                readTime: '9 min read',
                category: 'Science',
                imageUrl: new3,
                tags: ['Psychology', 'Wellness', 'Research'],
                featured: false
            },
            {
                id: 'artisan-spotlight',
                title: 'Artisan Spotlight: Meet the Craftspeople Behind Our Designs',
                excerpt: 'Get to know the talented Ethiopian artisans who bring our lighting designs to life through traditional craftsmanship.',
                author: 'MellaStudio Team',
                publishedDate: '2023-12-28',
                readTime: '6 min read',
                category: 'People',
                imageUrl: new4,
                tags: ['Artisans', 'Craftsmanship', 'Ethiopian Culture'],
                featured: false
            },
            {
                id: 'smart-lighting-integration',
                title: 'Smart Lighting Integration: The Future is Now',
                excerpt: 'Explore how smart technology is revolutionizing lighting control and what it means for modern homes and offices.',
                author: 'Tech Team',
                publishedDate: '2023-12-25',
                readTime: '8 min read',
                category: 'Technology',
                imageUrl: services3,
                tags: ['Smart Home', 'Technology', 'Automation'],
                featured: false
            },
            {
                id: 'restaurant-lighting-design',
                title: 'Creating Atmosphere: Restaurant Lighting Design Principles',
                excerpt: 'The art and science of restaurant lighting design - how to create the perfect dining atmosphere.',
                author: 'Hospitality Team',
                publishedDate: '2023-12-22',
                readTime: '7 min read',
                category: 'Hospitality',
                imageUrl: new5,
                tags: ['Restaurant', 'Hospitality', 'Atmosphere'],
                featured: false
            }
        ],
        categories: [
            { id: 'all', name: 'All Posts', count: 8 },
            { id: 'design', name: 'Design', count: 2 },
            { id: 'trends', name: 'Trends', count: 1 },
            { id: 'sustainability', name: 'Sustainability', count: 1 },
            { id: 'how-to', name: 'How-to', count: 1 },
            { id: 'technology', name: 'Technology', count: 1 },
            { id: 'business', name: 'Business', count: 1 },
            { id: 'people', name: 'People', count: 1 }
        ],
        newsletter: {
            title: "Stay Illuminated",
            description: "Get the latest lighting design insights, project updates, and exclusive content delivered to your inbox.",
            placeholder: "Enter your email address"
        }
    };

    return {
        blog: blogData
    };
}; 