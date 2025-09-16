import type { PageServerLoad } from './$types';

// Import actual images from assets as CMS placeholders
import new11 from '$lib/assets/images/new11.jpg';
import new12 from '$lib/assets/images/new12.jpg';
import new13 from '$lib/assets/images/new13.jpg';
import new14 from '$lib/assets/images/new14.jpg';
import new15 from '$lib/assets/images/new15.jpg';
import new16 from '$lib/assets/images/new16.jpg';
import new17 from '$lib/assets/images/new17.jpg';
import new18 from '$lib/assets/images/new18.jpg';
import new19 from '$lib/assets/images/new19.jpg';
import new20 from '$lib/assets/images/new20.png';
import new21 from '$lib/assets/images/new21.png';
import new22 from '$lib/assets/images/new22.jpg';
import gallery4 from '$lib/assets/images/gallery4.jpg';
import gallery5 from '$lib/assets/images/gallery5.jpg';
import qedamawi from '$lib/assets/images/qedamawi.jpg';
import qedamawi2 from '$lib/assets/images/qedamawi2.jpg';
import QedamawiArt from '$lib/assets/images/QedamawiArt.jpg';
import QedamawiArt2 from '$lib/assets/images/QedamawiArt2.jpg';

export const load: PageServerLoad = async () => {
    // CMS-ready data structure for projects
    // Using actual assets as placeholders - replace with CMS API calls once integrated
    const projectsData = {
        hero: {
            title: "OUR LIGHTING PROJECTS",
            subtitle: "Illuminating Stories of Design Excellence",
            description: "Each project tells a unique story of collaboration, creativity, and craftsmanship. Explore how we've transformed spaces through thoughtful lighting design."
        },
        featured: {
            id: 'addis-heritage-hotel',
            name: 'Addis Heritage Hotel',
            location: 'Addis Ababa, Ethiopia',
            year: '2024',
            category: 'Hospitality',
            description: 'A comprehensive lighting renovation that honors Ethiopian heritage while meeting modern luxury standards.',
            challenge: 'Transform a historic building into a luxury hotel while preserving its cultural significance through lighting.',
            solution: 'Custom pendant lights inspired by traditional Ethiopian patterns, integrated with modern LED technology.',
            results: [
                '40% increase in energy efficiency',
                'Featured in Architectural Digest Africa',
                'Winner of Ethiopian Design Excellence Award 2024'
            ],
            heroImage: QedamawiArt,
            gallery: [
                qedamawi,
                qedamawi2,
                QedamawiArt2,
                gallery4
            ],
            specifications: {
                'Project Duration': '8 months',
                'Square Footage': '15,000 sq ft',
                'Custom Fixtures': '120 pieces',
                'Energy Savings': '40% reduction'
            }
        },
        projects: [
            {
                id: 'skyline-residences',
                name: 'Skyline Residences',
                location: 'Bole, Addis Ababa',
                year: '2024',
                category: 'Residential',
                type: 'Multi-family',
                description: 'Modern apartment complex featuring coordinated lighting design across 50 units.',
                imageUrl: new11,
                gallery: [
                    new12,
                    new13,
                    new14
                ],
                highlights: [
                    'Smart lighting integration',
                    'Energy-efficient LED systems',
                    'Cultural motif incorporation'
                ],
                featured: true
            },
            {
                id: 'cultural-center',
                name: 'Addis Cultural Center',
                location: 'Merkato, Addis Ababa',
                year: '2023',
                category: 'Cultural',
                type: 'Public Space',
                description: 'Public space lighting that celebrates Ethiopian art and culture through illumination.',
                imageUrl: new15,
                gallery: [
                    new16,
                    new17,
                    new18
                ],
                highlights: [
                    'Interactive light installations',
                    'Community engagement focus',
                    'Sustainable design principles'
                ],
                featured: true
            },
            {
                id: 'tech-startup-office',
                name: 'BlueMoon Tech Office',
                location: 'Kazanchis, Addis Ababa',
                year: '2023',
                category: 'Commercial',
                type: 'Office',
                description: 'Modern office space designed to inspire creativity and collaboration.',
                imageUrl: new19,
                gallery: [
                    new20,
                    new21,
                    new22
                ],
                highlights: [
                    'Circadian rhythm lighting',
                    'Flexible workspace solutions',
                    'Productivity-focused design'
                ],
                featured: false
            },
            {
                id: 'fine-dining-restaurant',
                name: 'Zoma Restaurant',
                location: 'Old Airport, Addis Ababa',
                year: '2023',
                category: 'Hospitality',
                type: 'Restaurant',
                description: 'Intimate dining atmosphere created through carefully curated pendant lighting.',
                imageUrl: gallery4,
                gallery: [
                    gallery5,
                    qedamawi,
                    QedamawiArt
                ],
                highlights: [
                    'Ambient mood lighting',
                    'Custom pendant designs',
                    'Dimmable control systems'
                ],
                featured: false
            },
            {
                id: 'luxury-villa',
                name: 'Private Villa Bole',
                location: 'Bole, Addis Ababa',
                year: '2022',
                category: 'Residential',
                type: 'Single Family',
                description: 'Luxurious private residence featuring statement lighting throughout.',
                imageUrl: new11,
                gallery: [
                    new12,
                    new13,
                    gallery4
                ],
                highlights: [
                    'Whole-home integration',
                    'Custom art light pieces',
                    'Outdoor lighting design'
                ],
                featured: false
            },
            {
                id: 'boutique-hotel',
                name: 'Taitu Boutique Hotel',
                location: 'Piazza, Addis Ababa',
                year: '2022',
                category: 'Hospitality',
                type: 'Hotel',
                description: 'Historic boutique hotel renovation with modern lighting solutions.',
                imageUrl: qedamawi2,
                gallery: [
                    QedamawiArt2,
                    gallery5,
                    new14
                ],
                highlights: [
                    'Historic preservation',
                    'Modern LED integration',
                    'Guest experience focus'
                ],
                featured: false
            }
        ],
        categories: [
            { id: 'all', name: 'All Projects', count: 6 },
            { id: 'residential', name: 'Residential', count: 2 },
            { id: 'commercial', name: 'Commercial', count: 1 },
            { id: 'hospitality', name: 'Hospitality', count: 2 },
            { id: 'cultural', name: 'Cultural', count: 1 }
        ],
        stats: {
            projectsCompleted: '50+',
            clientsSatisfied: '200+',
            squareFeetLit: '500K+',
            yearsExperience: '8+'
        }
    };

    return {
        projects: projectsData
    };
}; 