import { Suspense } from 'react';

import VerifyToken from '@/features/auth/components/organisms/verify-token';

const VerifyEmailPage = async () => {
  return (
    <Suspense>
      <VerifyToken />
    </Suspense>
  );
};

export default VerifyEmailPage;
