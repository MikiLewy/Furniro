import { supabase } from '@/lib/init-supabase';
import { Product } from '@/types/responses/Product';

export const fetchProducts = async () => {
  const { data } = await supabase.from('products').select('*').returns<Product[]>();

  return data;
};

export const fetchProduct = async (id: number) => {
  const { data } = await supabase.from('products').select('*').eq('id', id).limit(1).returns<Product[]>();

  return data;
};

export const fetchRecommendedProducts = async () => {
  const { data } = await supabase.from('products').select('*').is('isRecommended', true).returns<Product[]>();

  return data;
};
