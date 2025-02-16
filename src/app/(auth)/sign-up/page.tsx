import { Metadata } from 'next';

import SignUpForm from '@/features/auth/components/organisms/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign up',
  description:
    'Create your account to access exclusive furniture collections, save your favorite pieces, and enjoy a personalized shopping experience.',
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
