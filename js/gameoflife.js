function seed(...args) {
  return [...args];
}

function same([x, y], [j, k]) {
  return x === j && y === k;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some(el => same(el, cell));
}

const printCell = (cell, state) => {
  return (contains.call(state, cell)) ? '\u25A3' : '\u25A2';
};

const corners = (state = []) => {
  const xArr = (state.length !== 0) ? state.map(el => el[0]) : [0];
  const yArr = (state.length !== 0) ? state.map(el => el[1]) : [0];
  return {
    topRight: [Math.max(...xArr), Math.max(...yArr)],
    bottomLeft: [Math.min(...xArr), Math.min(...yArr)],
  }
};

const printCells = (state) => {
  // step1. state 를 포함하는 최소 크기의 직사각형
  const { topRight: [xMax, yMax], bottomLeft: [xMin, yMin] } = corners(state);
  // step2. 직사각형의 모든 원소 2 dim
  let rect = [];
  for (let y = yMax; y >= yMin; y--) {
    rect.push([]);
    for (let x = xMin; x <= xMax; x++) {
      rect[yMax - y].push([x, y]);
    }
  }
  // step3. 직사각형의 모든 원소를 프린트
  rect = rect.map(row => 
    row.map(el => 
      printCell(el, state)
    )
  );
  // step4. 프린트 결과를 조인
  let result = rect
    .map(row => row.join(' '))
    .join('\\n');
  return result;
};

const getNeighborsOf = ([x, y]) => {
  let result = [];
  for (let delY = 1; delY >= -1; delY--) {
    for (let delX = -1; delX <= 1; delX++) {
      if (delX === 0 && delY === 0) {
        continue;
      }
      result.push([x + delX, y + delY]);
    }
  }
  return result;
};

const getLivingNeighbors = (cell, state) => {
  return getNeighborsOf(cell)
    .filter(neighbor => contains.call(state, neighbor));
};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;