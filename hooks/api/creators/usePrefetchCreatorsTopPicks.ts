import { QueryClient } from '@tanstack/react-query';

import { fetchCreatorsTopPicks } from '@/actions/creators';
import { creatorsTopPicksKeys } from '@/api/query-keys/creators-top-picks';

export const usePrefetchCreatorsTopPicks = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: creatorsTopPicksKeys.list(),
    queryFn: fetchCreatorsTopPicks,
  });
};
