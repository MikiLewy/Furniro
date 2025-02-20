import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <header
      className={`w-full min-h-[55vh] sm:min-h-[70vh] flex mt-4 lg:mt-8 rounded-2xl overflow-hidden items-center justify-center relative `}>
      <img
        className="absolute inset-0 h-full w-full object-cover object-center"
        src="/assets/images/auth-background.webp"
        alt="Sofa and table in a living room"
      />
      <div className="absolute h-full w-full z-1 inset-0 bg-black bg-opacity-20 " />
      <div className="bg-transparent flex flex-col text-center items-center justify-center sm:max-w-lg md:max-w-xl lg:max-w-4xl  relative z-2 gap-2 md:gap-4 lg:gap-6 ">
        <h1 className="text-3xl md:text-4xl lg:text-7xl text-white font-medium mt-1">
          Discover Our New Collection
        </h1>
        <Button asChild variant="secondary" size="lg">
          <Link prefetch href="/collections/all">
            Shop now
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Hero;
