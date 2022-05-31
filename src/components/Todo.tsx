import * as React from 'react'
import { Button, Form, Input, Checkbox, Typography } from 'antd';
import { patchTodo, deleteTodo } from '../utilities/api';
import { EnterOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Paragraph } = Typography

interface TodoPropsInterface {
  id: number,
  isComplete: any,
  todoText: string,
  getAllTasks: () => void
}

function Todo(props: TodoPropsInterface) {

  const { id, isComplete, todoText, getAllTasks } = props

  const [checked, toggleChecked] = React.useState<boolean>(isComplete)
  const [editing, toggleEdit] = React.useState<boolean>(false)
  const [editInline] = Form.useForm()


  const handleCheckTask = () => {
    toggleChecked(!checked)
    patchTodo({ id, todoText, isComplete: !isComplete })
    getAllTasks()
  }

  const handleUpdate = async (values: any) => {
    toggleEdit(false)
    const update = { id, isComplete, todoText: values.updatedTodo }
    const response = await patchTodo(update)
    console.log('response :>> ', response);
    getAllTasks()
    if (response.status === 200) {
      alert(`Task updated sccessfully`)
    };
  }

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    await deleteTodo(id)
    getAllTasks()
    alert(`TODO ${id} successully deleted.`)
  }

  return (<div className='single-todo'>

    {
      (editing === true)
        ? <>
          <Form className='inline-edit' form={editInline} initialValues={{ updatedTodo: todoText }} layout='inline' onFinish={handleUpdate}>
            <Form.Item name="updatedTodo"><Input autoFocus /></Form.Item>
            <Form.Item> <Button icon={<EnterOutlined />} type="primary" ghost htmlType="submit" /> </Form.Item>
          </Form>
          </>
        : <>
          <Checkbox onChange={handleCheckTask} checked={checked} />
          <Paragraph id={`todo-entry-${id}`}> {todoText} </Paragraph>
          <Button type='text' icon={<EditOutlined />} name='edit' onClick={e => toggleEdit(!editing)} />
          <Button type='text' icon={<DeleteOutlined />} danger name='delete' onClick={e => handleDelete(e, id)} />
        </>
    }
  </div>);
}








export default Todo