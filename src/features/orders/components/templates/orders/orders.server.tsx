import { eq } from 'drizzle-orm';

import { auth } from '@/auth';
import { db } from '@/db';
import { orders } from '@/db/schema';
import AccountPageHeader from '@/features/account/shared/components/molecules/account-page-header';

import ClientOrders from './orders.client';

const ServerOrders = async () => {
  const session = await auth();

  const data = await db.query.orders.findMany({
    where: eq(orders.userId, session?.user?.id || ''),
    with: {
      orderProduct: {
        with: {
          product: true,
          productVariants: {
            with: { variantImages: true },
          },
        },
      },
    },
    orderBy: (orders, { desc }) => [desc(orders.created_at)],
  });

  return (
    <>
      <AccountPageHeader title="Orders" />
      <ClientOrders data={data} />
    </>
  );
};

export default ServerOrders;
