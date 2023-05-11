import { Dimensions } from 'react-native';

let wallSize = 30;
let gridSize = 10; // How many columns/steps to the right
let cellSize = (Dimensions.get('window').width - wallSize * 2) / gridSize;
let tallCapacity = Math.floor(
  (Dimensions.get('window').height - wallSize * 2) / cellSize
);
let remainder = (Dimensions.get('window').height - wallSize * 2) % cellSize;

export default Constants = {
  MAX_WIDTH: Dimensions.get('window').width,
  MAX_HEIGHT: Dimensions.get('window').height,
  CELL_SIZE: cellSize,
  GRID_WIDE: gridSize,
  GRID_TALL: tallCapacity,
  TOP_BOUNDRY: wallSize + remainder,
  WALL_SIZE: wallSize,
};
