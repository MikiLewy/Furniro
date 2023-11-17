import { twMerge } from 'tailwind-merge';
interface Props {
  title: string;
  subtitle?: string;
  subtitleClassName?: string;
}

const SectionTitle = ({ title, subtitle, subtitleClassName }: Props) => {
  const mergedSubtitleClassName = twMerge('text-secondary-lighter text-xs uppercase font-semibold', subtitleClassName);

  return (
    <header className="flex flex-col gap-2 items-start ">
      <span className={mergedSubtitleClassName}>{subtitle}</span>
      <h2 className="font-medium text-2xl md:text-3xl text-gray-800">{title}</h2>
    </header>
  );
};

export default SectionTitle;
