import { Dimensions } from 'react-native';

let gridSize = 15;
let cellSize = (Dimensions.get('window').width - 50) / gridSize; // I want 20 moves to the right
let tallCapacity = Math.floor(
  (Dimensions.get('window').height - 50) / cellSize
);
let remainder = (Dimensions.get('window').height - 50) % cellSize;

export default Constants = {
  MAX_WIDTH: Dimensions.get('window').width,
  MAX_HEIGHT: Dimensions.get('window').height,
  CELL_SIZE: cellSize,
  GRID_WIDE: gridSize,
  GRID_TALL: tallCapacity,
  TOP_BOUNDRY: 25 + remainder,
};
