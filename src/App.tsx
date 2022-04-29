import {useFilter} from './hooks/filter';
import {useSort} from './hooks/sort';
import {ITodo} from './types/data';

interface IAppProps {
  list: Array<ITodo>;
}

const App: React.FC<IAppProps> = ({list}) => {
  const {
    enteredSearchValue,
    setEnteredSearchValue,
    availableItems
  } = useFilter(list, 'title');

  const {sortMode, setSortMode, sortedItems} = useSort(
    availableItems,
    'title'
  );

  const handlerSortMode = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSortMode(e.target.value);
  };

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
