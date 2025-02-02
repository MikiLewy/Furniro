'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Dispatch, forwardRef, SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Props = React.ComponentProps<'input'> & {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
};

const TagsInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value, ...rest }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState<string>('');

    const [focused, setFocused] = useState(false);

    const addPendingDataPoint = () => {
      if (pendingDataPoint) {
        const newDataPoints = new Set([...value, pendingDataPoint]);

        onChange(Array.from(newDataPoints));
        setPendingDataPoint('');
      }
    };

    const { setFocus } = useFormContext();

    const onRemoveTag = (tag: string) => {
      const newDataPoints = value.filter(dataPoint => dataPoint !== tag);

      onChange(newDataPoints);
    };

    return (
      <div
        onClick={() => setFocus('tags')}
        className={cn(
          'flex  w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-full ',
          focused
            ? 'ring-offset-2 outline-none ring-ring ring-2'
            : 'ring-offset-0 outline-none ring-ring ring-0',
        )}>
        <motion.div className="rounded-md p-1 flex gap-2 flex-wrap items-center">
          <AnimatePresence>
            {value.map(tag => (
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                exit={{ scale: 0 }}
                key={tag}>
                <Badge variant="secondary" className="relative">
                  {tag}
                  <button
                    className="w-3 absolute -right-1 -top-[12px]"
                    onClick={() => onRemoveTag(tag)}>
                    <X className="w-3" />
                  </button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="flex">
            <Input
              className="focus-visible:border-transparent border-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addPendingDataPoint();
                }
                if (
                  e.key === 'Backspace' &&
                  !pendingDataPoint &&
                  value.length > 0
                ) {
                  e.preventDefault();
                  const newValue = [...value];
                  newValue.pop();

                  onChange(newValue);
                }
              }}
              value={pendingDataPoint}
              onFocus={() => setFocused(true)}
              onBlurCapture={() => setFocused(false)}
              onChange={e => setPendingDataPoint(e.target.value)}
              {...rest}
            />
          </div>
        </motion.div>
      </div>
    );
  },
);

TagsInput.displayName = 'TagsInput';

export default TagsInput;
