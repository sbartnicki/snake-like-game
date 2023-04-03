import Constants from './Constants';
import Matter from 'matter-js';

function randomPosOnXAxis() {
  return Math.floor(Math.random() * Constants.GRID_WIDE);
}

function randomPosOnYAxis() {
  return Math.floor(Math.random() * Constants.GRID_TALL);
}

// function calculatePosition(body, xChange, yChange) {
//   return {
//     x: body.position.x + xChange,
//     y: body.position.y + yChange,
//   };
// }
let xChange = Constants.CELL_SIZE;
let yChange = 0;
function calculatePosition(body) {
  return {
    x: body.position.x + xChange,
    y: body.position.y + yChange,
  };
}

// let changePosition = {
//   x: 25 + Constants.CELL_SIZE,
//   y: Constants.MAX_HEIGHT - 25 - Constants.CELL_SIZE,
// };

const GameLoop = (entities, { touches, dispatch, time, events }) => {
  let engine = entities.physics.engine;
  let head = entities.head;
  let food = entities.food;
  let tail = entities.tail;

  touches
    .filter((t) => t.type === 'move')
    .forEach((t) => {
      if (Math.abs(t.delta.pageY) > Math.abs(t.delta.pageX)) {
        // Vertical scroll
        if (t.delta.pageY > 0 && yChange === 0) {
          xChange = 0;
          yChange = Constants.CELL_SIZE;
        } else if (yChange === 0) {
          xChange = 0;
          yChange = -Constants.CELL_SIZE;
        }
      } else {
        // Horizontal scroll
        if (t.delta.pageX > 0 && xChange === 0) {
          xChange = Constants.CELL_SIZE;
          yChange = 0;
        } else if (xChange === 0) {
          xChange = -Constants.CELL_SIZE;
          yChange = 0;
        }
      }
    });

  head.nextMove -= 1;
  if (head.nextMove === 0) {
    Matter.Body.setPosition(head.body, calculatePosition(head.body));
    head.nextMove = head.updateFrequency;

    if (
      head.body.position.x + head.xspeed < 0 ||
      head.body.position.x + head.xspeed >= Constants.GRID_WIDE ||
      head.body.position.y + head.yspeed < 0 ||
      head.body.position.y + head.yspeed >= Constants.GRID_TALL
    ) {
      // console.log(Constants.MAX_HEIGHT, Constants.GRID_TALL);
      // dispatch({ type: 'game-over' });
    } else {
      if (
        `${head.body.position.x},${head.body.position.y}` ===
        `${food.body.position.x},${food.body.position.y}`
      ) {
        // console.log(head);
        // console.log(food);
        // food.body.position.x = randomPosOnXAxis();
        // food.body.position.y = randomPosOnYAxis();
        // tail.elements.push([head.position[0], head.position[1]]);
      }
      for (let i = tail.elements.length - 1; i > -1; i--) {
        if (i === 0) {
          tail.elements[i][0] = head.position[0];
          tail.elements[i][1] = head.position[1];
        } else {
          tail.elements[i][0] = tail.elements[i - 1][0];
          tail.elements[i][1] = tail.elements[i - 1][1];
        }
      }
      // head.body.position.x += head.xspeed;
      // head.body.position.y += head.yspeed;
    }
  }
  Matter.Engine.update(engine, time.delta);
  return entities;
};

export default GameLoop;
