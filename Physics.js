import Constants from './Constants';
import Matter from 'matter-js';

let nextMove = 10;
let updateFrequency = 15;
let tick = 0;
let pose = 1;

const GameLoop = (entities, { touches, dispatch, time, events }) => {
  let engine = entities.physics.engine;
  let head = entities.head;
  let food = entities.food;
  let tail = entities.tail;
  let moon = entities.moon;

  touches
    .filter((t) => t.type === 'move')
    .forEach((t) => {
      if (Math.abs(t.delta.pageY) > Math.abs(t.delta.pageX)) {
        // Vertical scroll
        if (t.delta.pageY > 0 && head.move.y === 0) {
          head.rotation = 180;
          head.move = { x: 0, y: Constants.CELL_SIZE };
        } else if (head.move.y === 0) {
          head.rotation = 0;
          head.move = { x: 0, y: -Constants.CELL_SIZE };
        }
      } else {
        // Horizontal scroll
        if (t.delta.pageX > 0 && head.move.x === 0) {
          head.rotation = 90;
          head.move = { x: Constants.CELL_SIZE, y: 0 };
        } else if (head.move.x === 0) {
          head.rotation = -90;
          head.move = { x: -Constants.CELL_SIZE, y: 0 };
        }
      }
    });

  events
    .filter((e) => e.type === 'started')
    .forEach((e) => {
      Matter.Body.setVelocity(entities.moon.body, { x: 2.5, y: 2.5 });
    });

  //Moving the snake based on provided directions
  nextMove -= 1;
  if (nextMove === 0) {
    Matter.Body.setPosition(
      head.body,
      calculatePosition(head.body, head.move.x, head.move.y)
    );
    nextMove = updateFrequency;

    // Scoring and growing the tail
    let ate = Matter.Collision.collides(head.body, food.body);
    if (ate && ate.depth > 1) {
      tail.elements.push([head.body.position.x, head.body.position.y]);

      Matter.Body.setPosition(food.body, {
        x: randomPosOnXAxis(),
        y: randomPosOnYAxis(),
      });

      dispatch({ type: 'score' });
    }

    for (let i = tail.elements.length - 1; i > -1; i--) {
      if (i === 0) {
        tail.elements[i][0] = head.body.position.x - head.move.x;
        tail.elements[i][1] = head.body.position.y - head.move.y;
      } else {
        tail.elements[i][0] = tail.elements[i - 1][0];
        tail.elements[i][1] = tail.elements[i - 1][1];
      }
    }
  }

  // Animating food bird
  tick++;
  if (tick % 10 === 0) {
    pose++;
    if (pose > 8) {
      pose = 1;
    }
    food.pose = pose;
  }
  // Changing frame of the circle/moon
  if (tick % 3 === 0) {
    moon.frame++;
    if (moon.frame === 8) {
      moon.frame = 1;
    }
  }

  let moonCollision = Matter.Collision.collides(head.body, entities.moon.body);
  if (moonCollision) {
    dispatch({ type: 'game-over' });
  }

  let col = Matter.Collision.collides(head.body, entities.wallRight.body);
  if (col && col.depth > 1) {
    dispatch({ type: 'game-over' });
  }
  col = Matter.Collision.collides(head.body, entities.wallLeft.body);
  if (col && col.depth > 1) {
    dispatch({ type: 'game-over' });
  }
  col = Matter.Collision.collides(head.body, entities.wallTop.body);
  if (col && col.depth > 1) {
    dispatch({ type: 'game-over' });
  }
  col = Matter.Collision.collides(head.body, entities.wallBottom.body);
  if (col && col.depth > 1) {
    dispatch({ type: 'game-over' });
  }

  Matter.Engine.update(engine, time.delta);
  return entities;
};

function randomPosOnXAxis() {
  return (
    Math.floor(
      Math.random() *
        (Constants.MAX_WIDTH - Constants.WALL_SIZE * 2 - Constants.CELL_SIZE)
    ) + Constants.WALL_SIZE
  );
}

function randomPosOnYAxis() {
  return (
    Math.floor(
      Math.random() *
        (Constants.MAX_HEIGHT -
          Constants.WALL_SIZE -
          Constants.TOP_BOUNDRY -
          Constants.CELL_SIZE / 2)
    ) + Constants.TOP_BOUNDRY
  );
}

function calculatePosition(body, xChange, yChange) {
  return {
    x: body.position.x + xChange,
    y: body.position.y + yChange,
  };
}

export default GameLoop;
