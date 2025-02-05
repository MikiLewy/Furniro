import ClientHero from './hero.client';

const ServerHero = () => {
  return (
    <header
      className={`bg-[url('/assets/images/auth-background.webp')] bg-cover bg-no-repeat bg-center w-full min-h-[70vh] flex my-4 lg:my-8 rounded-2xl overflow-hidden items-center justify-center relative `}>
      <div className="absolute h-full w-full z-1 inset-0 bg-black bg-opacity-20 " />
      <div className="bg-transparent flex flex-col text-center items-center justify-center sm:max-w-lg md:max-w-xl lg:max-w-4xl  relative z-2 gap-2 md:gap-4 lg:gap-6 ">
        <h1 className="text-3xl md:text-4xl lg:text-7xl text-white font-medium mt-1">
          Discover Our New Collection
        </h1>
        <ClientHero />
      </div>
    </header>
  );
};

export default ServerHero;
