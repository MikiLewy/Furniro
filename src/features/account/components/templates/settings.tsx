import { auth } from '@/auth';
import { getUserNameBasedOnLoginType } from '@/utils/get-user-name-based-on-login-type';

import UserDetails from '../atoms/user-details';
import AccountPageHeader from '../molecules/account-page-header';
import SettingsForm from '../organisms/settings/settings-form';

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
