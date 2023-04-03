import Matter from 'matter-js';
import Head from '../Head';
import Food from '../Food';
import Tail from '../Tail';
import Wall from '../Wall';
import Circle from '../Circle';
import Constants from '../Constants';

function randomPosOnXAxis() {
  return Math.floor(Math.random() * Constants.MAX_WIDTH);
}

function randomPosOnYAxis() {
  return Math.floor(Math.random() * Constants.MAX_HEIGHT);
}

function setupWorld() {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.0;

  let food = Matter.Bodies.rectangle(
    randomPosOnXAxis(),
    randomPosOnYAxis(),
    Constants.CELL_SIZE,
    Constants.CELL_SIZE,
    { isStatic: false, label: 'food' }
  );
  console.log(Constants.MAX_HEIGHT);
  let head = Matter.Bodies.rectangle(
    25,
    Constants.MAX_HEIGHT - 25 - Constants.CELL_SIZE,
    Constants.CELL_SIZE,
    Constants.CELL_SIZE,
    { label: 'head', isStatic: false }
  );

  let circle = Matter.Bodies.circle(240, 100, 20, { label: 'circle' });

  let wallTop = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.TOP_BOUNDRY / 2,
    Constants.MAX_WIDTH,
    Constants.TOP_BOUNDRY,
    { isStatic: true }
  );

  let wallBottom = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT - 12.5,
    Constants.MAX_WIDTH,
    25,
    { isStatic: true }
  );
  let wallLeft = Matter.Bodies.rectangle(
    12.5,
    Constants.MAX_HEIGHT / 2,
    25,
    Constants.MAX_HEIGHT,
    { isStatic: true }
  );

  let wallRight = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH - 12.5,
    Constants.MAX_HEIGHT / 2,
    25,
    Constants.MAX_HEIGHT,
    { isStatic: true, label: 'right' }
  );

  Matter.World.add(world, [
    food,
    head,
    circle,
    wallTop,
    wallBottom,
    wallLeft,
    wallRight,
  ]);

  Matter.Events.on(engine, 'collisionStart', (event) => {
    let pairs = event.pairs;
    console.log('collision detected');
    // engine.dispatch({ type: 'game-over' });
  });

  onEvent = (e) => {
    if (e.type === 'game-over') {
      setRunning(false);
    }
  };

  return {
    physics: { engine, world },
    head: {
      body: head,
      position: [0, 0],
      size: Constants.CELL_SIZE,
      xspeed: 1,
      yspeed: 0,
      updateFrequency: 15,
      nextMove: 10,
      renderer: Head,
    },
    food: {
      body: food,
      position: [randomPosOnXAxis(), randomPosOnYAxis()],
      size: Constants.CELL_SIZE,
      renderer: Food,
    },
    tail: { size: Constants.CELL_SIZE, elements: [], renderer: <Tail /> },
    circle: {
      body: circle,
      renderer: Circle,
    },
    wallTop: {
      body: wallTop,
      renderer: Wall,
    },
    wallBottom: {
      body: wallBottom,
      renderer: Wall,
    },
    wallLeft: {
      body: wallLeft,
      renderer: Wall,
    },
    wallRight: {
      body: wallRight,
      renderer: Wall,
    },
  };
}

export default setupWorld;
