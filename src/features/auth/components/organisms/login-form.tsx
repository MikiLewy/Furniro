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
import { signInSchema } from '@/server/types/sign-in-schema';
import { PasswordInput } from '@/components/atoms/password-input';
import Link from 'next/link';
import SignUpWithGoogleButton from '../atoms/sign-up-with-google-button';
import AuthFormHeader from '../atoms/auth-form-header';
import { loginInAction } from '@/server/actions/login';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { SubmittedFormMessage } from '@/components/atoms/submitted-form-message/submitted-form-message';

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
      if (data?.success) {
        setSuccess(data.success);
      }

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
          <Button type="submit">Submit</Button>
        </form>
        <SignUpWithGoogleButton />
        <div className="flex flex-col my-5 items-start">
          <Button variant="link" asChild>
            <Link href="/sign-up" className="px-0 text-gray-500">
              Don't have an account? Sign up
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/forgot-password" className="px-0 text-gray-500">
              Forgot password?
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
