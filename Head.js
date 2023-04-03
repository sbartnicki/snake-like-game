import { View } from 'react-native';

const Head = (props) => {
  const width = props.body.bounds.max.x - props.body.bounds.min.x;
  const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const { x, y } = props.body.position;

  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: 'red',
        position: 'absolute',
        left: x,
        top: y,
      }}
    ></View>
  );
};

export default Head;
