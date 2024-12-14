interface Props {
  title: string;
  description?: string;
}

const AccountPageTitle = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-0.5">
      <h3 className="text-lg font-medium">{title}</h3>
      {description ? (
        <p className="text-sm text-muted-foreground">
          Manage your profile information
        </p>
      ) : null}
    </div>
  );
};

export default AccountPageTitle;
