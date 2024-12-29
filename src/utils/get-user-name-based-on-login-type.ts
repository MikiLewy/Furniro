export const getUserNameBasedOnLoginType = (
  isOAuth: boolean | undefined,
  name: string | null | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
): string => {
  switch (true) {
    case isOAuth && !!name:
      return name;
    default:
      return `${firstName} ${lastName}`;
  }
};
