import { Dispatch, SetStateAction, useEffect } from 'react';

export const useResizeHandler = (
  maxPixels: number,
  callback: Dispatch<SetStateAction<boolean>>,
) => {
  const resizeHandler = () => {
    if (window.innerWidth >= maxPixels) {
      return callback(false);
    }
    callback(true);
  };

  useEffect(() => {
    if (window.innerWidth >= maxPixels) {
      callback(false);
    } else {
      callback(true);
    }
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPixels]);
};
