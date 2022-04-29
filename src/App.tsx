import withFilter from './hok/withFilter';
import withSort from './hok/withSort';
import { ITodo } from './types/data';

interface IAppProps {
  list: Array<ITodo>;
  enteredSearchValue: string;
  setEnteredSearchValue: (v: string) => void;
  sortMode: string | null;
  handlerSortMode: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const App: React.FC<IAppProps> = ({
  list,
  enteredSearchValue,
  sortMode,
  handlerSortMode,
  setEnteredSearchValue,
}) => {
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
        {list.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default withSort(withFilter(App, 'title'), 'title');
