import { useQuery } from '@tanstack/react-query';

import { fetchCreatorsTopPicks } from '@/api/services/supabase/creators';
import { creatorsTopPicksKeys } from '@/api/query-keys/creators-top-picks';
import { CreatorsTopPicks } from '@/types/responses/CreatorsTopPicks';

export const useCreatorsTopPicks = () => {
  return useQuery<CreatorsTopPicks[] | null>({
    queryKey: creatorsTopPicksKeys.list(),
    queryFn: fetchCreatorsTopPicks,
  });
};
