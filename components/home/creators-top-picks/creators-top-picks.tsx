import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { usePrefetchCreatorsTopPicks } from '@/hooks/api/creators/usePrefetchCreatorsTopPicks';
import { Locale } from '@/i18n.config';
import Button from '@components/atoms/button/button';
import SectionTitle from '@components/atoms/section-title/section-title';
import CreatorsTopPicksListItem from '@components/home/creators-top-picks-list-item';
import Plus from '@icons/plus';
import { getDictionary } from '@lib/get-dictionary';

interface Props {
  lang: Locale;
}

const CreatorsTopPicks = async ({ lang }: Props) => {
  const {
    home: { creatorTopPicks },
  } = await getDictionary(lang);

  const queryClient = new QueryClient();

  await usePrefetchCreatorsTopPicks(queryClient);

  return (
    <section className="horizontal-spacing flex justify-center flex-wrap mb-10">
      <SectionTitle title={creatorTopPicks.title} subtitle={creatorTopPicks.subtitle} titleClassName="text-center" subtitleClassName="self-center" />
      <div className="grid w-full h-[1200px] relative grid-cols-2 sm:grid-cols-3 lg:h-[800px] xl:h-[1000px] 2xl:h-[1200px] lg:grid-cols-4 grid-rows-[repeat(auto-fit,minmax(200px,1fr))]  gap-3 items-center justify-between mt-10">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CreatorsTopPicksListItem />
        </HydrationBoundary>
        <div className="absolute bottom-0 left-0 right-0  z-10 h-44  bg-gradient-to-t from-white" />
        <Button
          variant="contained"
          color="white"
          size="lg"
          startIcon={<Plus className="stroke-2" />}
          className="absolute bottom-14 z-20 left-2/4 -translate-x-2/4">
          {creatorTopPicks.moreProducts}
        </Button>
      </div>
    </section>
  );
};

export default CreatorsTopPicks;
