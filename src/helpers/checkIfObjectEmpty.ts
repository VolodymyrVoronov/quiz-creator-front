export const checkIfObjectEmpty = <T extends {}>(obj: T) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
