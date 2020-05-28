const state = {
  topRight: [5, 3], // [x, y]
  leftBottom: [1, 1]
}

// test1. 숫자를 하나씩 증가시키는 generator function
//  - 시작값과 나중값을 입력받는다
//  - 숫자의 크기를 1씩 증가시키며 계속해서 반환한다
function *numbersBtw(start, end) {
  while(start <= end) {
    yield start++;
  }
}

function findSearchRange(corners) {
  const {topRight: [xM, yM], leftBottom: [xm, ym]} = corners;
  const range = Array.from(numbersBtw(xm, xM))
    .map(el => [el, ym])
    .flatMap(([x, ym]) => Array.from(numbersBtw(ym, yM)).map(y => [x, y]));
  return range;
}

findSearchRange(state);