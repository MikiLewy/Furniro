import { ReactNode } from 'react';

import AccountPageTitle from '../atoms/account-page-title';

interface Props {
  title: string;
  description?: string;
  children?: ReactNode;
}

const AccountPageHeader = ({ title, children, description }: Props) => {
  return (
    <header className="flex items-center justify-between">
      <AccountPageTitle title={title} description={description} />
      {children}
    </header>
  );
};

export default AccountPageHeader;
