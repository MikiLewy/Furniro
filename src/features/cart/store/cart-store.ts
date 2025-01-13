import { create } from 'zustand';

import { StorageKeys, StorageService } from '@/services/storage.service';

interface CartProduct {
  productId: number;
  variantId: number;
  productName: string;
  productVariantName: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export type CartActions = {
  addToCart: (product: CartProduct) => void;
  removeFromCart: (variantId: number, quantity?: number) => void;
};

interface CartState {
  products: CartProduct[];
  totalItems: number;
  totalPrice: number;
}

const storageCart = JSON.parse(
  StorageService.getItem(StorageKeys.CART) || '{}',
) as CartState;

export const defaultState: CartState = {
  products: storageCart.products || [],
  totalItems: storageCart.totalItems || 0,
  totalPrice: storageCart.totalPrice || 0,
};

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()((set, get) => ({
  ...defaultState,
  addToCart: (addedProduct: CartProduct) => {
    const cart = get().products;

    const cartItem = cart.find(
      cartProduct => cartProduct.variantId === addedProduct.variantId,
    );

    if (cartItem) {
      set(state => {
        const updatedProducts = state.products.map(cartProduct => {
          if (cartProduct.variantId === addedProduct.variantId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + addedProduct.quantity,
            };
          }

          return cartProduct;
        });

        const updatedCart = {
          products: updatedProducts,
          totalItems: state.totalItems + addedProduct.quantity,
          totalPrice:
            state.totalPrice + addedProduct.price * addedProduct.quantity,
        };

        StorageService.setItem(StorageKeys.CART, JSON.stringify(updatedCart));

        return updatedCart;
      });
    } else {
      set(state => {
        const updatedProducts = [
          ...cart,
          { ...addedProduct, quantity: addedProduct.quantity },
        ];

        const updatedCart = {
          products: updatedProducts,
          totalItems: state.totalItems + addedProduct.quantity,
          totalPrice:
            state.totalPrice + addedProduct.price * addedProduct.quantity,
        };

        StorageService.setItem(StorageKeys.CART, JSON.stringify(updatedCart));

        return updatedCart;
      });
    }
  },
  removeFromCart: (variantId: number, quantity?: number) => {
    const cartProducts = get().products;

    const productToRemove = cartProducts.find(
      cartProduct => cartProduct.variantId === variantId,
    );

    if (!productToRemove) return;

    const productQuantityToRemove = quantity || productToRemove.quantity;

    const productPriceToRemove =
      productToRemove.price * productQuantityToRemove;

    const shouldFilterOutProduct =
      productToRemove.quantity - productQuantityToRemove <= 0;

    set(state => {
      const updatedProducts = shouldFilterOutProduct
        ? state.products.filter(
            cartProduct => cartProduct.variantId !== variantId,
          )
        : state.products.map(cartProduct =>
            cartProduct.variantId === variantId
              ? {
                  ...cartProduct,
                  quantity: cartProduct.quantity - 1,
                }
              : cartProduct,
          );

      const updatedCart = {
        products: updatedProducts,
        totalItems: state.totalItems - productQuantityToRemove,
        totalPrice: state.totalPrice - productPriceToRemove,
      };

      StorageService.setItem(StorageKeys.CART, JSON.stringify(updatedCart));

      return updatedCart;
    });
  },
}));
