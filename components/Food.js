import { Animated } from 'react-native';
import Images from '../assets/Images';

const Food = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  let image = Images['bird' + props.pose];

  return (
    <Animated.Image
      style={{
        width: width,
        height: height,
        position: 'absolute',
        top: y,
        left: x,
      }}
      source={image}
    />
  );
};

export default Food;
