import { useState, useEffect } from 'react';

const withFilter = <P extends {}>(
  Wrapped: React.ComponentType<P>,
  sortPorps: string
) => {
  return (props: any) => {
    const { list, ...otherProps }: { list: Array<any> } = props;
    const [enteredSearchValue, setEnteredSearchValue] = useState<string>('');
    const [activeSearchValue, setActiveSearchValue] = useState<string>('');

    const availableItems: Array<any> = activeSearchValue
      ? list.filter((item) =>
          RegExp(activeSearchValue, 'i').test(item[sortPorps])
        )
      : list;

    useEffect(() => {
      const handler = setTimeout(() => {
        setActiveSearchValue(enteredSearchValue);
      }, 300);

      return () => {
        clearTimeout(handler);
      };
    }, [enteredSearchValue]);

    return (
      <Wrapped
        list={availableItems}
        enteredSearchValue={enteredSearchValue}
        setEnteredSearchValue={setEnteredSearchValue}
        activeSearchValue={activeSearchValue}
        {...(otherProps as any)}
      />
    );
  };
};

export default withFilter;
