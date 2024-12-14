'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { PasswordInput } from '@/components/atoms/password-input';
import { SubmittedFormMessage } from '@/components/atoms/submitted-form-message/submitted-form-message';
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
import { signUpAction } from '@/features/auth/server/actions/sign-up';
import { signUpSchema } from '@/features/auth/server/validation-schemas/sign-up-schema';

import AuthActionsLinksContainer from '../atoms/auth-actions-links-container';
import AuthFormHeader from '../atoms/auth-form-header';
import SignUpWithGoogleButton from '../atoms/sign-up-with-google-button';

type FormValues = z.infer<typeof signUpSchema>;

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const SignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const [success, setSuccess] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const { execute } = useAction(signUpAction, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setSuccess(data.success);
        form.reset(defaultValues);
      }

      if (data?.error) {
        setError(data.error);
      }
    },
  });

  const onSubmit = (values: FormValues) => {
    setError(null);
    setSuccess(null);
    execute(values);
  };

  const actionsLinks = [
    {
      key: 'login',
      label: 'Already have an account? Login',
      href: '/login',
    },
  ];

  return (
    <div>
      <AuthFormHeader title="Create Account" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Joe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button type="submit" className="mt-2">
            Sign up
          </Button>
        </form>
        <SignUpWithGoogleButton />
        <AuthActionsLinksContainer links={actionsLinks} />
      </Form>
    </div>
  );
};

export default SignUpForm;
