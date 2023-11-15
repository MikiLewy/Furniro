'use client';

import Image from 'next/image';

import { ImagePayload } from '@types/interfaces/Image';
import { ProductCategories } from '@types/responses/ProductCategory';

interface Props {
  img: ImagePayload;
  category: ProductCategories;
}

const ClientBrowseTheRange = ({ category, img }: Props) => {
  return (
    <div className="flex flex-col cursor-pointer items-center justify-center gap-5 max-h-52 w-full md:max-h-[500px] md:basis-1/3">
      <div className="relative rounded-lg overflow-hidden h-52 md:h-[480px] w-full">
        <Image
          src={img.src}
          alt={img.alt}
          draggable="false"
          className="w-full h-full object-bottom object-cover hover:scale-110  transition duration-700 cursor-pointer"
        />
        <div className="absolute inset-0 z-10 bg-black bg-opacity-50 md:hidden"></div>
        <h4 className="absolute top-2/4 left-2/4 -translate-x-2/4 z-20 text-white font-semibold text-2xl md:hidden ">{category}</h4>
      </div>
      <h4 className="hidden text-gray-800 font-semibold text-xl capitalize md:block ">{category}</h4>
    </div>
  );
};

export default ClientBrowseTheRange;
