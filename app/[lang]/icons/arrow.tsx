interface Props {
  className?: string;
}

export const Arrow = ({ className }: Props) => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    height="100%"
    width="100%"
    fill="none"
    viewBox="0 0 10 6"
    strokeWidth="2"
    className={className}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m1 1 4 4 4-4" />
  </svg>
);
