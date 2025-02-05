'use client';

import { FocusEvent, useEffect, useRef, useState } from 'react';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Query = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [tempValue, setTempValue] = useState('');
  const [autoFocus, setAutoFocus] = useState(false);

  const debouncedRequest = useDebounce(() => {
    onChange(tempValue);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
    debouncedRequest();
  };

  const handleFocus = (): void => {
    setAutoFocus(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    /*
     There is a situation where an input goes from not disabled to disabled and DOM emits a blur
     event, with event as undefined. This means, that sometimes we'll receive an React Synthetic
     event and sometimes undefined because when DOM triggers the event, React is unaware of it,
     or it simply does not emit the event. To bypass this behaviour, we store a local variable
     that acts as autofocus.
     */

    if (event) {
      setAutoFocus(false);
    }
  };

  useEffect(() => {
    setTempValue(value);
  }, []);

  useEffect(() => {
    if (autoFocus && inputRef?.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Input
      placeholder="Search products"
      className="max-w-sm"
      ref={inputRef}
      value={tempValue}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
    />
  );
};

export default Query;
