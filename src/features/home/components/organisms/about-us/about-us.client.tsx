import { Button } from '@/components/ui/button';

interface Props {
  btnContentTranslation: string;
}

const ClientAboutUs = ({ btnContentTranslation }: Props) => {
  return (
    <Button size="lg" className="self-start">
      {btnContentTranslation}
    </Button>
  );
};

export default ClientAboutUs;
