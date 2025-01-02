'use client';

import { SwiperSlide } from 'swiper/react';

import CategoryCard from '@/components/atoms/category-card';
import { Category } from '@/features/account/categories/api/types/category';

import CategoriesSlider from '../../../features/home/components/molecules/categories-slider';

interface Props {
  categories: Category[];
}

const ClientCategoriesList = ({ categories }: Props) => {
  return (
    <CategoriesSlider>
      {categories.map(category => (
        <SwiperSlide key={category.id}>
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.image}
            type={category.type}
          />
        </SwiperSlide>
      ))}
    </CategoriesSlider>
  );
};

export default ClientCategoriesList;
