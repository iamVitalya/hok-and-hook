import { useState, useEffect } from 'react';
import { ITodo } from './types/data';

interface IAppProps {
  list: Array<ITodo>;
}

const App: React.FC<IAppProps> = ({ list }) => {
  const [enteredSearchValue, setEnteredSearchValue] = useState<string>('');
  const [activeSearchValue, setActiveSearchValue] = useState<string>('');
  const [sortMode, setSortMode] = useState<string | null>(null);

  const handlerSortMode = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSortMode(e.target.value);
  };

  const availableItems: ITodo[] = activeSearchValue
    ? list.filter((item) => RegExp(activeSearchValue, 'i').test(item.title))
    : list;

  const sortedItems: ITodo[] = !sortMode
    ? availableItems
    : availableItems.slice().sort((a, b) => {
        if (sortMode === 'asc' && a.title > b.title) {
          return 1;
        } else if (sortMode === 'asc') {
          return -1;
        } else if (sortMode === 'desc' && a.title > b.title) {
          return -1;
        } else {
          return 1;
        }
      });

  useEffect(() => {
    const handler = setTimeout(() => {
      setActiveSearchValue(enteredSearchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [enteredSearchValue]);

  return (
    <div className='App'>
      <div className='form'>
        <input
          type='search'
          value={enteredSearchValue}
          onChange={(e) => setEnteredSearchValue(e.target.value)}
          placeholder='search todo'
        />
        <div className='form-radio'>
          <input
            type='radio'
            name='sort'
            value='asc'
            checked={sortMode === 'asc'}
            onChange={handlerSortMode}
          />{' '}
          A-Z
          <input
            type='radio'
            name='sort'
            value='desc'
            checked={sortMode === 'desc'}
            onChange={handlerSortMode}
          />{' '}
          Z-A
        </div>
      </div>

      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
