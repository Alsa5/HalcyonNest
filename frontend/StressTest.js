import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./styles/styles";

const stressQuestions = [
  "I found it hard to wind down.",
  "I was intolerant of anything that kept me from getting on with what I was doing.",
  "I felt that I was rather touchy.",
  "I felt that I was using a lot of nervous energy.",
  "I found myself getting agitated.",
  "I found it difficult to relax.",
  "I was in a state of nervous tension.",
  "I tended to over-react to situations.",
  "I found it difficult to tolerate interruptions to what I was doing.",
  "I was rather touchy or easily upset.",
  "I found myself becoming impatient.",
  "I felt I was under a lot of pressure.",
  "I found it hard to calm down after becoming upset.",
  "I felt I was emotionally over-reacting to situations."
];

const options = [
  { label: "Did not apply to me at all", value: 1 },
  { label: "Applied to me to some degree", value: 2 },
  { label: "Applied to me to a considerable degree", value: 3 },
  { label: "Applied to me very much", value: 4 }
];

const StressTest = ({ route }) => {
  const navigation = useNavigation();
  const [responses, setResponses] = useState(Array(14).fill(null));
  const allResponses = route.params?.responses || [];

  const handleSelect = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    if (responses.includes(null)) {
      alert("Please answer all questions.");
      return;
    }
    const finalResponses = [...allResponses, ...responses];

    try {
    const response = await axios.post("http://192.168.0.3:5001/predict", { responses: finalResponses });

    // Extract prediction results
    const { depression, anxiety, stress } = response.data;

    // Generate a user-friendly message
    const resultMessage = `Your Results:
    Depression Level: ${depression}
    Anxiety Level: ${anxiety}
    Stress Level: ${stress}`;

    Alert.alert("DASS-21 Assessment Results", resultMessage);
  } catch (error) {
    Alert.alert("Error", "Failed to get prediction. Please try again later.");
  }
  };

  return (
    <ScrollView style={styles.container}>
      {stressQuestions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                responses[index] === option.value && styles.selectedOption
              ]}
              onPress={() => handleSelect(index, option.value)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StressTest;
