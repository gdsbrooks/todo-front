import * as React from 'react'
import 'antd/dist/antd.css'
import './App.css';
import Todo from './components/Todo';
import { Button, Checkbox, Layout, Tooltip, Typography } from 'antd';
import { Empty } from './components/empty';
import { getTodos } from './api';
import { Content } from 'antd/lib/layout/layout';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import TodoInput from './components/TodoInput';
import compare from './sort';


function App() {

  type TodoType = {
    id: number,
    todoText: string,
    isComplete: boolean | number
  }

  const [allTodos, setAllTodos] = React.useState<Array<TodoType>>([])
  const [sortMethod, setSortMethod] = React.useState<number>(0)
  const [hideCompleted, toggleHide] = React.useState(false)

  const getAllTasks = async () => {
    const response = await getTodos()
    setAllTodos(response)
  }

  React.useEffect(() => {
    getAllTasks()
  }, [allTodos.length])

  const filteredList = (hideCompleted === true)
    ? [...allTodos].filter(todo => !todo.isComplete)
    : [...allTodos]

  const sortedList = filteredList.sort(compare(sortMethod))

  const handleSort = () => {
    sortMethod < 2
      ? setSortMethod(sortMethod + 1)
      : setSortMethod(0)
  }

  return (
    <div className="App">
      <Layout className='main'>
        <TodoInput getAllTasks={getAllTasks} />
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
                : sortedList.map((todo: TodoType) => {
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