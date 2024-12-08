import { cn } from '@/lib/utils';
import { getFormMessageBackgroundColorBasedOnVariant } from './utils/get-form-message-background-color-based-on-variant';
import { getFormMessageIconBasedOnVariant } from './utils/get-form-message-icon-based-on-variant';

export type FormMessageVariant = 'success' | 'error';

interface Props {
  message: string;
  variant: FormMessageVariant;
}

export const SubmittedFormMessage = ({ message, variant }: Props) => {
  const mergedWrapperClassName = cn(
    getFormMessageBackgroundColorBasedOnVariant(variant),
    'flex text-xs font-medium items-center gap-2 text-secondary-foreground p-3 rounded-md',
  );

  return (
    <div className={mergedWrapperClassName}>
      {getFormMessageIconBasedOnVariant(variant)}
      <p>{message}</p>
    </div>
  );
};
