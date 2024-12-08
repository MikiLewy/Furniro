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
import Link from 'next/link';
import AuthFormHeader from '../atoms/auth-form-header';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { SubmittedFormMessage } from '@/components/atoms/submitted-form-message/submitted-form-message';

import { setPasswordSchema } from '@/server/types/set-password-schema';
import { setPasswordAction } from '@/server/actions/set-password';
import { PasswordInput } from '@/components/atoms/password-input';
import { useSearchParams } from 'next/navigation';

type FormValues = z.infer<typeof setPasswordSchema>;

const defaultValues: FormValues = {
  password: '',
  confirmPassword: '',
};

const SetPasswordForm = () => {
  const token = useSearchParams().get('token');

  const form = useForm({
    resolver: zodResolver(setPasswordSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const [success, setSuccess] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const { execute } = useAction(setPasswordAction, {
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
          <Button type="submit">Reset</Button>
        </form>
      </Form>
    </div>
  );
};

export default SetPasswordForm;
