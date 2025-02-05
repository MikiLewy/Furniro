import { Skeleton } from '../ui/skeleton';

interface Props {
  skeletonsCount?: number;
}

const SkeletonsLoader = ({ skeletonsCount }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-4 h-full min-h-56">
      {Array.from({ length: skeletonsCount || 3 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-6" />
      ))}
    </div>
  );
};

export default SkeletonsLoader;
