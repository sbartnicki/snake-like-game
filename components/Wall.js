import { View, Image } from 'react-native';
import Images from '../assets/Images';

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
        backgroundColor: 'rgba(74, 33, 88, 1)',
        position: 'absolute',
        top: y,
        left: x,
        overflow: 'hidden',
      }}
    >
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        source={
          props.label === 'left'
            ? Images.left
            : props.label === 'right'
            ? Images.right
            : props.label === 'top'
            ? Images.top
            : Images.bottom
        }
        resizeMode="repeat"
      />
    </View>
  );
};

export default Wall;
