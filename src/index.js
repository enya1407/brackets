module.exports = function check(str, bracketsConfig) {
  let open = [];
  let close = [];
  let stack = [];
  let exception = [];

  for (let i = 0; i < bracketsConfig.length; i++) {
    let j = bracketsConfig[i];
    if (j[0] == j[1]) {
      exception.push(j[0]);
    } else {
      open.push(j[0]);
      close.push(j[1]);
    }
  }

  for (let i = 0; i < str.length; i++) {
    let j = str[i];
    let endInStack = stack[stack.length - 1];

    if (exception.includes(j)) {
      if (j === endInStack) {
        stack.pop();
      } else {
        stack.push(j);
      }
    } else if (open.includes(j)) {
      stack.push(j);
    } else {
      let indexOpen = open.findIndex(el => el === endInStack);
      let indexClose = close.findIndex(el => el === j);
      if (indexOpen === indexClose) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
};
