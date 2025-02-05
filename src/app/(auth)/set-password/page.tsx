import { Suspense } from 'react';

import SetPasswordForm from '@/features/auth/components/organisms/set-password-form';

const SetPasswordPage = () => {
  return (
    <Suspense>
      <SetPasswordForm />
    </Suspense>
  );
};

export default SetPasswordPage;
