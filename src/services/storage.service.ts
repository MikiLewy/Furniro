'use client';

export enum StorageKeys {
  CART = 'cart',
}

export class StorageService {
  static setItem(key: string, value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  static getItem(key: string) {
    return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  }

  static removeItem(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
