import { Metadata } from 'next';
import { Suspense } from 'react';

import SetPasswordForm from '@/features/auth/components/organisms/set-password-form';

export const metadata: Metadata = {
  title: 'Set password',
  description:
    'Create a new password for your account. Ensure your furniture shopping experience remains safe and secure.',
};

const SetPasswordPage = () => {
  return (
    <Suspense>
      <SetPasswordForm />
    </Suspense>
  );
};

export default SetPasswordPage;
