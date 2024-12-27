'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useAction } from 'next-safe-action/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { PasswordInput } from '@/components/atoms/password-input';
import { Button } from '@/components/ui/button';
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { updateUserDetailsSchema } from '@/features/account/settings/components/server/validation-schemas/update-user-details-schema';
import { ExtendUser } from '@/next-auth';
import { UploadButton } from '@/utils/uploadthing';

import { updateUserDetails } from '../server/actions/update-user-details';

type FormValues = z.infer<typeof updateUserDetailsSchema>;

const defaultValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  name: '',
  image: '',
  isTwoFactorEnabled: false,
  password: '',
  confirmPassword: '',
};

interface Props {
  user: ExtendUser | undefined;
}

const SettingsForm = ({ user }: Props) => {
  const [avatarUploading, setAvatarUploading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(updateUserDetailsSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const image = form.watch('image');

  const { execute, status } = useAction(updateUserDetails, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success(data.success);
      }

      if (data?.error) {
        toast.error(data.error);
      }
    },
  });

  const onSubmit = (values: FormValues) => {
    execute(values);
  };

  useEffect(() => {
    if (user) {
      form.setValue('firstName', user.firstName);
      form.setValue('lastName', user.lastName);
      form.setValue('email', user.email || '');
      form.setValue('name', user.name || '');
      form.setValue('image', user.image || '');
      form.setValue('isTwoFactorEnabled', user.isTwoFactorEnabled);
    }
  }, [user]);

  const isSubmitButtonDisabled =
    avatarUploading ||
    status === 'executing' ||
    !form.formState.isDirty ||
    !form.formState.isValid;

  return (
    <div className="max-w-2xl">
      <Separator className="my-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3">
          {user?.isOAuth ? (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Joe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
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
                      <Input
                        placeholder="Doe"
                        autoComplete="off"
                        aria-autocomplete="none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <div className="flex items-center gap-2">
                  {image ? (
                    <Image
                      src={image ?? ''}
                      alt="User image"
                      width={42}
                      height={42}
                      className="rounded-full"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No avatar added
                    </p>
                  )}
                  <UploadButton
                    className="scale-75 ut-button:ring-primary ut-button:bg-primary/75 hover:ut-button:bg-primary ut-button:transition-all ut-button:duration-500 ut-label:hidden ut-allowed-content:hidden"
                    endpoint="avatar"
                    content={{
                      button({ ready }) {
                        if (ready) {
                          return <div>Change Avatar</div>;
                        }
                        return <div>Uploading...</div>;
                      },
                    }}
                    onUploadBegin={() => {
                      setAvatarUploading(true);
                    }}
                    onClientUploadComplete={res => {
                      form.setValue('image', res[0].url);
                      setAvatarUploading(false);
                      return;
                    }}
                    onUploadError={(error: Error) => {
                      form.setError('image', {
                        type: 'validate',
                        message: error.message,
                      });
                      setAvatarUploading(false);
                      return;
                    }}
                  />
                </div>
                <FormControl>
                  <Input
                    placeholder="User image"
                    type="hidden"
                    disabled={status === 'executing'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="self-start">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="joedoe@gmail.com"
                          autoComplete="off"
                          disabled
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs ">Email cannot be changed.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="********"
                    autoComplete="off"
                    {...field}
                  />
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
                  <PasswordInput
                    placeholder="********"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Two Factor Authentication</FormLabel>
                <FormDescription>
                  Enable two factor authentication to add an extra layer of
                  security to your account.
                </FormDescription>
                <FormControl>
                  <Switch
                    disabled={status === 'executing' || user?.isOAuth}
                    onCheckedChange={field.onChange}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitButtonDisabled}
            className="mt-2 self-start">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
