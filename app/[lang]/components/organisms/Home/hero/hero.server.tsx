import { Locale } from '@/i18n.config';
import { getDictionary } from '@app/lib/get-dictionary';

import ClientHero from './hero.client';

interface Props {
  lang: Locale;
}

const ServerHero = async ({ lang }: Props) => {
  const { hero } = await getDictionary(lang);

  return (
    <div
      className={`bg-[url('/assets/images/hero.webp')] bg-cover bg-no-repeat bg-center w-full min-h-[90vh] flex items-center justify sm:justify-end relative `}>
      <div className="absolute h-full w-full z-1 inset-0 bg-primary2 bg-opacity-70 sm:bg-opacity-0 " />
      <div className="bg-transparent pt-16 pb-10 px-4 sm:px-10 sm:bg-primary2 flex flex-col sm:max-w-lg md:max-w-xl lg:max-w-3xl  relative z-2 ">
        <p className="text-xs md:text-base font-semibold tracking-[3px]">{hero.newArrival}</p>
        <h1 className="text-3xl lg:text-6xl text-primary font-bold mt-1">{hero.title}</h1>
        <p className="text-base max-w-[400px] sm:max-w-none md:text-lg font-medium leading-6 mt-4">{hero.description}</p>
        <ClientHero content={hero.buyNow} />
      </div>
    </div>
  );
};

export default ServerHero;
