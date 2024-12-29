import { ReactNode } from 'react';

interface Props {
  title: string;
  onClick?: () => void;
  primary?: boolean;
  icon: ReactNode;
  isActive?: boolean;
}

const SidebarItem = ({ icon, onClick, title, primary, isActive }: Props) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-2 text-sm px-4  py-4 rounded-3xl 
       text-primary
       font-medium cursor-pointer ${
         isActive
           ? primary
             ? 'bg-primary-outlinedHover'
             : 'bg-gray-50'
           : 'bg-transparent'
       } ${
         primary ? 'hover:bg-primary-outlinedHover' : 'hover:bg-gray-50'
       }  transition-colors duration-500`}>
      <div className="w-5 h-5 stroke-gray-300">{icon}</div>
      {title}
    </li>
  );
};

export default SidebarItem;
