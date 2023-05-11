import { Image } from 'react-native';
import Images from '../assets/Images';

const Head = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  let image = Images['head'];

  return (
    <Image
      style={{
        width: width,
        height: height,
        backgroundColor: 'red',
        position: 'absolute',
        top: y,
        left: x,
        transform: [{ rotate: `${props.rotation}deg` }],
      }}
      source={image}
    ></Image>
  );
};

export default Head;
