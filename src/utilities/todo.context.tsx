import * as React from 'react';
import { getTodos } from './api';

//Todo type
export interface ITodo {
    id: number,
    todoText: string,
    isComplete: boolean
}
//Made available through context
export type TodoContextType = {
    allTodos: ITodo[],
    getAllTasks: () => void
}

 export const TodoContext = React.createContext<TodoContextType | null>(null);

 type CtxKids = {
 children: React.ReactNode
 }
export const TodoContextWrapper = ({ children } : CtxKids) => {
    
    const [allTodos, setAllTodos] = React.useState<ITodo[]>([])

    //Fetches and updates state with all Todos
    const getAllTasks = async () => {
        const response = await getTodos()
        setAllTodos(response)
    }
    
    return (
        <TodoContext.Provider value={{allTodos, getAllTasks}}>
            {children}
        </TodoContext.Provider>
    );
}
