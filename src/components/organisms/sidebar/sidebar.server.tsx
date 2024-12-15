import { auth } from '@/auth';
import UserDetails from '@/features/account/components/atoms/user-details';
import { getUserNameBasedOnLoginType } from '@/utils/get-user-name-based-on-login-type';

import ClientSidebar from './sidebar.client';

const ServerSidebar = async () => {
  const session = await auth();

  const user = session?.user;

  const userName = getUserNameBasedOnLoginType(
    user?.isOAuth,
    user?.name,
    user?.firstName,
    user?.lastName,
  );

  return (
    <aside className="py-4 pr-4 hidden md:block">
      <UserDetails
        name={userName}
        email={user?.email || ''}
        image={user?.image || ''}
      />
      <ClientSidebar />
    </aside>
  );
};

export default ServerSidebar;
