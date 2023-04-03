import { View } from 'react-native';
import Constants from './Constants';

const Wall = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: 'rgba(91, 40, 162, 1)',
        position: 'absolute',
        top: y,
        left: x,
      }}
    ></View>
  );
};

export default Wall;
