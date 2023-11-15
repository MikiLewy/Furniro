interface Props {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: Props) => {
  return (
    <header className="flex flex-col gap-2 items-start ">
      <h2 className="font-medium text-2xl md:text-3xl text-gray-800">{title}</h2>
      <p className="text-500 text-base md:text-xl">{subtitle}</p>
    </header>
  );
};

export default SectionTitle;
