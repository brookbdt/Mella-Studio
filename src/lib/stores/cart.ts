import { writable } from 'svelte/store';

// Cart item interface
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    variant?: {
        id: string;
        name: string;
        colorName: string;
    };
}

// Cart state interface
export interface CartState {
    items: CartItem[];
    count: number;
    total: number;
    isOpen: boolean;
}

// Initial cart state
const initialCartState: CartState = {
    items: [],
    count: 0,
    total: 0,
    isOpen: false
};

// Create the cart store
function createCartStore() {
    const { subscribe, set, update } = writable<CartState>(initialCartState);

    return {
        subscribe,

        // Add item to cart
        addItem: (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
            update(cart => {
                const existingItemIndex = cart.items.findIndex(
                    cartItem => cartItem.id === item.id &&
                        cartItem.variant?.id === item.variant?.id
                );

                if (existingItemIndex > -1) {
                    // Update quantity if item already exists
                    cart.items[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item to cart
                    cart.items = [...cart.items, { ...item, quantity }];
                }

                // Recalculate totals
                cart.count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
                cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                return cart;
            });
        },

        // Remove item from cart
        removeItem: (itemId: string, variantId?: string) => {
            update(cart => {
                cart.items = cart.items.filter(
                    item => !(item.id === itemId && item.variant?.id === variantId)
                );

                // Recalculate totals
                cart.count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
                cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                return cart;
            });
        },

        // Update item quantity
        updateQuantity: (itemId: string, quantity: number, variantId?: string) => {
            update(cart => {
                const itemIndex = cart.items.findIndex(
                    item => item.id === itemId && item.variant?.id === variantId
                );

                if (itemIndex > -1) {
                    if (quantity <= 0) {
                        cart.items.splice(itemIndex, 1);
                    } else {
                        cart.items[itemIndex].quantity = quantity;
                    }

                    // Recalculate totals
                    cart.count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
                    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                }

                return cart;
            });
        },

        // Toggle cart sidebar
        toggleCart: () => {
            update(cart => ({
                ...cart,
                isOpen: !cart.isOpen
            }));
        },

        // Close cart sidebar
        closeCart: () => {
            update(cart => ({
                ...cart,
                isOpen: false
            }));
        },

        // Clear cart
        clearCart: () => {
            set(initialCartState);
        }
    };
}

// Export the cart store instance
export const cartStore = createCartStore(); 