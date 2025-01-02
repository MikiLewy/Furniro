'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
  color: string;
  onClick: () => void;
  name: string;
}

const VariantCircle = ({ color, name, onClick }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="w-5 h-5 rounded-full cursor-pointer"
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
