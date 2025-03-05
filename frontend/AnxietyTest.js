import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles/styles";

const anxietyQuestions = [
  "I was aware of dryness in my mouth.",
  "I experienced breathing difficulty.",
  "I found it difficult to relax.",
  "I worried about situations where I might panic and make a fool of myself.",
  "I felt I was close to panic.",
  "I was aware of the action of my heart in the absence of physical exertion.",
  "I felt scared without any good reason.",
  "I felt that I was using a lot of nervous energy.",
  "I found myself getting agitated.",
  "I was aware of my heart racing.",
  "I felt I was close to losing control.",
  "I was worried about situations I couldn't control."
];

const options = [
  { label: "Did not apply to me at all", value: 1 },
  { label: "Applied to me to some degree", value: 2 },
  { label: "Applied to me to a considerable degree", value: 3 },
  { label: "Applied to me very much", value: 4 }
];

const AnxietyTest = ({ route }) => {
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
    navigation.navigate("StressTest", { responses: [...previousResponses, ...responses] });
  };

  return (
    <ScrollView style={styles.container}>
      {anxietyQuestions.map((question, index) => (
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

export default AnxietyTest;
