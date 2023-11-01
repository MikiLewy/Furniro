import { Dispatch, SetStateAction, useEffect } from 'react';

export const useResizeHandler = (maxPixels: number, callback: Dispatch<SetStateAction<boolean>>) => {
  const resizeHandler = () => {
    window.innerWidth >= maxPixels ? callback(false) : callback(true);
  };

  useEffect(() => {
    window.innerWidth >= maxPixels ? callback(false) : callback(true);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);
};
