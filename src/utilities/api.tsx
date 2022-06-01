import axios from "axios";
import { ITodo } from "./todo.context";
const baseURL = 'http://localhost:5005'



export const getTodos = async () => {
   const response =  await axios.get(`${baseURL}/todos`)
   const booleanData = response.data.map((todo: ITodo) => {
       todo.isComplete = Boolean(todo.isComplete)
    return todo
})
      return booleanData
}

export const postTodo = async (todo: string) => {
    return await axios.post(`${baseURL}/todos`, { todoText: todo })
    
}

export const patchTodo = async (update: ITodo) => {
    const {id: todoID, todoText, isComplete} = update
    return await axios.patch(`${baseURL}/todo/${todoID}`, { todoText, isComplete})
}

export const deleteTodo = async (todoID: number) => {
    return await axios.delete(`${baseURL}/todo/${todoID}`)
}