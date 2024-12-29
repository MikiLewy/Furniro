import { cn } from '@/lib/utils';

interface Props {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
}: Props) => {
  return (
    <header className="flex flex-col gap-2 items-start ">
      <span
        className={cn(
          subtitleClassName,
          'text-secondary-darker text-xs uppercase font-semibold',
        )}>
        {subtitle}
      </span>
      <h2
        className={cn(
          'font-medium text-2xl md:text-3xl text-gray-800',
          titleClassName,
        )}>
        {title}
      </h2>
    </header>
  );
};

export default SectionTitle;
