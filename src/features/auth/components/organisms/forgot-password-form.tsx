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
import Link from 'next/link';
import AuthFormHeader from '../atoms/auth-form-header';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { SubmittedFormMessage } from '@/components/atoms/submitted-form-message/submitted-form-message';
import { resetPasswordAction } from '@/features/auth/server/actions/reset-password';
import { resetPasswordSchema } from '@/features/auth/server/validation-schemas/reset-password-schema';
import AuthActionsLinksContainer from '../atoms/auth-actions-links-container';

type FormValues = z.infer<typeof resetPasswordSchema>;

const defaultValues: FormValues = {
  email: '',
};

const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const [success, setSuccess] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const { execute } = useAction(resetPasswordAction, {
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

  const actionsLinks = [
    {
      key: 'login',
      label: 'Remember your password? Back to login',
      href: '/login',
    },
  ];

  return (
    <div>
      <AuthFormHeader
        title="Reset your password"
        description="We will send you an email to reset your password."
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
          {success ? (
            <SubmittedFormMessage message={success} variant="success" />
          ) : null}
          {error ? (
            <SubmittedFormMessage message={error} variant="error" />
          ) : null}
          <Button type="submit">Recover</Button>
        </form>
        <AuthActionsLinksContainer links={actionsLinks} />
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
