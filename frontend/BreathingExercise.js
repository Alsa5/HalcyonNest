import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const BreathingExercise = () => {
  const [duration, setDuration] = useState(10); // Default duration is 10 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const intervalRef = useRef(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/beep.mp3') // Ensure you have a beep sound in the assets folder
    );
    setSound(sound);
    await sound.playAsync();
  };

  const startExercise = () => {
    setIsRunning(true);
    setIsPaused(false);
    setTimeRemaining(duration);
    setBreathingPhase('Inhale');
    playSound();
    startTimer();
  };

  const pauseExercise = () => {
    clearInterval(intervalRef.current);
    setIsPaused(true);
  };

  const resumeExercise = () => {
    setIsPaused(false);
    startTimer();
  };

  const stopExercise = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setBreathingPhase('');
    setTimeRemaining(duration);
  };

  const restartExercise = () => {
    stopExercise();
    startExercise();
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          playSound();
          setBreathingPhase((prevPhase) => (prevPhase === 'Inhale' ? 'Exhale' : 'Inhale'));
          return duration;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Breathing Exercise</Text>

      <View style={styles.durationContainer}>
        <TouchableOpacity
          style={[styles.durationButton, duration === 10 && styles.selectedButton]}
          onPress={() => {
            setDuration(10);
            setTimeRemaining(10);
          }}
        >
          <Text style={styles.buttonText}>10 Secs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.durationButton, duration === 15 && styles.selectedButton]}
          onPress={() => {
            setDuration(15);
            setTimeRemaining(15);
          }}
        >
          <Text style={styles.buttonText}>15 Secs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.durationButton, duration === 20 && styles.selectedButton]}
          onPress={() => {
            setDuration(20);
            setTimeRemaining(20);
          }}
        >
          <Text style={styles.buttonText}>20 Secs</Text>
        </TouchableOpacity>
      </View>

      {isRunning && (
        <View style={styles.exerciseContainer}>
          <Text style={styles.phaseText}>{breathingPhase}</Text>
          <Text style={styles.timerText}>{timeRemaining}s</Text>
        </View>
      )}

      <View style={styles.controlsContainer}>
        {!isRunning && !isPaused && (
          <TouchableOpacity style={styles.controlButton} onPress={startExercise}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}

        {isRunning && !isPaused && (
          <TouchableOpacity style={styles.controlButton} onPress={pauseExercise}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}

        {isPaused && (
          <TouchableOpacity style={styles.controlButton} onPress={resumeExercise}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}

        {isRunning && (
          <TouchableOpacity style={styles.controlButton} onPress={stopExercise}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.controlButton} onPress={restartExercise}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00509E',
  },
  durationContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  durationButton: {
    backgroundColor: '#B3E5FC',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  selectedButton: {
    backgroundColor: '#0288D1',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  exerciseContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0288D1',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  controlsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  controlButton: {
    backgroundColor: '#0288D1',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    minWidth: 100,
    alignItems: 'center',
  },
});

export default BreathingExercise;
