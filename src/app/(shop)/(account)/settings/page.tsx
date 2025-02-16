import { Metadata } from 'next';

import Settings from '@/features/account/settings/components/templates/settings';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your account settings and preferences.',
};

const SettingsPage = async () => {
  return <Settings />;
};

export default SettingsPage;
