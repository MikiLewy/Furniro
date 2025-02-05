export const calculateRatingPercentage = (
  groupedRatings: Record<string, number>,
  rating: string,
  totalReviews: number,
) => {
  return (groupedRatings[rating] / totalReviews) * 100;
};
