import axios from "axios";
const baseURL = 'http://localhost:5005'

type TodoType = {
    id: number,
    todoText: string,
    isComplete: boolean
  }

//Parameter Types


export const getTodos = async () => {
   const response =  await axios.get(`${baseURL}/todos`)
   const booleanData = response.data.map((todo: TodoType) => {
       todo.isComplete = Boolean(todo.isComplete)
    return todo
})
      return booleanData
}

export const postTodo = async (todo: string) => {
    return await axios.post(`${baseURL}/todos`, { todoText: todo })
    
}

export const patchTodo = async (update: TodoType) => {
    const {id: todoID, todoText, isComplete} = update
    return await axios.patch(`${baseURL}/todo/${todoID}`, { todoText, isComplete})
}

export const deleteTodo = async (todoID: number) => {
    return await axios.delete(`${baseURL}/todo/${todoID}`)
}