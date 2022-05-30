import * as React from 'react'
import 'antd/dist/antd.css'
import './App.css';
import Todo from './components/Todo';
import { Button, Checkbox, Form, Input, Layout, Tooltip, Typography } from 'antd';
import { Empty } from './components/empty';
import { getTodos, postTodo, patchTodo, deleteTodo } from './api';
import { Content, Header, Footer } from 'antd/lib/layout/layout';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import TodoInput from './components/TodoInput';


function App() {

  type TodoType = {
    id: number,
    todoText: string,
    isComplete: boolean | number
  }

  const [form] = Form.useForm()
  const [allTodos, setAllTodos] = React.useState<Array<TodoType>>([])
  const [filteredTodos, setFilteredTodos] = React.useState<Array<TodoType>>(allTodos)
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


  return (
    <div className="App">
      <Layout className='main'>
        <TodoInput getAllTasks={getAllTasks} />

        <Content>
          <Typography.Title level={4}>
            <Tooltip placement="right" arrowPointAtCenter title={`Click to sort by Task age / Alphabetically ascending / descending`}>
              Tasks ({allTodos.length})
            </Tooltip>
            </Typography.Title>
          <div className='todo-list'>
            {
              (allTodos.length === (0 | NaN))
                ? <Empty />
                : allTodos.map((todo: TodoType) => {
                  const { id, todoText, isComplete } = todo
                  return (
                    <Todo id={id} isComplete={isComplete} todoText={todoText} getAllTasks={getAllTasks} />
                  )
                })
            }
          </div>

        </Content>
        <Footer>
          Hide Completed <input type='checkbox' title='Hide Completed' name='hide' onChange={(e) => (toggleHide(!hideCompleted))} />
          DEV: Hide Completed State: {String(hideCompleted)}
        </Footer>
      </Layout>

      =    </div>
  );
}

export default App;

interface TodoPropsInterface {
  todoString: string,
  isComplete: boolean,
  edit: () => void,
  delete: () => void

}


