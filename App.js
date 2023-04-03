import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import Head from './Head';
import Food from './Food';
import Tail from './Tail';
import Wall from './Wall';
import GameLoop from './GameLoop';
import { useState } from 'react';
import entities from './entities';
import Matter from 'matter-js';

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [running, setRunning] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const eventHandler = (e) => {
    if (e.type === 'game-over') {
      console.log('called event Handler');
      setModalVisible(true);
      setRunning(false);
    }
  };

  const restartHandler = () => {
    gameEngine.swap(entities());
    setModalVisible(false);
    setRunning(true);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        style={{
          // width: Constants.MAX_WIDTH,
          // height: Constants.MAX_HEIGHT,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,
          backgroundColor: 'white',
        }}
        entities={entities()}
        systems={[GameLoop]}
        onEvent={eventHandler}
        running={running}
      />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>GAME OVER</Text>
          <Pressable onPress={restartHandler}>
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
                Restart
              </Text>
            )}
          </Pressable>
        </View>
      </Modal>
      {/* <View style={styles.controls}>
        <View style={styles.controlRow}>
          <Pressable
            onPress={() => {
              engine.dispatch({ type: 'move-up' });
            }}
          >
            <View style={styles.control} />
          </Pressable>
        </View>
        <View style={styles.controlRow}>
          <Pressable
            onPress={() => {
              engine.dispatch({ type: 'move-left' });
            }}
          >
            <View style={styles.control} />
          </Pressable>
          <View style={[styles.control, { backgroundColor: null }]} />
          <Pressable
            onPress={() => {
              engine.dispatch({ type: 'move-right' });
            }}
          >
            <View style={styles.control} />
          </Pressable>
        </View>
        <View style={styles.controlRow}>
          <Pressable
            onPress={() => {
              engine.dispatch({ type: 'move-down' });
            }}
          >
            <View style={styles.control} />
          </Pressable>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: 'column',
  },
  controlRow: {
    width: 300,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  modalView: {
    flex: 1,
    top: 0,
    height: Constants.MAX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(91, 40, 162, 0.8)',
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
