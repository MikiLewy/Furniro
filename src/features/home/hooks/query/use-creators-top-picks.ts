import { creatorsTopPicksKeys } from '@features/home/api/query-keys/creators-top-picks';
import { useQuery } from '@tanstack/react-query';

import { CreatorsTopPicks } from '@features/home/api/types/creators-top-picks';

import { fetchCreatorsTopPicks } from '../../../../actions/creators';

export const useCreatorsTopPicks = () => {
  return useQuery<CreatorsTopPicks[] | null>({
    queryKey: creatorsTopPicksKeys.list(),
    queryFn: fetchCreatorsTopPicks,
  });
};
