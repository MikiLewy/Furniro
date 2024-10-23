import Button from '@components/atoms/button/button';
import SectionTitle from '@components/atoms/section-title';
import { prefetchCreatorsTopPicks } from '@features/home/api/lib/creators-top-picks.prefetch';

import Plus from '../../../../../icons/plus';
import HydrationBoundaryProvider from '../../../../../providers/hydration-boundary-provider';
import CreatorsTopPicksListItem from '../../molecules/creators-top-picks-list-item';

const CreatorsTopPicks = () => {
  return (
    <section className="horizontal-spacing flex justify-center flex-wrap mb-10">
      <SectionTitle
        title="Explore the creators’ top picks"
        subtitle="Instagram’s most favorites"
        titleClassName="text-center"
        subtitleClassName="self-center"
      />
      <div className="grid w-full h-[1200px] relative grid-cols-2 sm:grid-cols-3 lg:h-[800px] xl:h-[1000px] 2xl:h-[1200px] lg:grid-cols-4 grid-rows-[repeat(auto-fit,minmax(200px,1fr))]  gap-3 items-center justify-between mt-10">
        <HydrationBoundaryProvider
          prefetchDataFunctions={[
            queryClient => prefetchCreatorsTopPicks(queryClient),
          ]}>
          <CreatorsTopPicksListItem />
        </HydrationBoundaryProvider>
        <div className="absolute bottom-0 left-0 right-0  z-10 h-44  bg-gradient-to-t from-white" />
        <Button
          variant="contained"
          color="white"
          size="lg"
          startIcon={<Plus className="stroke-2" />}
          className="absolute bottom-14 z-20 left-2/4 -translate-x-2/4">
          More products
        </Button>
      </div>
    </section>
  );
};

export default CreatorsTopPicks;
