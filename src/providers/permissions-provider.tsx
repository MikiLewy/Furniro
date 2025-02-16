'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import { AbilityProvider } from '@/permissions/can';

interface Props {
  children: ReactNode;
}

const PermissionsProvider = ({ children }: Props) => {
  const session = useSession();

  return (
    <AbilityProvider role={session?.data?.user?.role || 'customer'}>
      {children}
    </AbilityProvider>
  );
};

export default PermissionsProvider;
