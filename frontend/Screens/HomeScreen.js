import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity,ScrollView, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Questionnaire from "../components/Questionnaire";

export default function HomeScreen({ navigation }) {
  const [responses, setResponses] = useState(Array(42).fill(null));

  const handleSelect = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    if (responses.includes(null)) {
      Alert.alert("Incomplete", "Please answer all questions before submitting.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });

      const result = await response.json();
      if (response.ok) {
        navigation.navigate("Result", { result });
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      Alert.alert("Connection Error", "Could not connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Questionnaire responses={responses} onSelect={handleSelect} />
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 8, alignItems: "center", marginVertical: 20 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
