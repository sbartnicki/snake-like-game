import { View } from 'react-native';

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
              backgroundColor: 'lightgreen',
              borderColor: 'green',
              borderWidth: 1,
              position: 'absolute',
              top: elem[1] - props.size / 2,
              left: elem[0] - props.size / 2,
            }}
          ></View>
        );
      })}
    </>
  );
};

export default Tail;
