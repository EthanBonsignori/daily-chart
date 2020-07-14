export const isEmptyObj = obj => {
  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }
  return false;
};

export const getNumOfCallFromType = (arr, typeOfCall) =>
  /* eslint-disable-next-line */
   arr.reduce((acc, cur) => (cur.type === typeOfCall ? ++acc : acc), 0);

export const removeTypeProperty = arr => arr.map(obj => ({
  x: obj.x,
  y: obj.y,
}));
