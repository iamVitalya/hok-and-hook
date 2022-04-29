import {useState, useEffect} from 'react';

export const useDebounce = (value: string, delay: number) => {
  //useDeferredValue
  const [debValue, setValue] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => setValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debValue;
};