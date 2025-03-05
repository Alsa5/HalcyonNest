import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MotivAuraGame from './MotivAuraGame'; 
import BalloonPopGame from './BalloonPopGame';
import HomeScreen from './screens/HomeScreen'; // ✅ Import from new file
import ActivitiesScreen from './screens/ActivitiesScreen'; // ✅ Import from new file
import SignupScreen from "./screens/Signup";
import LoginScreen from "./screens/login";
import DassScreen from "./screens/DassScreen";
import BreathingExercise from './BreathingExercise';
import MentalHealthAssessmentScreen from './MentalHealthAssessmentScreen';
import DepressionTest from './DepressionTest';
import AnxietyTest from './AnxietyTest';
import StressTest from './StressTest';
import ChatbotScreen from './ChatbotScreen';
import MoodJournal from "./screens/MoodJournal";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MoodJournal" component={MoodJournal} />
        <Stack.Screen name="Activities" component={ActivitiesScreen} />
        <Stack.Screen name="MotivAuraGame" component={MotivAuraGame} />
        <Stack.Screen name="BalloonPopGame" component={BalloonPopGame} />
        <Stack.Screen name="BreathingExercise" component={BreathingExercise} />
        <Stack.Screen name="MentalHealthAssessment" component={MentalHealthAssessmentScreen}/>
        <Stack.Screen name="DepressionTest" component={DepressionTest} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="AnxietyTest" component={AnxietyTest} />
        <Stack.Screen name="StressTest" component={StressTest} />
        <Stack.Screen name="DASS-42" component={DassScreen} />
        <Stack.Screen name="ChatbotScreen" component={ChatbotScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
