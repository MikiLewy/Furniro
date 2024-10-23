interface Props {
  className?: string;
}

const Products = ({ className }: Props) => {
  return (
    <svg width="100%" height="100%" className={className} viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.87224 0.988037H11.0027H20.1331V14.2315H11.0027H1.87224V0.988037Z" fill="#F6F6F5"></path>
      <path
        d="M11.0027 14.2315H20.1331V0.988037H11.0027M11.0027 14.2315H1.87224V0.988037H11.0027M11.0027 14.2315V0.988037M0.5 0.988091H21.5M3.69833 14.2315V17.0121M5.52441 14.2315V16.0991M18.307 14.2315V17.0121M16.4809 14.2315V16.0991"
        stroke="#999999"
        stroke-linecap="round"
        stroke-linejoin="round"></path>
    </svg>
  );
};

export default Products;
