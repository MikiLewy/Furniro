export const convertRatingToDecimal = (rating: number) => {
  return String(Math.round(rating * 10) / 10).replace('.', ',');
};
