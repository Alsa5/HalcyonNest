import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/styles"; // Ensure this file exists

const depressionQuestions = [
  "I couldn't seem to experience any positive feeling at all.",
  "I found it difficult to work up the initiative to do things.",
  "I felt that I had nothing to look forward to.",
  "I felt down-hearted and blue.",
  "I was unable to become enthusiastic about anything.",
  "I felt I wasn't worth much as a person.",
  "I felt that life was meaningless.",
  "I couldn’t seem to experience any positive feeling at all.",
  "I found myself getting agitated.",
  "I found it difficult to relax.",
  "I felt sad and depressed.",
  "I felt like I was going nowhere in life."
];

const options = [
  { label: "Did not apply to me at all", value: 1 },
  { label: "Applied to me to some degree", value: 2 },
  { label: "Applied to me to a considerable degree", value: 3 },
  { label: "Applied to me very much", value: 4 }
];

const DepressionTest = ({ route }) => {
  const navigation = useNavigation();
  const [responses, setResponses] = useState(Array(12).fill(null));
  const previousResponses = route.params?.responses || [];

  const handleSelect = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    if (responses.includes(null)) {
      alert("Please answer all questions.");
      return;
    }
    navigation.navigate("AnxietyTest", { responses: [...previousResponses, ...responses] });
  };

  return (
    <ScrollView style={styles.container}>
      {depressionQuestions.map((question, index) => (
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
        <Text style={styles.submitButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DepressionTest;

