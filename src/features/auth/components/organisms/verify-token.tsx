'use client';

import { useCallback, useEffect, useState } from 'react';
import AuthFormHeader from '../atoms/auth-form-header';
import { verifyEmailToken } from '@/server/actions/tokens/verify-email-token';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmittedFormMessage } from '@/components/atoms/submitted-form-message/submitted-form-message';

const VerifyToken = () => {
  const token = useSearchParams().get('token');

  const router = useRouter();

  const [success, setSuccess] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleVerifyToken = useCallback(async () => {
    if (!token) {
      setError('Invalid token');
      return;
    }
    const response = await verifyEmailToken(token);

    if (response?.error) {
      setError(response.error);
      return;
    }

    if (response?.success) {
      setSuccess(response.success);
    }

    router.push('/login');
  }, []);

  useEffect(() => {
    handleVerifyToken();
  }, []);

  return (
    <div>
      <AuthFormHeader title="Verify your account" />
      {!success && !error ? <p>Verifying...</p> : null}
      {success ? (
        <SubmittedFormMessage message={success} variant="success" />
      ) : null}
      {error ? <SubmittedFormMessage message={error} variant="error" /> : null}
    </div>
  );
};

export default VerifyToken;
