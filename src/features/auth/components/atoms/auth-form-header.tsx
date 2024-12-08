interface Props {
  title: string;
  description?: string;
}

const AuthFormHeader = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col mt-2 mb-4">
      <h2 className="scroll-m-20  pb-2 text-2xl font-medium tracking-tight first:mt-0">
        {title}
      </h2>
      {description ? (
        <p className="leading-6 font-normal text-sm text-gray-400">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default AuthFormHeader;
