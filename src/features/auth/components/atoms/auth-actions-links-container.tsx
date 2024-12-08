import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  links: {
    key: string;
    href: string;
    label: string;
  }[];
}

const AuthActionsLinksContainer = ({ links }: Props) => {
  return (
    <div className="flex flex-col my-3 items-start">
      {links.map(link => (
        <Button key={link.key} variant="link" asChild className="px-0">
          <Link href={link.href} className="text-gray-500">
            {link.label}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default AuthActionsLinksContainer;
