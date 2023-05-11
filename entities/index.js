import Matter from 'matter-js';
import Head from '../components/Head';
import Food from '../components/Food';
import Tail from '../components/Tail';
import Wall from '../components/Wall';
import Moon from '../components/Moon';
import Constants from '../Constants';

function setupWorld() {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0.0;

  // Food object that snake will eat (bird)
  let food = Matter.Bodies.rectangle(
    randomPosOnXAxis(),
    randomPosOnYAxis(),
    Constants.CELL_SIZE,
    Constants.CELL_SIZE,
    {
      isStatic: false,
      label: 'food',
      collisionFilter: {
        category: 0b0010,
        mask: 0b0001,
      },
    }
  );
  // Head of the snake
  let head = Matter.Bodies.rectangle(
    30 + Constants.CELL_SIZE / 2,
    Constants.MAX_HEIGHT - 30 - Constants.CELL_SIZE / 2,
    Constants.CELL_SIZE,
    Constants.CELL_SIZE,
    {
      label: 'head',
      isStatic: false,
      collisionFilter: {
        category: 0b0001,
        mask: 0b0011,
      },
    }
  );
  // Moon enemy, hit it you die
  let moon = Matter.Bodies.circle(240, 100, 20, {
    label: 'moon',
    isStatic: false,
    frictionAir: 0,
    friction: 0,
    restitution: 1.03,
    frictionStatic: 0,
    collisionFilter: {
      category: 0b0001,
      mask: 0b0001,
    },
  });

  let wallTop = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.TOP_BOUNDRY / 2,
    Constants.MAX_WIDTH,
    Constants.TOP_BOUNDRY,
    {
      isStatic: true,
      label: 'top',
      collisionFilter: {
        category: 0b0001,
        mask: 0b0001,
      },
    }
  );

  let wallBottom = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH / 2,
    Constants.MAX_HEIGHT - 15,
    Constants.MAX_WIDTH,
    30,
    {
      isStatic: true,
      label: 'bottom',
      collisionFilter: {
        category: 0b0001,
        mask: 0b0001,
      },
    }
  );
  let wallLeft = Matter.Bodies.rectangle(
    15,
    (Constants.MAX_HEIGHT - Constants.WALL_SIZE - Constants.TOP_BOUNDRY) / 2 +
      Constants.TOP_BOUNDRY,
    30,
    Constants.MAX_HEIGHT - Constants.WALL_SIZE - Constants.TOP_BOUNDRY,
    {
      isStatic: true,
      label: 'left',
      collisionFilter: {
        category: 0b0001,
        mask: 0b0001,
      },
    }
  );

  let wallRight = Matter.Bodies.rectangle(
    Constants.MAX_WIDTH - 15,
    (Constants.MAX_HEIGHT - Constants.WALL_SIZE - Constants.TOP_BOUNDRY) / 2 +
      Constants.TOP_BOUNDRY,
    30,
    Constants.MAX_HEIGHT - Constants.WALL_SIZE - Constants.TOP_BOUNDRY,
    {
      isStatic: true,
      label: 'right',
      collisionFilter: {
        category: 0b0001,
        mask: 0b0001,
      },
    }
  );

  Matter.World.add(world, [
    wallLeft,
    wallTop,
    wallRight,
    wallBottom,
    food,
    head,
    moon,
  ]);

  return {
    physics: { engine, world },
    head: {
      body: head,
      move: { x: Constants.CELL_SIZE, y: 0 },
      rotation: 90,
      renderer: <Head />,
    },
    food: {
      body: food,
      pose: 1,
      renderer: <Food />,
    },
    tail: { size: Constants.CELL_SIZE, elements: [], renderer: <Tail /> },
    moon: {
      body: moon,
      frame: 1,
      renderer: <Moon />,
    },
    wallTop: {
      body: wallTop,
      label: 'top',
      renderer: <Wall />,
    },
    wallBottom: {
      body: wallBottom,
      renderer: <Wall />,
      label: 'bottom',
    },
    wallLeft: {
      body: wallLeft,
      renderer: <Wall />,
      label: 'left',
      column: true,
      left: true,
    },
    wallRight: {
      body: wallRight,
      renderer: <Wall />,
      label: 'right',
      column: true,
    },
  };
}

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
          Constants.CELL_SIZE)
    ) + Constants.TOP_BOUNDRY
  );
}

export default setupWorld;
