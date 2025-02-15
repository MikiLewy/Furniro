'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { LoadingButton } from '@/components/atoms/loading-button';
import { PasswordInput } from '@/components/atoms/password-input';
import { SubmittedFormMessage } from '@/components/atoms/submitted-form-message/submitted-form-message';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { signInSchema } from '@/features/auth/server/validation-schemas/sign-in-schema';

import { useLogin } from '../../hooks/action/use-login';
import AuthActionsLinksContainer from '../atoms/auth-actions-links-container';
import AuthFormHeader from '../atoms/auth-form-header';
import SignUpWithGoogleButton from '../atoms/sign-up-with-google-button';

type FormValues = z.infer<typeof signInSchema>;

const defaultValues: FormValues = {
  email: '',
  password: '',
  code: '',
};

const LoginForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const [error, setError] = useState<string | null>(null);

  const [showOTPInput, setShowOTPInput] = useState(false);

  const resetValues = () => {
    setError(null);
  };

  const { execute, status } = useLogin(
    () => {
      router.push('/');
    },
    () => setShowOTPInput(true),
    setError,
  );

  const onSubmit = (values: FormValues) => {
    resetValues();
    execute(values);
  };

  const actionsLinks = [
    {
      key: 'sign-up',
      label: "Don't have an account? Sign up",
      href: '/sign-up',
    },
    {
      key: 'forgot-password',
      label: 'Forgot password?',
      href: '/forgot-password',
    },
  ];

  return (
    <div>
      <AuthFormHeader
        title="Sign in to your account"
        description="Find information about your current and previous orders, or edit your
        account details."
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
          {showOTPInput ? (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="joedoe@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {error ? (
            <SubmittedFormMessage message={error} variant="error" />
          ) : null}
          <LoadingButton loading={status === 'executing'} type="submit">
            {showOTPInput ? 'Verify' : 'Login'}
          </LoadingButton>
        </form>
        <SignUpWithGoogleButton />
        <AuthActionsLinksContainer links={actionsLinks} />
      </Form>
    </div>
  );
};

export default LoginForm;
