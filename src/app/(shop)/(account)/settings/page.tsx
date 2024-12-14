import { auth } from '@/auth';
import AccountPageHeader from '@/features/account/components/molecules/account-page-header';
import SettingsForm from '@/features/account/components/organisms/settings/settings-form';

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      <AccountPageHeader
        title="Settings"
        description="Manage your account settings"
      />
      <SettingsForm user={session?.user} />
    </div>
  );
};

export default SettingsPage;
