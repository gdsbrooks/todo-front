import * as React from 'react';
import { getTodos } from './api';


export interface ITodo {
    id: number,
    todoText: string,
    isComplete: boolean
}

export type TodoContextType = {
    allTodos: ITodo[],
    getAllTasks: () => void
}

 export const TodoContext = React.createContext<TodoContextType | null>(null);

export const TodoContextWrapper = ({ children } : any) => {
    
    const [allTodos, setAllTodos] = React.useState<ITodo[]>([])

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
