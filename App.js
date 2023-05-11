import { StyleSheet, Text, View, Image } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Physics from './Physics';
import { useState } from 'react';
import entities from './entities';
import RestartScreen from './views/RestartScreen';
import WelcomeScreen from './views/WelcomeScreen';

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [running, setRunning] = useState(false);
  const [restartVisible, setRestartVisible] = useState(false);
  const [startVisible, setStartVisible] = useState(true);
  const [score, setScore] = useState(0);

  const eventHandler = (e) => {
    if (e.type === 'game-over') {
      setRestartVisible(true);
      setRunning(false);
    }
    if (e.type === 'score') {
      setScore(score + 1);
    }
  };

  const restartHandler = () => {
    gameEngine.swap(entities());
    setScore(0);
    setRestartVisible(false);
    setStartVisible(false);
    setRunning(true);
  };

  return (
    <View style={styles.container}>
      {running && <Text style={styles.score}>{score}</Text>}
      <Image
        source={Images.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        entities={entities()}
        systems={[Physics]}
        onEvent={eventHandler}
        running={running}
        style={styles.gameContainer}
      />
      <WelcomeScreen visible={startVisible} run={restartHandler} />
      <RestartScreen
        visible={restartVisible}
        score={score}
        restartHandler={restartHandler}
      />
      <Text style={styles.watermark}>Final Project s_bartnicki</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gameContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  score: {
    position: 'absolute',
    top: 5,
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    zIndex: 1,
  },
  watermark: {
    fontStyle: 'italic',
    fontWeight: '700',
    fontSize: 18,
    color: 'white',
  },
});
