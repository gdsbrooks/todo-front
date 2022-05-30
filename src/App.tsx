import * as React from 'react'
import 'antd/dist/antd.less'
import './App.css';
import Todo from './components/Todo';
import { Button, Checkbox, Layout, Tooltip, Typography } from 'antd';
import { Empty } from './components/empty';
import { getTodos} from './api';
import { Content} from 'antd/lib/layout/layout';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import TodoInput from './components/TodoInput';


function App() {

  type TodoType = {
    id: number,
    todoText: string,
    isComplete: boolean | number
  }

  const [allTodos, setAllTodos] = React.useState<Array<TodoType>>([])
  const [sort, setSort] = React.useState<number>(0)
  const [hideCompleted, toggleHide] = React.useState(false)

  const getAllTasks = async () => {
    const response = await getTodos()
    setAllTodos(response)
    console.log('allTodos :>> ', allTodos);
  }

  React.useEffect(() => {
    getAllTasks()
    console.log('allTodos :>> ', allTodos);
  }, [allTodos.length])

  const filteredList = (hideCompleted === true)
    ? [...allTodos].filter(todo => !todo.isComplete)
    : [...allTodos]

    
  
    const handleSort = () => {
      if (sort < 2 ) {
        setSort(sort+1) 
      } else setSort(0)
    }

  return (
    <div className="App">
      <Layout className='main'>
        <TodoInput getAllTasks={getAllTasks} />
        <Content>
         
          <Typography.Title level={4}>
            <Tooltip placement="right" arrowPointAtCenter title={`Click to sort by Task age / Alphabetically ascending / descending`}>
              Tasks ({allTodos.length})
            </Tooltip>
          </Typography.Title> <Button onClick={handleSort}>{`${sort}`}</Button>
          <div className='todo-list'>
            {
              (allTodos.length === (0 | NaN))
                ? <Empty />
                : filteredList.sort(newFunction(sort)).map((todo: TodoType) => {
                  const { id, todoText, isComplete } = todo
                  return (
                    <Todo key={id} id={id} isComplete={isComplete} todoText={todoText} getAllTasks={getAllTasks} />
                  )
                })
            }
          </div>

        </Content>
        <div className='footer'>
          <Checkbox name='hide' onChange={(e: CheckboxChangeEvent) => (toggleHide(!hideCompleted))}>Hide Completed Tasks</Checkbox>
         </div>
      </Layout>

      </div>
  );
}

export default App;


function newFunction(index: number) {
  const compareAge = (a: any, b: any) => {
    return a.id - b.id;
  };

  const compareAZ = (a: any, b: any) => {
    if (a.todoText.toUpperCase() > b.todoText.toUpperCase())
      return 1;
    if (a.todoText.toUpperCase() < b.todoText.toUpperCase())
      return -1;
    return 0;
  };
  const compareZA = (a: any, b: any) => {
    if (a.todoText.toUpperCase() > b.todoText.toUpperCase())
      return -1;
    if (a.todoText.toUpperCase() < b.todoText.toUpperCase())
      return +1;
    return 0;
  };

  const compareMethods = [compareAge, compareAZ, compareZA];
  return compareMethods[index];
}

