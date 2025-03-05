import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const ActivitiesScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Gamified Activities</Text>

    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MotivAuraGame')}>
      <Text style={styles.buttonText}>MotivAura</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BalloonPopGame')}>
      <Text style={styles.buttonText}>Pop It!</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BreathingExercise')}>
      <Text style={styles.buttonText}>Relax Bro</Text>
    </TouchableOpacity>
    
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#002B5B',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00509E',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ActivitiesScreen;
