'use server';

import { Product } from '@features/products/api/types/product';
import { supabase } from '@lib/init-supabase';

export const fetchProducts = async () => {
  const { data } = await supabase
    .from('products')
    .select('*')
    .returns<Product[]>();

  return data;
};

export const fetchRecommendedProducts = async () => {
  const { data } = await supabase
    .from('products')
    .select('*')
    .is('isRecommended', true)
    .returns<Product[]>();

  return data;
};
