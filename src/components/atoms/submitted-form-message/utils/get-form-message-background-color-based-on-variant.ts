import { FormMessageVariant } from '../submitted-form-message';

export const getFormMessageBackgroundColorBasedOnVariant = (
  variant: FormMessageVariant,
) => {
  switch (variant) {
    case 'success':
      return 'bg-teal-400/25';
    case 'error':
      return ' bg-destructive/25';
  }
};
