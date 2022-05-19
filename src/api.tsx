import axios from "axios";
const baseURL = 'http://localhost:5005'

type TodoType = {
    todoText: string,
    isComplete: boolean
  }

//Parameter Types


export const getTodos = async () => {
   const response =  await axios.get(`${baseURL}/todos`)
   return response.data
}

export const postTodo = async (todo: string) => {
    return await axios.post(`${baseURL}/todos`, { todoText: todo })
    
}

export const patchTodo = async (todoID: number, update: TodoType) => {
    const {todoText, isComplete} = update
    return await axios.patch(`${baseURL}/todo/${todoID}`, { todoText, isComplete})
}

export const deleteTodo = async (todoID: number) => {
    return await axios.delete(`${baseURL}/todo/${todoID}`)
}