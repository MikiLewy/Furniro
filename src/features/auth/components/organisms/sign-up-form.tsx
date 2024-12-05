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
import { PasswordInput } from '@/components/atoms/password-input';
import Link from 'next/link';
import SignUpWithGoogleButton from '../atoms/sign-up-with-google-button';
import AuthFormHeader from '../atoms/auth-form-header';
import { signUpSchema } from '@/server/types/sign-up-schema';
import { signUpAction } from '@/server/actions/sign-up';

import { useAction } from 'next-safe-action/hooks';

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

  const { execute } = useAction(signUpAction);

  const onSubmit = (values: FormValues) => {
    execute(values);
  };

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
          <Button type="submit" className="mt-2">
            Submit
          </Button>
        </form>
        <SignUpWithGoogleButton />
        <div className="flex flex-col my-5 items-start">
          <Button variant="link" asChild>
            <Link href="/login" className="px-0 text-gray-500">
              Already have an account? Login
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
