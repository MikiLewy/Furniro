import { auth } from '@/auth';
import UserDetails from '@/features/account/shared/components/atoms/user-details';
import AccountPageHeader from '@/features/account/shared/components/molecules/account-page-header';
import { getUserNameBasedOnLoginType } from '@/utils/get-user-name-based-on-login-type';

import SettingsForm from '../organisms/settings-form';

const Settings = async () => {
  const session = await auth();

  const user = session?.user;

  const userName = getUserNameBasedOnLoginType(
    user?.isOAuth,
    user?.name,
    user?.firstName,
    user?.lastName,
  );

  return (
    <div>
      <div className="block md:hidden mb-4">
        <UserDetails
          name={userName}
          email={user?.email || ''}
          image={user?.image || ''}
        />
      </div>
      <AccountPageHeader
        title="Settings"
        description="Manage your account settings"
      />
      <SettingsForm user={user} />
    </div>
  );
};

export default Settings;
