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
import new9 from '$lib/assets/images/new9.jpg';
import new10 from '$lib/assets/images/new10.jpg';
import gallery1 from '$lib/assets/images/gallery1.jpg';
import gallery2 from '$lib/assets/images/gallery2.jpg';
import gallery3 from '$lib/assets/images/gallery3.jpg';
import services1 from '$lib/assets/images/services1.jpg';
import services2 from '$lib/assets/images/services2.jpg';
import services3 from '$lib/assets/images/services3.jpg';

export const load: PageServerLoad = async () => {
    // CMS-ready data structure for spaces
    // Using actual assets as placeholders - replace with CMS API calls once integrated
    const spacesData = {
        hero: {
            title: "TRANSFORM YOUR SPACE",
            subtitle: "Discover how our lighting transforms every room",
            description: "From intimate residential spaces to grand commercial environments, see how MellaStudio lighting creates atmosphere and defines character."
        },
        categories: [
            {
                id: 'residential',
                name: 'Residential Spaces',
                description: 'Home lighting solutions that create warmth and personality',
                imageUrl: gallery1,
                spaces: [
                    {
                        id: 'living-room',
                        name: 'Living Rooms',
                        description: 'Statement pieces that become conversation starters',
                        imageUrl: new1,
                        featured: true
                    },
                    {
                        id: 'dining-room',
                        name: 'Dining Rooms',
                        description: 'Elegant pendant lights that define gathering spaces',
                        imageUrl: new2,
                        featured: true
                    },
                    {
                        id: 'bedroom',
                        name: 'Bedrooms',
                        description: 'Soft, ambient lighting for rest and relaxation',
                        imageUrl: new3,
                        featured: false
                    },
                    {
                        id: 'kitchen',
                        name: 'Kitchens',
                        description: 'Functional yet beautiful task and ambient lighting',
                        imageUrl: new4,
                        featured: false
                    }
                ]
            },
            {
                id: 'commercial',
                name: 'Commercial Spaces',
                description: 'Professional lighting that enhances business environments',
                imageUrl: gallery2,
                spaces: [
                    {
                        id: 'restaurants',
                        name: 'Restaurants',
                        description: 'Atmosphere-defining lighting for dining experiences',
                        imageUrl: new5,
                        featured: true
                    },
                    {
                        id: 'offices',
                        name: 'Offices',
                        description: 'Professional lighting that inspires productivity',
                        imageUrl: new6,
                        featured: true
                    },
                    {
                        id: 'hotels',
                        name: 'Hotels',
                        description: 'Luxury lighting for hospitality environments',
                        imageUrl: new7,
                        featured: false
                    },
                    {
                        id: 'retail',
                        name: 'Retail',
                        description: 'Accent lighting that showcases products beautifully',
                        imageUrl: new8,
                        featured: false
                    }
                ]
            }
        ],
        featured: {
            title: "FEATURED INSTALLATIONS",
            projects: [
                {
                    id: 'luxury-penthouse',
                    name: 'Addis Ababa Luxury Penthouse',
                    location: 'Addis Ababa, Ethiopia',
                    category: 'Residential',
                    description: 'A comprehensive lighting design featuring custom pendant lights and floor lamps throughout a 3,000 sq ft penthouse.',
                    imageUrl: services1,
                    gallery: [
                        new9,
                        new10,
                        gallery3
                    ]
                },
                {
                    id: 'heritage-restaurant',
                    name: 'Yod Abyssinia Restaurant',
                    location: 'Addis Ababa, Ethiopia',
                    category: 'Commercial',
                    description: 'Traditional Ethiopian motifs reimagined in contemporary pendant lighting for an authentic dining experience.',
                    imageUrl: services2,
                    gallery: [
                        services3,
                        gallery1,
                        gallery2
                    ]
                }
            ]
        },
        testimonials: [
            {
                id: 1,
                quote: "MellaStudio completely transformed our home. The lighting doesn't just illuminate - it creates emotion.",
                author: "Sarah M.",
                location: "Addis Ababa",
                project: "Modern Villa Renovation"
            },
            {
                id: 2,
                quote: "The custom pendants in our restaurant have become a signature element that guests always remember.",
                author: "Chef Marcus K.",
                location: "Bole District",
                project: "Fine Dining Restaurant"
            }
        ]
    };

    return {
        spaces: spacesData
    };
}; 