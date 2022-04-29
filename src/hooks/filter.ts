import {useState} from 'react';
import {useDebounce} from './debounce';

export const useFilter = (items: Array<object>, filterProp: string) => {
  const [enteredSearchValue, setEnteredSearchValue] = useState<string>('');
  const activeSearchValue = useDebounce(enteredSearchValue, 300);

  const availableItems = activeSearchValue
    ? items.filter((item) =>
      RegExp(activeSearchValue, 'i').test(item[filterProp])
    )
    : items;

  return {
    enteredSearchValue,
    setEnteredSearchValue,
    availableItems,
  };
};
