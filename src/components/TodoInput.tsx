import * as React from 'react';
import { Button, Form, Input} from 'antd';
import { postTodo } from '../utilities/api';
import { TodoContext, TodoContextType } from '../utilities/todo.context';


export default function TodoInput () {
    
    const {getAllTasks} = React.useContext(TodoContext) as TodoContextType
    const [form] = Form.useForm()

    const handleSubmit = async (values: any) => {
        await postTodo(values.todo)
        form.resetFields()
        getAllTasks()
      }
    
  return (
    <>
      <Form className='todo-entry' form={form} layout={'inline'} onFinish={handleSubmit}>
            <Form.Item name="todo" rules={[{ required: true }]}>
              <Input placeholder='Write New Task Here...' />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
          </>
  );
}
