'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { LoadingButton } from '@/components/atoms/loading-button';
import { PasswordInput } from '@/components/atoms/password-input';
import { SubmittedFormMessage } from '@/components/atoms/submitted-form-message/submitted-form-message';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { setPasswordSchema } from '@/features/auth/server/validation-schemas/set-password-schema';

import { useSetPassword } from '../../hooks/action/use-set-password';
import AuthFormHeader from '../atoms/auth-form-header';

type FormValues = z.infer<typeof setPasswordSchema>;

const defaultValues: FormValues = {
  password: '',
  confirmPassword: '',
};

const SetPasswordForm = () => {
  const token = useSearchParams().get('token');

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(setPasswordSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const [success, setSuccess] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const { execute, status } = useSetPassword(message => {
    setSuccess(message);
    router.push('/login');
  }, setError);

  const onSubmit = (values: FormValues) => {
    setSuccess(null);
    setError(null);
    execute({ ...values, token });
  };

  return (
    <div>
      <AuthFormHeader
        title="Set password "
        description="Enter your new password below."
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
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
          <LoadingButton loading={status === 'executing'} type="submit">
            Reset
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
};

export default SetPasswordForm;
