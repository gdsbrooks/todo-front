import * as React from 'react'
import { Button, Checkbox, Typography } from 'antd';
import { getTodos, postTodo, patchTodo, deleteTodo } from '../api';


function Todo(props: any) {
    const id: number = props.id
    const isComplete: boolean = props.isComplete
    const todoText: string = props.todoText
  
    const [checked, toggleChecked] = React.useState<boolean>(isComplete)
  
    const handleCheckTask = () => {
      toggleChecked(!checked)
      patchTodo(id, {todoText, isComplete: true} )
    }
  
    const handleEdit = (e: any, id: number) => {
      alert(id)
    }
  
    const handleDelete = async (e: any, id: number) => {
      await deleteTodo(id)
      await props.getAllTasks()
      alert(`TODO ${id} successully deleted.`)
  
    }
  
    return (<div className='single-todo' key={id}>
      <Checkbox onChange={handleCheckTask} disabled={checked} checked={checked} />
      <Typography.Paragraph id={`todo-entry-${id}`} style={{
        flexGrow: '1'
      }}>{todoText}</Typography.Paragraph>
      <Button size="large" type='text' name='edit' onClick={e => handleEdit(e, id)}>Edit</Button>
      <Button size="large" type='text' color='danger' name='delete' onClick={e => handleDelete(e, id)}>Delete</Button>
  
  
    </div>);
  }

  export default Todo