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
  addToCart: (product: CartProduct) => {
    const cart = get().products;

    const cartItem = cart.find(
      cartProduct => cartProduct.variantId === product.variantId,
    );

    if (cartItem) {
      const updatedProducts = cart.map(cartProduct =>
        cartProduct.variantId === product.variantId
          ? { ...product, quantity: cartProduct.quantity + product.quantity }
          : product,
      );

      const updatedCart = {
        products: updatedProducts,
        totalItems: get().totalItems + product.quantity,
        totalPrice: get().totalPrice + product.price * product.quantity,
      };

      set(state => ({
        products: updatedProducts,
        totalItems: state.totalItems + product.quantity,
        totalPrice: state.totalPrice + product.price * product.quantity,
      }));

      StorageService.setItem(StorageKeys.CART, JSON.stringify(updatedCart));
    } else {
      const updatedProducts = [
        ...cart,
        { ...product, quantity: product.quantity },
      ];

      const updatedCart = {
        products: updatedProducts,
        totalItems: get().totalItems + product.quantity,
        totalPrice: get().totalPrice + product.price * product.quantity,
      };

      set(state => ({
        products: updatedProducts,
        totalItems: state.totalItems + product.quantity,
        totalPrice: state.totalPrice + product.price * product.quantity,
      }));

      StorageService.setItem(StorageKeys.CART, JSON.stringify(updatedCart));
    }
  },
  removeFromCart: (variantId: number, quantity?: number) => {
    const cartProducts = get().products;

    const productToRemove = cartProducts.find(
      cartProduct => cartProduct.variantId === variantId,
    );

    const productQuantityToRemove = quantity || productToRemove?.quantity || 1;

    const productPriceToRemove =
      (productToRemove?.price || 0) * productQuantityToRemove;

    const shouldFilterOutProduct =
      (productToRemove?.quantity || 1) - productQuantityToRemove > 0;

    const updatedProducts = shouldFilterOutProduct
      ? get().products.map(cartProduct =>
          cartProduct.variantId === variantId
            ? {
                ...cartProduct,
                quantity: cartProduct.quantity - 1,
              }
            : cartProduct,
        )
      : get().products.filter(
          cartProduct => cartProduct.variantId !== variantId,
        );

    set(state => ({
      products: updatedProducts,
      totalItems: state.totalItems - productQuantityToRemove,
      totalPrice: state.totalPrice - productPriceToRemove,
    }));

    const updatedCart = {
      products: updatedProducts,
      totalItems: get().totalItems - productQuantityToRemove,
      totalPrice: get().totalPrice - productPriceToRemove,
    };

    StorageService.setItem(StorageKeys.CART, JSON.stringify(updatedCart));
  },
}));
