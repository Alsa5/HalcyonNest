import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';


const Pop = () => {
  const [balloons, setBalloons] = useState([]);
  const [score, setScore] = useState(0);
  const [sound, setSound] = useState(null);
  const [gameOver, setGameOver] = useState(false); // Game over state
  const navigation = useNavigation();

  const maxScore = 10; // Define maximum score to end the game

  // Play pop sound
  const playPopSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
        require('./assets/pop.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  };

  // Function to spawn a new balloon
  const spawnBalloon = () => {
    if (gameOver) return; // Stop spawning balloons if the game is over

    const newBalloon = {
      id: Math.random().toString(),
      positionX: new Animated.Value(Math.random() * 350),
      positionY: new Animated.Value(-100),
      speed: Math.random() * 2 + 1,
      animation: new Animated.Value(0),
    };

    setBalloons((prevBalloons) => [...prevBalloons, newBalloon]);

    // Animate balloon to move downwards
    Animated.timing(newBalloon.positionY, {
      toValue: 600,
      duration: 20000 / newBalloon.speed,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    // Animation for balloon floating
    Animated.loop(
      Animated.sequence([
        Animated.timing(newBalloon.animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(newBalloon.animation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  // Function to handle popping balloon
  const popBalloon = (balloonId) => {
    if (gameOver) return;

    playPopSound();
    setScore((prevScore) => {
      const newScore = prevScore + 1;
      if (newScore >= maxScore) {
        setGameOver(true); // End the game when max score is reached
      }
      return newScore;
    });
    setBalloons((prevBalloons) => prevBalloons.filter((balloon) => balloon.id !== balloonId));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      spawnBalloon();
    }, 1500);

    if (gameOver) {
      clearInterval(interval); // Stop spawning balloons when the game is over
    }

    return () => clearInterval(interval);
  }, [gameOver]);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setBalloons([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balloon Pop Game</Text>
      <Text style={styles.score}>Score: {score}</Text>

      {gameOver && (
  <View style={styles.notificationOverlay}>
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>🎉 Yaayyyy! You got the maximum score! 🎉</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('Activities')}>
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}



      {!gameOver &&
        balloons.map((balloon) => (
          <Animated.View
            key={balloon.id}
            style={[
              styles.balloon,
              {
                transform: [
                  { translateX: balloon.positionX },
                  { translateY: balloon.positionY },
                  {
                    scale: balloon.animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.2],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity onPress={() => popBalloon(balloon.id)}>
              <Text style={styles.balloonEmoji}>🎈</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEFA',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure it overlays the game screen
  },
  notificationContainer: {
    width: '80%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  notificationText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  
  restartButton: {
    backgroundColor: '#32CD32', // Green color for Restart
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  
  restartButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  exitButton: {
    backgroundColor: '#FF4500', // Red color for Exit
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  
  exitButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },  
  
  balloon: {
    position: 'absolute',
  },
  balloonEmoji: {
    fontSize: 50,
  },
});

export default Pop;
