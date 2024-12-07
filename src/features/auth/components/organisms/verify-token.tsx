'use client';

import { useCallback, useEffect } from 'react';
import AuthFormHeader from '../atoms/auth-form-header';
import { verifyEmailToken } from '@/server/actions/tokens/verify-email-token';
import { useSearchParams } from 'next/navigation';

const VerifyToken = () => {
  const token = useSearchParams().get('token');

  const handleVerifyToken = useCallback(async () => {
    if (!token) {
    }
  }, []);

  return (
    <div>
      <AuthFormHeader title="Verification" />
    </div>
  );
};

export default VerifyToken;
