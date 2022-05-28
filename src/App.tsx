import * as React from 'react'
import 'antd/dist/antd.css'
import './App.css';
import Todo from './components/Todo';
import { Button, Checkbox, Form, Input, Layout, Typography } from 'antd';
import { Empty } from './components/empty';
import { getTodos, postTodo, patchTodo, deleteTodo } from './api';
import { Content, Header, Footer } from 'antd/lib/layout/layout';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';


function App() {

  type TodoType = {
    id: number,
    todoText: string,
    isComplete: boolean
  }

  const [form] = Form.useForm()
  const [allTodos, setAllTodos] = React.useState<Array<TodoType>>([])
  const [hideCompleted, toggleHide] = React.useState(false)

  const getAllTasks = async () => {
    const response = await getTodos()
    setAllTodos(response)
  }

  React.useEffect(() => {
    getAllTasks()
  }, [allTodos.length])


  const handleSubmit = (values: any) => {
    postTodo(values.todo)
    form.resetFields()
    getAllTasks()
  }

  return (
    <div className="App">
      <Layout className='main'>
        
          <Form className='todo-entry' form={form} layout={'inline'} onFinish={handleSubmit}>
            <Form.Item style={{ flexGrow: 1 }} name="todo" rules={[{ required: true }]}>
              <Input placeholder='Write New Task Here...' />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>

        <Content>
          <Typography.Title level={3}>Tasks ({allTodos.length})</Typography.Title>
          <div className='todo-list'>
            {
              (allTodos.length === (0 | NaN))
                ? <Empty /> 
                : allTodos.map((todo) => {
                  const { id, todoText, isComplete } = todo
                  return (
                    <Todo id={id} isComplete={isComplete} todoText={todoText} getAllTasks={getAllTasks}/>
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


