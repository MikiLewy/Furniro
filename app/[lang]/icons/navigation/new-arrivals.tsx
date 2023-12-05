interface Props {
  className?: string;
}

const NewArrivals = ({ className }: Props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.6767 12.3233L10.2503 18.3283C10.6045 19.1548 11.7062 19.2421 12.1479 18.4588C13.0193 16.9132 14.3112 14.4206 15.603 11.191C17.8677 5.52932 19 1 19 1C19 1 14.4707 2.13233 8.80903 4.39699C5.57944 5.68883 3.08676 6.98066 1.54116 7.85214C0.757873 8.29379 0.845198 9.39552 1.67171 9.74973L7.6767 12.3233Z"
        fill="#F6F6F5"></path>
      <path
        d="M7.6767 12.3233L10.2503 18.3283C10.6045 19.1548 11.7062 19.2421 12.1479 18.4588C13.0193 16.9132 14.3112 14.4206 15.603 11.191C17.8677 5.52932 19 1 19 1M7.6767 12.3233L1.67171 9.74974C0.845198 9.39552 0.757873 8.29379 1.54116 7.85214C3.08676 6.98066 5.57944 5.68883 8.80903 4.39699C14.4707 2.13233 19 1 19 1M7.6767 12.3233L19 1"
        stroke="#999999"
        strokeLinecap="round"
        strokeLinejoin="round"></path>
    </svg>
  );
};

export default NewArrivals;
