import { View } from 'react-native';
import Constants from './Constants';

const Tail = (props) => {
  const elements = props.elements;

  return (
    <>
      {elements.map((elem, index) => {
        return (
          <View
            key={index}
            style={{
              width: props.size,
              height: props.size,
              backgroundColor: 'blue',
              position: 'absolute',
              top: elem[1] * props.size + Constants.TOP_BOUNDRY,
              left: elem[0] * props.size + 25, // 25 is boundry size
            }}
          ></View>
        );
      })}
    </>
  );
};

export default Tail;
