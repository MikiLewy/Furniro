import { getDictionary } from '@lib/get-dictionary';

import { Locale } from '../../../../../i18n.config';

import ClientHero from './hero.client';

interface Props {
  lang: Locale;
}

const ServerHero = async ({ lang }: Props) => {
  const {
    home: { hero },
  } = await getDictionary(lang);

  return (
    <header
      className={`bg-[url('/assets/images/hero.webp')] bg-cover bg-no-repeat bg-center w-full min-h-[95vh]  flex items-center justify-start relative `}>
      <div className="absolute h-full w-full z-1 inset-0 bg-black bg-opacity-50  " />
      <div className="bg-transparent pt-16 pb-10 horizontal-spacing flex flex-col sm:max-w-lg md:max-w-xl lg:max-w-3xl  relative z-2 ">
        <h1 className="text-3xl md:text-4xl lg:text-6xl text-white font-medium mt-1">{hero.title}</h1>
        <p className="text-base text-white max-w-[400px] sm:max-w-none md:text-lg  leading-6 mt-4">{hero.description}</p>
        <ClientHero dictionary={{ buyFurniture: hero.buyFurniture, buyAccessories: hero.buyAccessories }} lang={lang} />
      </div>
    </header>
  );
};

export default ServerHero;
