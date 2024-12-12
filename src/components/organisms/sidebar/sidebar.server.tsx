import { auth } from '@/auth';
import ClientSidebar from './sidebar.client';
import UserAvatar from '@/components/atoms/user-avatar';

const ServerSidebar = async () => {
  const session = await auth();

  const user = session?.user;

  const userName = user?.name
    ? user?.name
    : `${user?.firstName} ${user?.lastName}`;

  return (
    <aside className="border-r py-4 pr-4">
      <div className="flex gap-2 items-center py-2 ">
        <UserAvatar name={userName} image={user?.image || ''} />
        <div className="flex flex-col">
          <p className="text-sm">{userName}</p>
          <p className="text-xs">{user?.email}</p>
        </div>
      </div>
      <div className="h-px bg-border w-full mt-4" />
      <ClientSidebar />
    </aside>
  );
};

export default ServerSidebar;
