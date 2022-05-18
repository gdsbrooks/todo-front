import axios from "axios";
const baseURL = 'http://localhost:5005'

type TodoType = {
    todoText: string,
    isComplete: boolean
  }

//Parameter Types


export const getTodos = async () => {
   const response =  await axios.get(`${baseURL}/todos`)
   console.log('getTodos response ', getTodos )
   return response.data
}

export const postTodo = (todo: string) => {
    console.log('baseURL :>> ', baseURL);
    return axios.post(`${baseURL}/todos`, { todoText: todo })
    
}

export const patchTodo = (todoID: number, update: TodoType) => {
    const {todoText, isComplete} = update
    return axios.patch(`${baseURL}/todo/${todoID}`, { todoText, isComplete})
}

export const deleteTodo = (todoID: number) => {
    return axios.delete(`${baseURL}/todo/${todoID}`)
}