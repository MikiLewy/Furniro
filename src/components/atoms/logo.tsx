import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      prefetch
      className="text-2xl font-bold text-primary relative z-30 self-start">
      Furniro
    </Link>
  );
};

export default Logo;
