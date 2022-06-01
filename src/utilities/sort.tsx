//returns one of three different functions used to sort todos,  based

import { ITodo } from "./todo.context";

const compare = (index: number) => {

  const byAge = (a: ITodo, b: ITodo) => {
    return a.id - b.id;
  };

  const alphaAsc = (a: ITodo, b: ITodo) => {
    if (a.todoText.toUpperCase() > b.todoText.toUpperCase())
      return 1;
    if (a.todoText.toUpperCase() < b.todoText.toUpperCase())
      return -1;
    return 0;
  };
  const alphaDesc = (a: ITodo, b: ITodo) => {
    if (a.todoText.toUpperCase() > b.todoText.toUpperCase())
      return -1;
    if (a.todoText.toUpperCase() < b.todoText.toUpperCase())
      return +1;
    return 0;
  };

  const compareMethods = [byAge, alphaAsc, alphaDesc];
  return compareMethods[index];
}

export default compare