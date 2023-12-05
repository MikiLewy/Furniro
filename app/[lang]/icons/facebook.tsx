interface Props {
  className?: string;
}

const Facebook = ({ className }: Props) => {
  return (
    <svg fill="currentColor" height="100%" width="100%" viewBox="0 0 9 18" className={className} xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_34_218)">
        <path d="M5.842 17.5V9.746H8.495L8.893 6.723H5.843V4.793C5.843 3.919 6.089 3.323 7.369 3.323H9V0.618C8.718 0.582 7.75 0.5 6.623 0.5C4.27 0.5 2.66 1.908 2.66 4.494V6.724H0V9.746H2.66V17.5H5.842Z"></path>
      </g>
      <defs>
        <clipPath id="clip0_34_218">
          <rect fill="white" height="17" transform="translate(0 0.5)" width="9"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default Facebook;
