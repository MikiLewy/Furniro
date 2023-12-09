import Link from 'next/link';

import { hotlineNumber } from '@/constants/hotline-number';
import { Locale } from '@/i18n.config';
import Facebook from '@/icons/facebook';
import Instagram from '@/icons/instagram';
import OutlinedPhone from '@/icons/outlined-phone';
import Pinterest from '@/icons/pinterest';
import Globe from '@icons/globe';
import { getDictionary } from '@lib/get-dictionary';

interface Props {
  lang: Locale;
}

const Footer = async ({ lang }: Props) => {
  const { footer } = await getDictionary(lang);

  return (
    <footer className="py-10  horizontal-spacing border-t bg-[#f6f6f5] border-t-[#eeeeec] grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-2">
        <h5 className="text-xl text-secondary font-medium mb-1">{footer.hotline}</h5>
        <div className="flex items-center gap-1">
          <OutlinedPhone className="w-4 h-4" />
          <p className="text-sm text-secondary-lighter">
            {footer.hotline}
            {': '}
            <strong>
              <Link href={`tel:${hotlineNumber}`}>{hotlineNumber}</Link>
            </strong>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4" />
          <p className="text-sm text-secondary-lighter">{footer.hotlineAvailable}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-10 lg:mt-0">
        <div className="flex flex-col gap-2 items-start">
          <h6 className="text-primary text-xs uppercase font-semibold mb-1">{footer.customerService}</h6>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            {footer.contactUs}
          </Link>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            {footer.faq}
          </Link>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h6 className="text-primary text-xs uppercase font-semibold mb-1">{footer.termsAndPolicies}</h6>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            {footer.shippingPolicy}
          </Link>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            {footer.termsOfService}
          </Link>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            {footer.refundPolicy}
          </Link>
          <Link href={'#'} className="font-medium text-sm hover:text-primary">
            {footer.privacyPolicy}
          </Link>
        </div>
      </div>
      <div className="flex gap-3 mt-10 items-center">
        <p className="text-xs uppercase font-semibold tracking-wide text-secondary-darker">{footer.stayInTouch}:</p>
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
        <p className="text-xs uppercase font-semibold tracking-wide text-secondary-darker">© {new Date().getFullYear()} Furniro</p>
      </div>
    </footer>
  );
};

export default Footer;
