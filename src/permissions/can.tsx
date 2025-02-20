import { createContextualCan, useAbility } from '@casl/react';
import { Consumer, Context, ReactNode, createContext } from 'react';

import { UserRole } from '@/types/user-role';

import { AppAbility, definePermissions } from './define-permissions';

export const AbilityContext = createContext<AppAbility | null>(null);

export const AbilityProvider = ({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) => {
  const ability = definePermissions(role);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

export const Can = createContextualCan(
  AbilityContext.Consumer as Consumer<AppAbility>,
);

export const usePermissions = () => {
  const ability = useAbility(AbilityContext as Context<AppAbility>);

  if (!ability) {
    throw new Error('usePermissions must be used within a AbilityProvider.');
  }

  return ability;
};
