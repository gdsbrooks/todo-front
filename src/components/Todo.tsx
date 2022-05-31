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

  const handleCheckTask = () => {
    toggleChecked(!checked)
    patchTodo({ id, todoText, isComplete: !isComplete })
    getAllTasks()
  }

  const handleEdit = () => {
    toggleEdit(!editing)
  }

  const handleUpdate = async (values: any) => {
    toggleEdit(false)
    const update = { id, isComplete, todoText: values.updatedTodo }
    const response = await patchTodo(update)        
    getAllTasks()
    response.status === 200
      ? alert(`Task updated sccessfully`)
      : response.status === 400
        ? alert(`Task can't be updated - it's already marked as complete!`)
        : alert(`HTTP Response: ${response.status} - ${response.statusText} `)
  }

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    await deleteTodo(id)
    getAllTasks()
    alert(`TODO ${id} successully deleted.`)
  }

  return (<div className='single-todo'>

    {
      (editing === true)
        ? <InlineEdit id={id} isComplete={isComplete} todoText={todoText} handleUpdate={handleUpdate} />
        : <>
          <Checkbox onChange={handleCheckTask} checked={checked} />
          <Paragraph id={`todo-entry-${id}`}> {todoText} </Paragraph>
          <Button type='text' icon={<EditOutlined />} name='edit' onClick={e => toggleEdit(!editing)} />
          <Button type='text' icon={<DeleteOutlined />} danger name='delete' onClick={e => handleDelete(e, id)} />
        </>
    }
  </div>);
}

const InlineEdit = ({ id, isComplete, todoText, handleUpdate }: any) => {

  const [editInline] = Form.useForm()
  return (
    <Form className='inline-edit' form={editInline} layout='inline' onFinish={handleUpdate}>
      <Form.Item name="updatedTodo">
        <Input autoFocus defaultValue={todoText} />
      </Form.Item>
      <Form.Item>
        <Button icon={<EnterOutlined />} type="primary" htmlType="submit" />
      </Form.Item>
    </Form>
  )
}








export default Todo