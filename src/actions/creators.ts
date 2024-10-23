'use server';

import { supabase } from '@lib/init-supabase';
import { CreatorsTopPicks } from '@features/home/api/types/creators-top-picks';

export const fetchCreatorsTopPicks = async () => {
  const { data } = await supabase.from('creators').select().returns<CreatorsTopPicks[]>();

  return data;
};
