import { ElementType } from 'react';

import { cn } from '@/lib/utils';

interface Props {
  title: string;
  onClick: () => void;
  icon: ElementType;
  isActive?: boolean;
}

const BottomTabsItem = ({ icon: Icon, isActive, onClick, title }: Props) => {
  return (
    <li
      onClick={onClick}
      className={cn(
        'py-3 px-2 flex flex-col gap-1 sm:gap-2 items-center text-center text-muted-foreground',
        isActive ? 'border-t-2 border-black text-primary' : '',
      )}>
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      <p className="text-xs sm:text-sm">{title}</p>
    </li>
  );
};

export default BottomTabsItem;
