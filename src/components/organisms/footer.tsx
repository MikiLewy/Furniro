import Link from 'next/link';

import { hotlineNumber } from '@constants/hotline-number';

import Facebook from '../../icons/facebook';
import Globe from '../../icons/globe';
import Instagram from '../../icons/instagram';
import OutlinedPhone from '../../icons/outlined-phone';
import Pinterest from '../../icons/pinterest';

const Footer = async () => {
  return (
    <footer className="max-w-[1680px] mx-auto py-10 mt-auto w-full mb-4 bg-primary/95 px-4 md:px-6 lg:px-8 rounded-2xl grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-2">
        <h5 className="text-xl text-secondary font-medium mb-1">Hotline</h5>
        <div className="flex items-center gap-1">
          <OutlinedPhone className="w-4 h-4 stroke-secondary-lighter" />
          <p className="text-sm text-secondary-lighter">
            Hotline:{' '}
            <strong>
              <Link href={`tel:${hotlineNumber}`}>{hotlineNumber}</Link>
            </strong>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4 stroke-secondary-lighter" />
          <p className="text-sm text-secondary-lighter">
            Hotline available in English
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-10 lg:mt-0">
        <div className="flex flex-col gap-2 items-start">
          <h6 className="text-xs uppercase font-semibold mb-1 text-secondary-darker">
            Customer service
          </h6>
          <Link
            href={'#'}
            className="font-medium text-secondary text-sm hover:text-secondary-lighter">
            Contact us
          </Link>
          <Link
            href={'#'}
            className="font-medium text-secondary text-sm hover:text-secondary-lighter">
            FAQ
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h6 className="text-secondary text-xs uppercase font-semibold mb-1 text-secondary-darker">
            Terms & policies
          </h6>
          <Link
            href={'#'}
            className="font-medium text-secondary text-sm hover:text-secondary-lighter">
            Shipping policy
          </Link>
          <Link
            href={'#'}
            className="font-medium text-secondary text-sm hover:text-secondary-lighter">
            Terms of service
          </Link>
          <Link
            href={'#'}
            className="font-medium text-secondary text-sm hover:text-secondary-lighter">
            Refund policy
          </Link>
          <Link
            href={'#'}
            className="font-medium text-secondary text-sm hover:text-secondary-lighter">
            Privacy policy
          </Link>
        </div>
      </div>
      <div className="flex gap-3 mt-10 items-center">
        <p className="text-xs uppercase font-semibold tracking-wide text-secondary-darker">
          Stay in touch:
        </p>
        <Link href={'#'} className="group">
          <Facebook className="w-4 h-4 fill-secondary-darker group-hover:fill-secondary" />
        </Link>
        <Link href={'#'} className="group">
          <Instagram className="w-4 h-4 fill-secondary-darker group-hover:fill-secondary" />
        </Link>
        <Link href={'#'} className="group">
          <Pinterest className="w-4 h-4 fill-secondary-darker group-hover:fill-secondary" />
        </Link>
      </div>
      <div className="mt-10 lg:col-span-full ">
        <p className="text-xs uppercase font-semibold tracking-wide text-secondary-darker">
          © {new Date().getFullYear()} Furniro
        </p>
      </div>
    </footer>
  );
};

export default Footer;
