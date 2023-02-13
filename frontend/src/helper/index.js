export const analysisExample = (exampleStr = '', word = '') => {
  if (typeof exampleStr !== 'string' || exampleStr === '') {
    return [];
  }

  const exampleArr = exampleStr.split('\n');
  for (let str of exampleArr) {
    if (str.toLocaleLowerCase().indexOf(word.toLocaleLowerCase()) === -1) {
      return false;
    }
  }

  return exampleArr;
};

// prevent execute continuously a function
export const debounce = (timer = null, cbFn, delay = 350) => {
  if (timer) {
    clearTimeout(timer);
  }
  return setTimeout(cbFn, delay);
};
