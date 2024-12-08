'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInSchema } from '@/features/auth/server/validation-schemas/sign-in-schema';
import { PasswordInput } from '@/components/atoms/password-input';
import Link from 'next/link';
import SignUpWithGoogleButton from '../atoms/sign-up-with-google-button';
import AuthFormHeader from '../atoms/auth-form-header';
import { loginInAction } from '@/features/auth/server/actions/login';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { SubmittedFormMessage } from '@/components/atoms/submitted-form-message/submitted-form-message';
import AuthActionsLinksContainer from '../atoms/auth-actions-links-container';

type FormValues = z.infer<typeof signInSchema>;

const defaultValues: FormValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const [success, setSuccess] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const { execute } = useAction(loginInAction, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        setError(data.error);
      }
    },
  });

  const onSubmit = (values: FormValues) => {
    setSuccess(null);
    setError(null);
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
          {success ? (
            <SubmittedFormMessage message={success} variant="success" />
          ) : null}
          {error ? (
            <SubmittedFormMessage message={error} variant="error" />
          ) : null}
          <Button type="submit">Login</Button>
        </form>
        <SignUpWithGoogleButton />
        <AuthActionsLinksContainer links={actionsLinks} />
      </Form>
    </div>
  );
};

export default LoginForm;
