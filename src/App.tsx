import * as React from 'react'
import './App.css';
import { Checkbox } from 'antd';
import { Empty } from './components/empty';
import { getTodos, postTodo, patchTodo, deleteTodo } from './api';
import { NONAME } from 'dns';


function App() {

  type TodoType = {
    id: number,
    todoText: string,
    isComplete: boolean
  }


  const [todoInput, setToDoInput] = React.useState<string>('')
  const [allTodos, setAllTodos] = React.useState<Array<TodoType>>([])
  const [hideCompleted, toggleHide] = React.useState(false)

  const getAllTasks = async() => {
    const response = await getTodos()
    setAllTodos(response)
    }
  React.useEffect(() => {
    getAllTasks()
  }, [allTodos.length])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    console.log('todoInput :>> ', todoInput);
    const todoInputField = e.target.value
    setToDoInput(todoInputField)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postTodo(todoInput)
    getAllTasks()
    e.currentTarget.reset()

  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    alert(id)
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    await deleteTodo(id)
    await getAllTasks()
    alert(`TODO ${id} successully deleted.`)

  }





  return (
    <div className="App">
      <header>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Write new task here....' onChange={handleChange} />


          <button type='submit'>Create</button>
        </form>
      </header>
      <main>
        <h3>Tasks ({allTodos.length})</h3>
        <div className='heavy to border, hidden bottom' style={{ border: 'solid green 1px' }}>
          {
            (allTodos.length === (0 | NaN))
              ? <Empty />
              : allTodos.map((todo) => {
                const { id, todoText, isComplete } = todo
                return (
                  <div key={id}>
                    <input type='checkbox' readOnly checked={isComplete} />
                    <p id={`todo-entry-${id}`}>{todoText}</p>
                    <button id={`edit-${id}`} onClick={(e) => handleEdit(e, id)}>Edit</button>
                    <button id={`delete-${id}`} onClick={(e) => handleDelete(e, id)}>Delete</button>
                  </div>
                )
              })
          }
        </div>


      </main>

      <footer>
        Hide Completed <input type='checkbox' title='Hide Completed' name='hide' onChange={(e) => (toggleHide(!hideCompleted))}/>
        DEV: Hide Completed State: {String(hideCompleted)}
      </footer>
    </div>
  );
        }

export default App;

interface TodoPropsInterface {
  todoString: string,
  isComplete: boolean,
  edit: () => void,
  delete: () => void

}
