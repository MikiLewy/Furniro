import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const SignUpWithGoogleButton = () => {
  return (
    <Button
      type="submit"
      variant="outline"
      className="w-full mt-2"
      onClick={() => {
        signIn('google', {
          redirect: false,
          callbackUrl: '/',
        });
      }}>
      <FcGoogle className="w-5 h-5" />
      Sign up with google
    </Button>
  );
};

export default SignUpWithGoogleButton;
