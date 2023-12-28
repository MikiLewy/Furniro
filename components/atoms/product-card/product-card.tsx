import Image from 'next/image';

import { imageBucketUrl } from '@/constants/image-bucket-url';
import { formatPrice } from '@/utils/format-price';
import { Heart } from '@icons/heart';

import ImageCard from '../image-card/image-card';

interface Props {
  title: string;
  price: number;
  imageSrc: string;
  transparentImageSrc: string;
}

const ProductCard = ({ title, imageSrc, transparentImageSrc, price }: Props) => {
  return (
    <div className="mb-10 min-w-[300px]">
      <ImageCard className="relative group cursor-pointer h-[450px] md:h-[500px] lg:h-[550px]  w-full">
        <div className="absolute top-4 right-4 z-20">
          <Heart className=" w-4 h-4  fill-none stroke-gray-400 hover:scale-110 hover:stroke-red-600 transition duration-300 " />
        </div>
        <Image
          src={`${imageBucketUrl}/products/${imageSrc}`}
          alt={title}
          fill
          className="block absolute h-full w-full object-cover object-bottom group-hover:hidden"
          draggable="false"
        />
        <Image
          src={`${imageBucketUrl}/products/${transparentImageSrc}`}
          alt={title}
          fill
          className="opacity-0 absolute h-full w-full object-contain object-center group-hover:opacity-100  transition duration-300"
          draggable="false"
        />
      </ImageCard>
      <div className="flex flex-col items-start gap-2 pt-4 ">
        <h5 className="text-lg font-semibold cursor-pointer">{title}</h5>
        <p className="text-base font-medium text-gray-400">{formatPrice({ amount: price })}</p>
      </div>
    </div>
  );
};

export default ProductCard;
