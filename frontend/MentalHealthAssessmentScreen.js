import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

const MentalHealthAssessmentScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Mental Health Assessment</Text>
      <Text style={styles.subheading}>Choose a test to begin.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DepressionTest')}
      >
        <Text style={styles.buttonText}>Depression Test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AnxietyTest')}
      >
        <Text style={styles.buttonText}>Anxiety Test</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StressTest')}
      >
        <Text style={styles.buttonText}>Stress Test</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

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
  subheading: {
    fontSize: 18,
    color: '#00509E',
    marginBottom: 30,
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

export default MentalHealthAssessmentScreen;
