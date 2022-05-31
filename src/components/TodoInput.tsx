import * as React from 'react';
import { Button, Form, Input} from 'antd';
import { postTodo } from '../utilities/api';
export interface ITodoInputProps {
    getAllTasks: () => void
}

export default function TodoInput (props: ITodoInputProps) {
    
    const {getAllTasks} = props
    const [form] = Form.useForm()

    const handleSubmit = (values: any) => {
        postTodo(values.todo)
        console.log('values :>> ', values);
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
