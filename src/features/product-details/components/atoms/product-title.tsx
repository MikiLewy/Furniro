interface Props {
  name: string;
}

const ProductTitle = ({ name }: Props) => {
  return <h2 className="text-2xl font-semibold">{name}</h2>;
};

export default ProductTitle;
