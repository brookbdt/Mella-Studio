import type { PageServerLoad } from './$types';

// Import actual images from assets as CMS placeholders
import new1 from '$lib/assets/images/new1.jpg';
import new2 from '$lib/assets/images/new2.jpg';
import new3 from '$lib/assets/images/new3.jpg';
import new4 from '$lib/assets/images/new4.jpg';
import new5 from '$lib/assets/images/new5.jpg';
import gallery1 from '$lib/assets/images/gallery1.jpg';
import gallery2 from '$lib/assets/images/gallery2.jpg';
import gallery3 from '$lib/assets/images/gallery3.jpg';
import QedamawiArt from '$lib/assets/images/QedamawiArt.jpg';
import QedamawiArt2 from '$lib/assets/images/QedamawiArt2.jpg';

export const load: PageServerLoad = async () => {
    // CMS-ready data structure for press & events
    // Using actual assets as placeholders - replace with CMS API calls once integrated
    const pressEventsData = {
        hero: {
            title: "PRESS & EVENTS",
            subtitle: "In the spotlight: Our journey through media and milestones",
            description: "Discover our latest press coverage, upcoming events, and the milestones that mark our journey in transforming spaces through Ethiopian-inspired lighting design."
        },
        featured: {
            id: 'architectural-digest-feature',
            title: 'MellaStudio Featured in Architectural Digest Africa',
            excerpt: 'Our Addis Heritage Hotel project has been featured as the cover story in Architectural Digest Africa\'s latest issue on African design excellence.',
            type: 'Press',
            date: '2024-01-20',
            publication: 'Architectural Digest Africa',
            imageUrl: QedamawiArt,
            link: 'https://ad-africa.com/mellastudio-feature'
        },
        pressItems: [
            {
                id: 'design-award-2024',
                title: 'MellaStudio Wins Ethiopian Design Excellence Award 2024',
                excerpt: 'Recognition for our innovative approach to blending traditional Ethiopian patterns with contemporary lighting design.',
                type: 'Award',
                date: '2024-01-15',
                publication: 'Ethiopian Design Council',
                imageUrl: new1,
                link: 'https://designcouncil.et/awards-2024'
            },
            {
                id: 'forbes-africa-interview',
                title: 'Forbes Africa Interviews MellaStudio Founders',
                excerpt: 'An in-depth look at how we\'re building a global brand rooted in Ethiopian craftsmanship and heritage.',
                type: 'Interview',
                date: '2024-01-10',
                publication: 'Forbes Africa',
                imageUrl: new2,
                link: 'https://forbesafrica.com/mellastudio-founders'
            },
            {
                id: 'luxury-lifestyle-feature',
                title: 'Featured in Luxury Lifestyle Magazine',
                excerpt: 'Our custom residential lighting solutions showcased as examples of luxury African design.',
                type: 'Feature',
                date: '2024-01-05',
                publication: 'Luxury Lifestyle Magazine',
                imageUrl: gallery1,
                link: 'https://luxurylifestyle.com/african-lighting-design'
            },
            {
                id: 'sustainable-design-mention',
                title: 'Sustainability Practices Highlighted in Green Building Review',
                excerpt: 'Our commitment to sustainable lighting practices featured in the latest sustainability report.',
                type: 'Article',
                date: '2023-12-28',
                publication: 'Green Building Review',
                imageUrl: new3,
                link: 'https://greenbuildreview.com/sustainable-lighting'
            }
        ],
        events: [
            {
                id: 'design-week-addis-2024',
                title: 'Addis Design Week 2024 - Main Exhibition',
                description: 'Showcasing our latest collection of Ethiopian-inspired pendant lights and floor lamps.',
                type: 'Exhibition',
                date: '2024-03-15',
                endDate: '2024-03-22',
                location: 'Addis Ababa, Ethiopia',
                venue: 'Millennium Hall',
                status: 'upcoming',
                imageUrl: gallery2,
                registrationLink: 'https://addisdesignweek.com/register'
            },
            {
                id: 'craft-heritage-symposium',
                title: 'Ethiopian Craft Heritage Symposium',
                description: 'A panel discussion on preserving traditional craftsmanship in modern design, featuring MellaStudio founders.',
                type: 'Speaking',
                date: '2024-02-28',
                location: 'Addis Ababa, Ethiopia',
                venue: 'Ethiopian Cultural Center',
                status: 'upcoming',
                imageUrl: QedamawiArt2,
                registrationLink: 'https://craftheritage.et/symposium'
            },
            {
                id: 'luxury-home-expo-2024',
                title: 'East Africa Luxury Home Expo 2024',
                description: 'Presenting our residential lighting collection alongside leading African luxury brands.',
                type: 'Trade Show',
                date: '2024-04-10',
                endDate: '2024-04-13',
                location: 'Nairobi, Kenya',
                venue: 'Kenyatta International Convention Centre',
                status: 'upcoming',
                imageUrl: gallery3,
                registrationLink: 'https://luxuryhomeexpo.co.ke'
            },
            {
                id: 'workshop-lighting-fundamentals',
                title: 'Lighting Design Fundamentals Workshop',
                description: 'A hands-on workshop for interior designers and architects on the principles of lighting design.',
                type: 'Workshop',
                date: '2024-01-25',
                location: 'Addis Ababa, Ethiopia',
                venue: 'MellaStudio Showroom',
                status: 'past',
                imageUrl: new4,
                registrationLink: null
            }
        ],
        upcomingEvents: [
            {
                id: 'design-week-addis-2024',
                title: 'Addis Design Week 2024',
                date: '2024-03-15',
                location: 'Addis Ababa',
                type: 'Exhibition'
            },
            {
                id: 'craft-heritage-symposium',
                title: 'Ethiopian Craft Heritage Symposium',
                date: '2024-02-28',
                location: 'Addis Ababa',
                type: 'Speaking'
            },
            {
                id: 'luxury-home-expo-2024',
                title: 'East Africa Luxury Home Expo',
                date: '2024-04-10',
                location: 'Nairobi',
                type: 'Trade Show'
            }
        ],
        mediaKit: {
            title: "Media Kit",
            description: "Download our press kit for high-resolution images, company information, and founder bios.",
            items: [
                { name: "Company Overview", type: "PDF", size: "2.1 MB" },
                { name: "High-Res Product Images", type: "ZIP", size: "45.3 MB" },
                { name: "Founder Bios & Photos", type: "PDF", size: "3.8 MB" },
                { name: "Logo Package", type: "ZIP", size: "12.1 MB" }
            ]
        }
    };

    return {
        pressEvents: pressEventsData
    };
}; 