import Image from 'next/image';

import { ImagePayload } from '@/app/[lang]/types/interfaces/Image';
import { formatPrice } from '@/app/[lang]/utils/format-price';
import { Heart } from '@icons/heart';

interface Props {
  title: string;
  price: number;
  contextualImg: ImagePayload;
  whiteBgImg: ImagePayload;
}

const ProductCard = ({ title, contextualImg, whiteBgImg, price }: Props) => {
  return (
    <div className=" mb-10 basis-1/4 min-w-[300px]">
      <div>
        <div className="overflow-hidden cursor-pointer relative h-[450px] md:h-[500px] lg:h-[600px] w-full group rounded-3xl bg-[#f8f8f8]">
          <div className="absolute top-4 right-4">
            <Heart className=" w-4 h-4  fill-none stroke-gray-400 hover:scale-110 hover:stroke-red-600 transition duration-300 " />
          </div>
          <Image
            src={contextualImg.src}
            alt={contextualImg.alt}
            className="block h-full w-full object-cover object-bottom group-hover:hidden"
            draggable="false"
          />
          <Image
            src={whiteBgImg.src}
            alt={whiteBgImg.alt}
            className="opacity-0 h-full w-full object-contain object-center group-hover:opacity-100  transition duration-300"
            draggable="false"
          />
        </div>
        <div className="flex flex-col items-start gap-2 pt-4 ">
          <h5 className="text-lg font-semibold cursor-pointer">{title}</h5>
          <p className="text-base font-medium text-gray-400">{formatPrice({ amount: price })}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
