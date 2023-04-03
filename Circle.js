import { View } from 'react-native';
import Constants from './Constants';

const Circle = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const { x, y } = props.body.position;

  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: 15,
        backgroundColor: 'yellow',
        position: 'absolute',
        top: y * height + Constants.TOP_BOUNDRY,
        left: x * width + 25,
      }}
    ></View>
  );
};

export default Circle;
