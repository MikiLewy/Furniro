import { cn } from '@/lib/utils';

interface Props {
  currentSlideIndex: number;
  onClick: (index: number) => void;
  slidesCount: number;
}

const MobileCarouselNavigator = ({
  currentSlideIndex,
  onClick,
  slidesCount,
}: Props) => {
  return (
    <div className="flex lg:hidden p-2 gap-2 border absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-white rounded-xl">
      {Array.from({
        length: slidesCount,
      })?.map((_, index) => (
        <div
          key={index}
          onClick={() => onClick(index)}
          className={cn(
            index === currentSlideIndex ? 'bg-primary' : 'bg-secondary-lighter',
            'h-2 w-2 rounded-full ',
          )}
        />
      ))}
    </div>
  );
};

export default MobileCarouselNavigator;
