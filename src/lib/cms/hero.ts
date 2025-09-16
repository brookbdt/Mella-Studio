import { writable, derived } from 'svelte/store'
import { browser } from '$app/environment'
import { executeGraphQLQuery } from '$lib/graphql/client'
import { PUBLIC_TENANT_ID } from '$env/static/public'

// Hero Section types
export interface HeroSection {
    id: string
    tenantId: string
    badge: string
    headline: string
    subtitle: string
    firstWordStyle: {
        fontFamily: string
        fontWeight: number
        color: string
    }
    lastWordStyle: {
        fontFamily: string
        fontWeight: number
        color: string
        fontStyle: string
    }
    cta: {
        text: string
        href: string
    }
    backgroundMedia: {
        desktop: string
        mobile: string
    }
    isActive: boolean
    order: number
    createdAt: string
    updatedAt: string
}

export interface HeroSectionConfig {
    id: string
    tenantId: string
    sections: HeroSection[]
    autoRotate: boolean
    rotateInterval: number
    createdAt: string
    updatedAt: string
}

// GraphQL query for hero sections
const GET_HERO_SECTIONS = `
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
`

// Default fallback hero section config
export const defaultHeroSections: Omit<HeroSection, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>[] = [
    {
        badge: '',
        headline: 'Lighting Your Space with Warmth, Culture, and Soul.',
        subtitle: '',
        firstWordStyle: {
            fontFamily: 'seasons',
            fontWeight: 400,
            color: '#2c2c2c'
        },
        lastWordStyle: {
            fontFamily: 'seasons',
            fontWeight: 400,
            color: '#2c2c2c',
            fontStyle: 'normal'
        },
        cta: {
            text: 'Shop Collection',
            href: '/collection'
        },
        backgroundMedia: {
            desktop: '/src/lib/assets/images/etege long cover.jpg',
            mobile: '/src/lib/assets/images/Etegen Profile cover.jpg'
        },
        isActive: true,
        order: 1
    }
]

// Hero stores
export const heroSections = writable<HeroSection[]>([])
export const heroLoading = writable<boolean>(false)
export const heroError = writable<string | null>(null)
export const currentHeroIndex = writable<number>(0)

// Derived store to get the active hero section
export const activeHeroSection = derived(
    [heroSections, currentHeroIndex],
    ([$heroSections, $currentHeroIndex]) => {
        const activeSections = $heroSections.filter(section => section.isActive)
        return activeSections[$currentHeroIndex] || activeSections[0] || null
    }
)

// Derived store to check if hero is ready
export const heroReady = derived(
    [heroSections, heroLoading],
    ([$heroSections, $heroLoading]) => {
        return $heroSections.length > 0 && !$heroLoading
    }
)

// Function to fetch hero sections
export async function fetchHeroSections(options?: { fetch?: typeof fetch }): Promise<HeroSection[]> {
    if (!browser) return []

    heroLoading.set(true)
    heroError.set(null)

    try {
        const result = await executeGraphQLQuery(
            GET_HERO_SECTIONS,
            { tenantId: PUBLIC_TENANT_ID },
            'GetHeroSections',
            {
                fetch: options?.fetch,
                tenantId: PUBLIC_TENANT_ID
            }
        )

        if (result?.getHeroSections && Array.isArray(result.getHeroSections)) {
            const sections = result.getHeroSections as HeroSection[]
            const activeSections = sections
                .filter(section => section.isActive)
                .sort((a, b) => a.order - b.order)

            heroSections.set(activeSections)
            return activeSections
        } else {
            // Use default sections if no CMS data found
            console.warn('No hero sections found in CMS, using default configuration')
            const fallbackSections: HeroSection[] = defaultHeroSections.map((section, index) => ({
                id: `default-${index}`,
                tenantId: PUBLIC_TENANT_ID || 'mellastudio',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                ...section
            }))

            heroSections.set(fallbackSections)
            return fallbackSections
        }
    } catch (error) {
        console.error('Error fetching hero sections:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch hero sections'
        heroError.set(errorMessage)

        // Set fallback sections on error
        const fallbackSections: HeroSection[] = defaultHeroSections.map((section, index) => ({
            id: `default-${index}`,
            tenantId: PUBLIC_TENANT_ID || 'mellastudio',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...section
        }))

        heroSections.set(fallbackSections)
        return fallbackSections
    } finally {
        heroLoading.set(false)
    }
}

// Function to refresh hero sections
export async function refreshHeroSections(options?: { fetch?: typeof fetch }): Promise<HeroSection[]> {
    heroSections.set([]) // Clear current sections to force refetch
    return fetchHeroSections(options)
}

// Function to navigate between hero sections (for auto-rotation or manual control)
export function setHeroIndex(index: number): void {
    currentHeroIndex.set(index)
}

// Function to get next hero section index
export function getNextHeroIndex(sectionsLength: number, currentIndex: number): number {
    return (currentIndex + 1) % sectionsLength
}

// Function to get previous hero section index  
export function getPreviousHeroIndex(sectionsLength: number, currentIndex: number): number {
    return currentIndex === 0 ? sectionsLength - 1 : currentIndex - 1
} 