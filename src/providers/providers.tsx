'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { extractRouterConfig } from 'uploadthing/server';

import { ourFileRouter } from '@/app/api/uploadthing/core';

import PermissionsProvider from './permissions-provider';

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <PermissionsProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
          <Toaster position="bottom-right" />
        </PermissionsProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
