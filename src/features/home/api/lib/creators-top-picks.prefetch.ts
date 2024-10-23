import { QueryClient } from '@tanstack/react-query';

import { fetchCreatorsTopPicks } from '../../../../actions/creators';
import { creatorsTopPicksKeys } from '../query-keys/creators-top-picks';

export const prefetchCreatorsTopPicks = (queryClient: QueryClient) => {
  return queryClient.prefetchQuery({
    queryKey: creatorsTopPicksKeys.list(),
    queryFn: fetchCreatorsTopPicks,
  });
};
