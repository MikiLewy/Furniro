import { Check } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ProductAdvantages = () => {
  const productAdvantages = [
    {
      key: 'free-delivery',
      label: 'Free home delivery',
      tooltip:
        'Free shipping for orders over €100. Secure flat-packed delivery anywhere in the EU - always free of charge.',
    },
    {
      key: '2-year-guarantee',
      label: 'Two-year guarantee',
      tooltip:
        'All our products come with a 2-year guarantee for your peace of mind.',
    },
    {
      key: 'produced-in-eu',
      label: 'Produced in the EU',
      tooltip:
        'Produced in Poland. This product is fully produced, preassembled and packed in Poland. We value and support local business. We pride ourselves on sourcing all parts and materials from trusted partners in the EU.',
    },
    {
      key: 'planting-forest',
      label: 'Planting forest',
      tooltip:
        'We’ve teamed up with a non-profit organization and allocate part of our revenue to biodiverse forest planting.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {productAdvantages.map(info => (
        <TooltipProvider key={info.key}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div key={info.key} className="flex gap-1 items-center">
                <Check className="w-4 h-4 text-secondary-darker" />
                <p className="text-base text-secondary-darker">{info.label}</p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-sm">{info.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

export default ProductAdvantages;
