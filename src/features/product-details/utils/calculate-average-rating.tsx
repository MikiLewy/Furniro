export const calculateAverageRating = (
  ratings: number[],
  reviewsCount: number,
) => {
  const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);

  return totalRating ? totalRating / reviewsCount : 0;
};
