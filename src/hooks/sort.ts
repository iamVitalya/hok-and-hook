import { useState } from 'react';

export const useSort = (items: Array<object>, filterProp: string) => {
  const [sortMode, setSortMode] = useState<string | null>(null);

  const sortedItems = !sortMode
    ? items
    : items.slice().sort((a, b) => {
        if (sortMode === 'asc' && a[filterProp] > b[filterProp]) {
          return 1;
        } else if (sortMode === 'asc') {
          return -1;
        } else if (sortMode === 'desc' && a[filterProp] > b[filterProp]) {
          return -1;
        } else {
          return 1;
        }
      });

  return {
    sortMode,
    setSortMode,
    sortedItems,
  };
};
