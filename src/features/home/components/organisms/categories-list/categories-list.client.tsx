'use client';

import { Category } from '@/features/account/categories/api/types/category';
import CategoriesSlider from '../../molecules/categories-slider';
import { SwiperSlide } from 'swiper/react';
import CategoryCard from '@/components/atoms/category-card';

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
          />
        </SwiperSlide>
      ))}
    </CategoriesSlider>
  );
};

export default ClientCategoriesList;
