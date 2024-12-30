'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  name: string;
  image: string;
}

const CategoryCard = ({ name, image }: Props) => {
  const router = useRouter();

  return (
    <div
      className="bg-[#f8f8f8] cursor-pointer px-2 py-8 flex-1 flex flex-col items-center justify-center gap-2 rounded-3xl transition duration-500 hover:scale-105 hover:bg-[#f5f5f5]"
      onClick={() => router.push(`/products/${name?.toLowerCase()}`)}>
      <Image
        src={image}
        alt={name}
        width={70}
        height={20}
        className="w-16 object-cover flex-1"
      />
      <p className="text-sm font-semibold">{name}</p>
    </div>
  );
};

export default CategoryCard;
