import * as React from 'react'
import 'antd/dist/antd.css'
import './App.css';
import Todo from './components/Todo';
import { Button, Checkbox, Layout, Tooltip, Typography } from 'antd';
import { Empty } from './components/Empty';
import { getTodos } from './utilities/api';
import { Content } from 'antd/lib/layout/layout';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import TodoInput from './components/TodoInput';
import compare from './utilities/sort';
import { ITodo, TodoContext, TodoContextType } from './utilities/todo.context';


function App() {

  //Todos State and Fetch/Update function provided by Context.
  const { allTodos, getAllTasks } = React.useContext(TodoContext) as TodoContextType

  const [sortMethod, setSortMethod] = React.useState<number>(0)
  const [hideCompleted, toggleHide] = React.useState(false)


  React.useEffect(() => {
    getAllTasks()
  }, [allTodos.length])

  //Filter out (hide) completed tasks based on state controoled checkbox 
  const filteredList = (hideCompleted === true)
    ? [...allTodos].filter(todo => !todo.isComplete)
    : [...allTodos]

//Cycles throught 3 different sort compare functions (by age / ID number, alphabetically asc and desc)
//and applies the relevant compare function to sort the filtered list.
const handleSort = () => {
    sortMethod < 2
      ? setSortMethod(sortMethod + 1)
      : setSortMethod(0)
  }
  const sortedList = filteredList.sort(compare(sortMethod))

  

  return (
    <div className="App">
      <Layout className='main'>
        <TodoInput />
        <Content>

          <Typography.Title level={4} onClick={handleSort}>
            <Tooltip placement="right" arrowPointAtCenter title={`Click to sort by Task age / Alphabetically ascending / descending`}>
              Tasks ({allTodos.length})
            </Tooltip>
          </Typography.Title>
          <div className='todo-list'>
            {
              (allTodos.length === (0 | NaN))
                ? <Empty />
                : sortedList.map((todo: ITodo) => {
                  const { id, todoText, isComplete } = todo
                  return (
                    <Todo key={id} id={id} isComplete={isComplete} todoText={todoText} />
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