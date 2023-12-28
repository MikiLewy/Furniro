import Button from '@components/atoms/button/button';

interface Props {
  btnContentTranslation: string;
}

const ClientAboutUs = ({ btnContentTranslation }: Props) => {
  return (
    <Button variant="outlined" size="lg" className="self-start">
      {btnContentTranslation}
    </Button>
  );
};

export default ClientAboutUs;
