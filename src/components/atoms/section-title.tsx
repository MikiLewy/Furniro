import { twMerge } from 'tailwind-merge';

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
  const mergedTitleClassName = twMerge(
    'font-medium text-2xl md:text-3xl text-gray-800',
    titleClassName,
  );
  const mergedSubtitleClassName = twMerge(
    'text-secondary-lighter text-xs uppercase font-semibold',
    subtitleClassName,
  );

  return (
    <header className="flex flex-col gap-2 items-start ">
      <span className={mergedSubtitleClassName}>{subtitle}</span>
      <h2 className={mergedTitleClassName}>{title}</h2>
    </header>
  );
};

export default SectionTitle;
