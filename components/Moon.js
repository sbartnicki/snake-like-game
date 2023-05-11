import { Image } from 'react-native';
import MoonFrames from '../assets/Moon';

const Moon = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <Image
      style={{
        width: width,
        height: height,
        borderRadius: width / 2,
        backgroundColor: 'grey',
        position: 'absolute',
        top: y,
        left: x,
      }}
      source={MoonFrames[props.frame]}
    />
  );
};

export default Moon;
