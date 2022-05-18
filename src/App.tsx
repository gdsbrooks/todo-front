import * as React from 'react'
import './App.css';
import { Checkbox } from 'antd';
import { Empty } from './components/empty';
import { getTodos, postTodo, patchTodo, deleteTodo } from './api';


function App() {

  type TodoType = {
    id: number,
    todoText: string,
    isComplete: boolean
  }


  const [todoInput, setToDoInput] = React.useState<string>('')
  const [allTodos, setAllTodos] = React.useState<Array<TodoType>>([])

  React.useEffect(() => {

    const getAllTasks = async() => {
    const response = await getTodos()
    console.log(response) 
    setAllTodos(response)
    }
    getAllTasks()
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    console.log('todoInput :>> ', todoInput);
    const todoInputField = e.target.value
    setToDoInput(todoInputField)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postTodo(todoInput)

  }

  const handleEdit = () => {

  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
    deleteTodo(id)
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
        <h3>Tasks</h3>
        <div className='heavy to border, hidden bottom' style={{ border: 'solid green 1px' }}>
          {
            (allTodos.length === (0 | NaN))
              ? <Empty />
              : allTodos.map((todo) => {
                const { id, todoText, isComplete } = todo
                return (
                  <div className='todo-entry' key={id}>
                    <input type='checkbox' checked={isComplete} />
                    <p>{todoText}</p>
                    <button>Edit</button>
                    <button onClick={(e) => handleDelete(e, id)}>Delete</button>
                  </div>
                )
              })
          }
        </div>


      </main>

      <footer>
        <input type='checkbox' title='Hide Completed' name='hide' />
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