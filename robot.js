(function () {
  'use strict';

  const board = [
    ['T', 'T', '.', 'F'],
    ['T', '.', '.', '.'],
    ['.', '.', '.', '.'],
    ['R', '.', '.', 'W']
  ];

  const robot = {
    x: 0,
    y: 0,
    dir: 'up'
  };

  let moves = 0;
  let turns = 0;
  let applesEaten = 0;

  const trailIndicators = {
    left: '←',
    right: '→',
    up: '↑',
    down: '↓'
  };

  function renderAll() {
/*  Jason: I don't think I understand functions. I am also not sure what is the difference between inserting something in
() and otherwise. Also, does "render" mean anything at all*/
    board.reverse();
// Same comments here regarding ()
    const root = document.getElementById('root');
// Unsure why "document"
    root.innerHTML = '';
// Is innerHTML a sort of "reserved" value?
    renderToolbar(root);
    renderBoardContainer(root);
    renderBoard();
  }

  function renderToolbar(root) {
// Why is there now "root" in ()
    const toolbar = document.createElement('div');
    root.appendChild(toolbar);
    toolbar.setAttribute('id', 'toolbar');
// what is setAttribute? Does this result in <div id="toolbar"> </div>?

    const turnLeftButton = document.createElement('button');
    turnLeftButton.innerHTML = 'TURN-LEFT';
    turnLeftButton.addEventListener('click', function () {
      turn('left');
/* I think that addEventListener is an instruction to the computer to look for this event, in this case, "click". 
But this is a string here, does that translate to a mouse-click?
What is then the the point of function (), and then does the "turn("left")" tie back into the function near the bottom?
If so, does it actually matter whether the function is above or below?  */
    });
    toolbar.appendChild(turnLeftButton);

    const moveButton = document.createElement('button');
    moveButton.innerHTML = 'MOVE';
    moveButton.addEventListener('click', function () {
      move();
    });
    toolbar.appendChild(moveButton);

    const turnRightButton = document.createElement('button');
    turnRightButton.innerHTML = 'TURN-RIGHT';
    turnRightButton.addEventListener('click', function () {
      turn('right');
    });
    toolbar.appendChild(turnRightButton);
  }

  function renderBoardContainer(root) {
    const board = document.createElement('div');
    board.setAttribute('id', 'board');
    root.appendChild(board);
  }

  function renderBoard() {
    console.log('rendering');
  // why? I think the result of the console.log is just so that it prints this.
    const elem = document.getElementById('board');
    elem.innerHTML = '';
  // Why the blank?

    board[robot.y][robot.x] = 'R' + trailIndicators[robot.dir];
  // I don't understand board[robot.y][robot.x].

    const table = document.createElement('table');
    elem.appendChild(table);
    for (let row = board.length - 1; row >= 0; row--) {
  /* I understand that here you want the row to be board.length -1 because the board is 4x4; you want -1 because it starts
  from 0-3, so you want 4-1. I also understand "row >=0, row--" which means that as long as row is greater or = 0,
  subtract one. Subtract one from what, though? Board length?*/

      const cells = board[row];
  // Why is row in []?
      const tr = document.createElement('tr');
      table.appendChild(tr);
      let rowHtml = '';
      for (let col = 0; col < cells.length; col++) {
        const cell = cells[col] === '.' ? '' : cells[col];
        rowHtml += `<td>${cell}</td>`;
      }
      tr.innerHTML = rowHtml;
    }
  }

  function move() {
    console.log('executing move()');
    let x = robot.x;
    let y = robot.y;

    switch (robot.dir) {
      case 'up':
        y = y < board.length - 1 ? y + 1 : y;
        break;
      case 'down':
        y = y > 0 ? y - 1 : y;
        break;
      case 'left':
        x = x > 0 ? x - 1 : x;
        break;
      case 'right':
        x = x < board[0].length - 1 ? x + 1 : x;
        break;
    }

    const cell = board[y][x];

    if (cell === '.' || cell === 'F' || cell === 'A') {
      board[robot.y][robot.x] = trailIndicators[robot.dir];
      robot.x = x;
      robot.y = y;
      if (cell === 'F') {
        console.log(`flag reached in ${moves} moves and ${turns} turns`);
        if (applesEaten > 0) {
          console.log('total apples eaten: ' + applesEaten);
        }
      } else if (cell === 'A') {
        applesEaten += 1;
        console.log('apple eaten: YUM');
      }
    } else {
      console.log('move blocked by obstacle');
    }

    moves += 1;
    renderBoard();
  }

  function turn(turnDirection) {
    if (turnDirection !== 'left' && turnDirection !== 'right') {
      console.log('ignoring invalid turn', turnDirection);
      return;
    }

    console.log('executing turn()');

    switch (robot.dir) {
      case 'up':
        robot.dir = turnDirection === 'left' ? 'left' : 'right';
        break;
      case 'down':
        robot.dir = turnDirection === 'left' ? 'right' : 'left';
        break;
      case 'left':
        robot.dir = turnDirection === 'left' ? 'down' : 'up';
        break;
      case 'right':
        robot.dir = turnDirection === 'left' ? 'up' : 'down';
        break;
    }

    turns += 1;
    renderBoard();
  }

  renderAll();
})();
