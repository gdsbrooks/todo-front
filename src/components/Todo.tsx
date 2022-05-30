import * as React from 'react'
import { Button, Checkbox, Typography } from 'antd';
import { getTodos, postTodo, patchTodo, deleteTodo } from '../api';

interface TodoPropsInterface {
  id: number,
  isComplete: any,
  todoText: string,
  getAllTasks : ()=>void
}

function Todo(props: TodoPropsInterface) {

    const {id, isComplete, todoText, getAllTasks} = props
  
    const [checked, toggleChecked] = React.useState<boolean>(isComplete)
  
    const handleCheckTask = () => {
      toggleChecked(!checked)
      patchTodo(id, {todoText, isComplete: !isComplete} )
    }
  
    const handleEdit = (e: any, id: number) => {
      alert(id)
    }
  
    const handleDelete = async (e: any, id: number) => {
      await deleteTodo(id)
      await getAllTasks()
      alert(`TODO ${id} successully deleted.`)
  
    }
  
    return (<div className='single-todo' key={id}>
      <Checkbox onChange={handleCheckTask} checked={checked} />
      <Typography.Paragraph id={`todo-entry-${id}`} style={{
        flexGrow: '1'
      }}>{todoText}</Typography.Paragraph>
      <Button size="small" type='text' name='edit' onClick={e => handleEdit(e, id)}>Edit</Button> /
      <Button size="small" type='text' color='danger' name='delete' onClick={e => handleDelete(e, id)}>Delete</Button>
  
  
    </div>);
  }

  export default Todo