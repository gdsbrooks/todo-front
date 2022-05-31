const compare = (index: number) => {

  const byAge = (a: any, b: any) => {
    return a.id - b.id;
  };

  const alphaAsc = (a: any, b: any) => {
    if (a.todoText.toUpperCase() > b.todoText.toUpperCase())
      return 1;
    if (a.todoText.toUpperCase() < b.todoText.toUpperCase())
      return -1;
    return 0;
  };
  const alphaDesc = (a: any, b: any) => {
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