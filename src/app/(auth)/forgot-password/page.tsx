import { Metadata } from 'next';

import ForgotPasswordForm from '@/features/auth/components/organisms/forgot-password-form';

export const metadata: Metadata = {
  title: 'Reset password',
  description:
    'Securely reset your password and regain access to your account. Follow our simple password recovery process.',
};

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
