import { useState } from 'react';

const withSort = <P extends {}>(
  Wrapped: React.ComponentType<P>,
  sortProps: string
) => {
  return (props: any) => {
    const { list, ...otherProps }: { list: Array<any> } = props;
    const [sortMode, setSortMode] = useState<string | null>(null);

    const handlerSortMode = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setSortMode(e.target.value);
    };

    const sortedItems: Array<any> = !sortMode
      ? list
      : list.slice().sort((a, b) => {
          if (sortMode === 'asc' && a[sortProps] > b[sortProps]) {
            return 1;
          } else if (sortMode === 'asc') {
            return -1;
          } else if (sortMode === 'desc' && a[sortProps] > b[sortProps]) {
            return -1;
          } else {
            return 1;
          }
        });

    return (
      <Wrapped
        handlerSortMode={handlerSortMode}
        sortMode={sortMode}
        list={sortedItems}
        {...(otherProps as any)}
      />
    );
  };
};

export default withSort;
