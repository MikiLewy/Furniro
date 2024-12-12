import Sidebar from '@components/organisms/sidebar';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

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
    <div className="flex gap-4">
      <Sidebar />
      {children}
    </div>
  );
}
