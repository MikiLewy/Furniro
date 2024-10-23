'use server';

import { CreatorsTopPicks } from '@features/home/api/types/creators-top-picks';
import { supabase } from '@lib/init-supabase';

export const fetchCreatorsTopPicks = async () => {
  const { data } = await supabase
    .from('creators')
    .select()
    .returns<CreatorsTopPicks[]>();

  return data;
};
