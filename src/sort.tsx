const compare = (index: number) => {
    const compareAge = (a: any, b: any) => {
      return a.id - b.id;
    };
  
    const compareAZ = (a: any, b: any) => {
      if (a.todoText.toUpperCase() > b.todoText.toUpperCase())
        return 1;
      if (a.todoText.toUpperCase() < b.todoText.toUpperCase())
        return -1;
      return 0;
    };
    const compareZA = (a: any, b: any) => {
      if (a.todoText.toUpperCase() > b.todoText.toUpperCase())
        return -1;
      if (a.todoText.toUpperCase() < b.todoText.toUpperCase())
        return +1;
      return 0;
    };
  
    const compareMethods = [compareAge, compareAZ, compareZA];
    return compareMethods[index];
  }

  export default compare