import { Metadata } from 'next';

import LoginForm from '@/features/auth/components/organisms/login-form';

export const metadata: Metadata = {
  title: 'Sign in',
  description:
    'Sign in to your account to view your orders, manage your wishlist, and continue your furniture shopping experience.',
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
