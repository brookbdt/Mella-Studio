import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import { executeGraphQLQuery } from '$lib/graphql/client';
import { PUBLIC_TENANT_ID } from '$env/static/public';

// Navbar specific types
export interface NavbarConfig {
    id: string;
    tenantId: string;
    logo: LogoConfig;
    centerNavigation: NavigationItem[];
    rightNavigation: NavigationItem[];
    searchConfig: SearchConfig;
    cartConfig: CartConfig;
    styling: NavbarStyling;
    createdAt: string;
    updatedAt: string;
}

export interface LogoConfig {
    src: string;
    alt: string;
    text: string;
    href: string;
}

export interface NavigationItem {
    text: string;
    href: string;
    target?: string;
}

export interface SearchConfig {
    placeholder: string;
    enabled: boolean;
}

export interface CartConfig {
    enabled: boolean;
}

export interface NavbarStyling {
    heroOverlayStyles: StyleConfig;
    scrolledStyles: StyleConfig;
}

export interface StyleConfig {
    backgroundColor: string;
    textColor: string;
    hoverTextColor: string;
    buttonHoverBg: string;
    logoFilter: string;
    borderColor: string;
}

// GraphQL query for navbar
const GET_NAVBAR_CONFIG = `
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
`;

// Default fallback navbar config
export const defaultNavbarConfig: Omit<NavbarConfig, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'> = {
    logo: {
        src: '/src/lib/assets/images/Logo.png',
        alt: 'MellaStudio',
        text: 'MELLA STUDIO',
        href: '/'
    },
    centerNavigation: [
        { text: 'Collection', href: '/collection' },
        { text: 'Spaces', href: '/spaces' },
        { text: 'Craftsmanship', href: '/craftsmanship' },
        { text: 'About', href: '/about' }
    ],
    rightNavigation: [
        { text: 'Contact', href: '/contact' }
    ],
    searchConfig: {
        placeholder: 'Search lighting...',
        enabled: true
    },
    cartConfig: {
        enabled: true
    },
    styling: {
        heroOverlayStyles: {
            backgroundColor: 'bg-transparent',
            textColor: 'text-white',
            hoverTextColor: 'hover:text-gray-200',
            buttonHoverBg: 'hover:bg-white/10',
            logoFilter: 'brightness-0 invert',
            borderColor: 'border-white/20'
        },
        scrolledStyles: {
            backgroundColor: 'bg-white',
            textColor: 'text-gray-900',
            hoverTextColor: 'hover:text-gray-600',
            buttonHoverBg: 'hover:bg-gray-100',
            logoFilter: 'none',
            borderColor: 'border-gray-200'
        }
    }
};

// Navbar stores
export const navbarConfig = writable<NavbarConfig | null>(null);
export const navbarLoading = writable<boolean>(false);
export const navbarError = writable<string | null>(null);

// Derived store to check if navbar is ready
export const navbarReady = derived(
    [navbarConfig, navbarLoading],
    ([$navbarConfig, $navbarLoading]) => {
        return !!$navbarConfig && !$navbarLoading;
    }
);

// Function to fetch navbar configuration
export async function fetchNavbarConfig(options?: { fetch?: typeof fetch }): Promise<NavbarConfig | null> {
    if (!browser) return null;

    navbarLoading.set(true);
    navbarError.set(null);

    try {
        const result = await executeGraphQLQuery(
            GET_NAVBAR_CONFIG,
            { tenantId: PUBLIC_TENANT_ID },
            'GetNavbarConfig',
            {
                fetch: options?.fetch,
                tenantId: PUBLIC_TENANT_ID
            }
        );

        if (result?.getNavbarConfig) {
            const config = result.getNavbarConfig as NavbarConfig;
            navbarConfig.set(config);
            return config;
        } else {
            // Use default config if no CMS data found
            console.warn('No navbar config found in CMS, using default configuration');
            const fallbackConfig: NavbarConfig = {
                id: 'default',
                tenantId: PUBLIC_TENANT_ID,
                ...defaultNavbarConfig,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            navbarConfig.set(fallbackConfig);
            return fallbackConfig;
        }
    } catch (error) {
        console.error('Error fetching navbar config:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch navbar config';
        navbarError.set(errorMessage);

        // Fallback to default config on error
        const fallbackConfig: NavbarConfig = {
            id: 'default',
            tenantId: PUBLIC_TENANT_ID,
            ...defaultNavbarConfig,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        navbarConfig.set(fallbackConfig);
        return fallbackConfig;
    } finally {
        navbarLoading.set(false);
    }
}

// Function to refresh navbar configuration
export async function refreshNavbarConfig(options?: { fetch?: typeof fetch }): Promise<NavbarConfig | null> {
    navbarConfig.set(null); // Clear current config to force refetch
    return fetchNavbarConfig(options);
} 