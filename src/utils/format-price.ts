export const formatPrice = ({
  amount,
  language = 'en',
  currency = 'EUR',
}: {
  amount: number;
  language?: string;
  currency?: string;
}) => {
  const formatter = new Intl.NumberFormat(language, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};
