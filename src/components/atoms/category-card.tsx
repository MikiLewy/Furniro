'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { CategoryType } from '@/features/account/categories/api/types/category';

interface Props {
  name: string;
  image: string;
  type: CategoryType;
}

const CategoryCard = ({ name, image, type }: Props) => {
  const router = useRouter();

  return (
    <div
      className="bg-[#f8f8f8] cursor-pointer px-2 py-8 flex-1 flex flex-col items-center justify-center gap-2 rounded-3xl transition duration-500 hover:scale-105 hover:bg-[#f5f5f5]"
      onClick={() => router.push(`/collections/${type}`)}>
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
