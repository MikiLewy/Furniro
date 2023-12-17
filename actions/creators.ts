'use server';

import { supabase } from '@/lib/init-supabase';
import { CreatorsTopPicks } from '@/types/responses/CreatorsTopPicks';

export const fetchCreatorsTopPicks = async () => {
  const { data } = await supabase.from('creators').select().returns<CreatorsTopPicks[]>();

  return data;
};
