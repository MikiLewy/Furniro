'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Props {
  color: string;
  onClick: () => void;
  name: string;
  size?: 'regular' | 'large';
}

const VariantCircle = ({ color, name, onClick, size }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              size === 'large' ? 'w-7 h-7' : 'w-5 h-5',
              'rounded-full cursor-pointer',
            )}
            style={{ backgroundColor: color }}
            onClick={onClick}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VariantCircle;
