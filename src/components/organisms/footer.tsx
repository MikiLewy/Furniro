import Link from 'next/link';

import { hotlineNumber } from '@constants/hotline-number';

import Facebook from '../../icons/facebook';
import Globe from '../../icons/globe';
import Instagram from '../../icons/instagram';
import OutlinedPhone from '../../icons/outlined-phone';
import Pinterest from '../../icons/pinterest';

const Footer = async () => {
  return (
    <footer className="py-10 mt-auto w-full horizontal-spacing border-t bg-[#f6f6f5] border-t-[#eeeeec] grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-2">
        <h5 className="text-xl text-secondary font-medium mb-1">Hotline</h5>
        <div className="flex items-center gap-1">
          <OutlinedPhone className="w-4 h-4" />
          <p className="text-sm text-secondary-lighter">
            Hotline :
            <strong>
              <Link href={`tel:${hotlineNumber}`}>{hotlineNumber}</Link>
            </strong>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4" />
          <p className="text-sm text-secondary-lighter">
            Hotline available in English
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-10 lg:mt-0">
        <div className="flex flex-col gap-2 items-start">
          <h6 className="text-primary text-xs uppercase font-semibold mb-1">
            Customer service
          </h6>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            Contact us
          </Link>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            FAQ
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h6 className="text-primary text-xs uppercase font-semibold mb-1">
            Terms & policies
          </h6>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            Shipping policy
          </Link>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            Terms of service
          </Link>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            Refund policy
          </Link>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            Privacy policy
          </Link>
        </div>
      </div>
      <div className="flex gap-3 mt-10 items-center">
        <p className="text-xs uppercase font-semibold tracking-wide text-secondary-darker">
          Stay in touch:
        </p>
        <Link href={'#'} className="group">
          <Facebook className="w-4 h-4 fill-secondary-darker group-hover:fill-primary" />
        </Link>
        <Link href={'#'} className="group">
          <Instagram className="w-4 h-4 fill-secondary-darker group-hover:fill-primary" />
        </Link>
        <Link href={'#'} className="group">
          <Pinterest className="w-4 h-4 fill-secondary-darker group-hover:fill-primary" />
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
