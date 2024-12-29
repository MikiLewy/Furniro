import { CheckCircle2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { FormMessageVariant } from '../submitted-form-message';

export const getFormMessageIconBasedOnVariant = (
  variant: FormMessageVariant,
) => {
  switch (variant) {
    case 'success':
      return <CheckCircle2 className="w-4 h-4" />;
    case 'error':
      return <AlertCircle className="w-4 h-4" />;
  }
};
