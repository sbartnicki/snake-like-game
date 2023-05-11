import { StyleSheet, Modal, View, Text, Pressable } from 'react-native';

const WelcomeScreen = ({ visible, run }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalView}>
        <Text style={[styles.modalText, { fontWeight: '700' }]}>WELCOME</Text>
        <Text style={styles.modalText}>Let's play</Text>
        <Pressable onPress={run}>
          {({ pressed }) => (
            <Text
              style={[
                {
                  backgroundColor: pressed
                    ? 'black'
                    : 'rgba(122, 162, 40, 0.8)',
                },
                styles.modalButton,
              ]}
            >
              PLAY
            </Text>
          )}
        </Pressable>
      </View>
    </Modal>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    height: Constants.MAX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 33, 88, 0.8)',
  },
  modalText: {
    fontSize: 40,
    color: 'white',
  },
  modalButton: {
    color: 'white',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
});
