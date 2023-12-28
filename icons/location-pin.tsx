interface Props {
  className?: string;
}

const LocationPin = ({ className }: Props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 17 22" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.61905 11.4762C10.197 11.4762 11.4762 10.197 11.4762 8.61905C11.4762 7.0411 10.197 5.7619 8.61905 5.7619C7.04105 5.7619 5.7619 7.0411 5.7619 8.61905C5.7619 10.197 7.04105 11.4762 8.61905 11.4762Z"
        stroke="#C9553E"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
      <path
        d="M8.61905 21C12.827 19.0952 16.2381 12.827 16.2381 8.61905C16.2381 4.41116 12.827 1 8.61905 1C4.41116 1 1 4.41116 1 8.61905C1 12.827 4.41116 19.0952 8.61905 21Z"
        stroke="#C9553E"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  );
};

export default LocationPin;
