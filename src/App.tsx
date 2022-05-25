import * as React from 'react'
import './App.css';
import { Button, Checkbox, Form, Input, Layout, Typography } from 'antd';
import { Empty } from './components/empty';
import { getTodos, postTodo, patchTodo, deleteTodo } from './api';
import { NONAME } from 'dns';
import { Container } from '@mui/material';
import { Content, Header, Footer } from 'antd/lib/layout/layout';
import { DeleteOutlined } from '@ant-design/icons';


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

  const handleEdit = (e: any, id: number) => {
    alert(id)
  }

  const handleDelete = async (e: any, id: number) => {
    await deleteTodo(id)
    await getAllTasks()
    alert(`TODO ${id} successully deleted.`)

  }





  return (
    <div className="App">
      <Layout>
        <Header>
          <Form className='todo-entry' form={form} layout={'inline'} onFinish={handleSubmit}>
            <Form.Item name="todo" rules={[{ required: true }]}>
              <Input placeholder='Write New Task Here...'/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Header>
        <Content>
          <main>
            <Typography.Title level={3}>Tasks ({allTodos.length})</Typography.Title>
            <div className='todo-list' style={{ border: 'solid green 1px' }}>
              {
                (allTodos.length === (0 | NaN))
                  ? <Empty />
                  : allTodos.map((todo) => {
                    const { id, todoText, isComplete } = todo
                    return (
                      <div className='single-todo' key={id}>
                        <Checkbox checked={isComplete} />
                        <Typography.Paragraph id={`todo-entry-${id}`} style={{flexGrow: '1'}}>{todoText}</Typography.Paragraph>
                        <Button size="large" type='text' name='edit' onClick={e => handleEdit(e, id)}>Edit</Button> /
                       <Button size="large" type='text' name='delete' onClick={e => handleDelete(e, id)}>Delete</Button>
                       

                       </div>
                    )
                  })
              }
            </div>


          </main>
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
