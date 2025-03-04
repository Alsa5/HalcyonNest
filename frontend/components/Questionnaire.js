import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const questions = [
  "I found it hard to wind down.",
  "I was aware of dryness of my mouth.",
  "I couldn't seem to experience any positive feeling at all.",
  "I experienced breathing difficulty.",
  "I found it difficult to work up the initiative to do things.",
  "I tended to over-react to situations.",
  "I experienced trembling.",
  "I felt that I was using a lot of nervous energy.",
  "I was worried about situations in which I might panic.",
  "I felt that I had nothing to look forward to.",
  "I found myself getting agitated.",
  "I found it difficult to relax.",
  "I felt down-hearted and blue.",
  "I was intolerant of anything that kept me from getting on.",
  "I felt I was close to panic.",
  "I was unable to become enthusiastic about anything.",
  "I felt I wasn't worth much as a person.",
  "I felt that I was rather touchy.",
  "I was aware of the action of my heart in the absence of physical exertion.",
  "I felt scared without any good reason.",
  "I felt that life was meaningless.",
  "I found myself sweating in the absence of heat or physical exertion.",
  "I found it difficult to tolerate interruptions.",
  "I felt that I was in control of my emotions.",
  "I found it difficult to take the initiative.",
  "I tended to worry too much about things.",
  "I felt that I had no time to do everything I wanted.",
  "I felt that I had lost interest in just about everything.",
  "I felt I was incapable of dealing with problems.",
  "I felt I was losing control of myself.",
  "I felt that I was getting irritated easily.",
  "I felt I was unable to enjoy things I used to.",
  "I felt I was physically tense.",
  "I had difficulty sleeping due to thoughts racing in my head.",
  "I avoided situations where I might feel anxious.",
  "I felt emotionally exhausted.",
  "I found it hard to concentrate on tasks.",
  "I felt detached from people around me.",
  "I felt guilty about not being able to handle stress better.",
  "I experienced frequent headaches or stomach discomfort.",
  "I felt overwhelmed by everyday tasks.",
  "I felt overwhelmed by everyday tasks."
];

const options = [0, 1, 2, 3];

export default function Questionnaire({ responses, onSelect }) {
  return (
    <View>
      {questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{index + 1}. {question}</Text>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, responses[index] === option && styles.selectedOption]}
                onPress={() => onSelect(index, option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  questionContainer: { marginBottom: 15, padding: 10, backgroundColor: "#fff", borderRadius: 8 },
  questionText: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  optionsContainer: { flexDirection: "row", justifyContent: "space-between" },
  optionButton: { padding: 10, borderWidth: 1, borderColor: "#007bff", borderRadius: 5, width: 50, alignItems: "center" },
  selectedOption: { backgroundColor: "#007bff" },
  optionText: { fontSize: 16, fontWeight: "bold" },
});

