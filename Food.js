import { View } from 'react-native';
import Constants from './Constants';

const Food = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const { x, y } = props.body.position;

  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: 'green',
        position: 'absolute',
        top: y,
        left: x,
      }}
    ></View>
  );
};

export default Food;
