import UserAvatar from '@/components/atoms/user-avatar';
import { Separator } from '@/components/ui/separator';

interface Props {
  name: string;
  image: string;
  email: string;
}

const UserDetails = ({ name, email, image }: Props) => {
  return (
    <>
      <div className="flex gap-2 items-center py-2 ">
        <UserAvatar name={name} image={image} />
        <div className="flex flex-col">
          <p className="text-sm">{name}</p>
          <p className="text-xs">{email}</p>
        </div>
      </div>
      <Separator className="mt-4" />
    </>
  );
};

export default UserDetails;
