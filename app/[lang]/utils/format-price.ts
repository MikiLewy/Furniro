export const formatPrice = ({ amount, language = 'en', currency = 'PLN' }: { amount: number; language?: string; currency?: string }) => {
  const formatter = new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
};
