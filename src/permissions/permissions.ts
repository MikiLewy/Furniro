import { AbilityBuilder } from '@casl/ability';

import { UserRole } from '@/types/user-role';

import { AppAbility } from './define-permissions';

export const permissions = (
  builder: AbilityBuilder<AppAbility>,
  role: UserRole,
) => {
  const { can } = builder;

  if (role === 'admin') {
    can('read', 'AccountProducts');
    can('create', 'AccountProducts');
    can('update', 'AccountProducts');
    can('delete', 'AccountProducts');
    can('createVariant', 'AccountProducts');
    can('updateVariant', 'AccountProducts');
    can('deleteVariant', 'AccountProducts');

    can('read', 'AccountCategories');
    can('create', 'AccountCategories');
    can('update', 'AccountCategories');
    can('delete', 'AccountCategories');
  }
};
