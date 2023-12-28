interface Props {
  className?: string;
}

const Wardrobe = ({ className }: Props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 19" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1H22.9532M1.04682 14.575H23M11.9313 14.3407V1.05969M2.52964 14.3407V1.05969M21.423 14.3407V1.05969M3.07464 14.5866V17.5387M20.9535 14.5866V17.5387M19.2965 14.575L19.2964 15.9553M4.59752 14.575L4.59746 15.9553"
        stroke="#C9553E"
        strokeLinecap="round"></path>
    </svg>
  );
};

export default Wardrobe;
