export const isEmptyObj = obj => {
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }
  return false;
};

export const countPropertyInArrOfObj = (arr, type) =>
  /* eslint-disable-next-line */
   arr.reduce((acc, cur) => (cur.type === type ? ++acc : acc), 0 + 1);
