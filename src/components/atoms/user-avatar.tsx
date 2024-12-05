import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  image: string;
  name: string;
}

const UserAvatar = ({ image, name }: Props) => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={image || ''} alt="User avatar" />
      <AvatarFallback>{name?.slice(0, 1)?.toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
