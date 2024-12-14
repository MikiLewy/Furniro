import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import BottomTabsNavigator from '@components/organisms/bottom-tabs-navigator';
import Sidebar from '@components/organisms/sidebar';

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  if (!user) {
    return redirect('/');
  }

  return (
    <div className="flex gap-4 h-full w-full ">
      <Sidebar />
      <main className="flex-1 md:px-4 py-4">{children}</main>
      <BottomTabsNavigator />
    </div>
  );
}
