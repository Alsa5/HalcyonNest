import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E3F2FD" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.heading}>HalcyonNest</Text>
        <Text style={styles.subheading}>
          Empowering mental well-being with innovative solutions.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Activities')}>
          <Text style={styles.buttonText}>Gamified Activities</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MentalHealthAssessment')}>
          <Text style={styles.buttonText}>Mental Health Assessment</Text>
        </TouchableOpacity>
        {/*}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DASS-42')}>
          <Text style={styles.buttonText}>DASS Assessment</Text>
        </TouchableOpacity>
        */}

       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MoodJournal')}>
          <Text style={styles.buttonText}>Haven Nest</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatbotScreen')}>
          <Text style={styles.buttonText}>HALO-BOT</Text>
        </TouchableOpacity>

      </ScrollView>
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
  scrollView: {
    alignItems: 'center',
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

export default HomeScreen;
