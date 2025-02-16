import {
  AbilityBuilder,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';

import { UserRole } from '@/types/user-role';

import { permissions } from './permissions';

type CRUD = 'create' | 'read' | 'update' | 'delete';

type CRUD_SUBJECTS = 'AccountCategories';

type AccountProductsActions =
  | CRUD
  | 'createVariant'
  | 'updateVariant'
  | 'deleteVariant';

type AccountProductsAbilities = [AccountProductsActions, 'AccountProducts'];

type Abilities = [CRUD, CRUD_SUBJECTS];

export type AppAbility = MongoAbility<Abilities | AccountProductsAbilities>;

export function definePermissions(role: UserRole) {
  const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

  permissions(builder, role);

  return builder.build();
}
