import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ResultScreen({ route, navigation }) {
  const { result } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Results</Text>
      <Text style={styles.resultText}>Depression: {result.Depression}</Text>
      <Text style={styles.resultText}>Stress: {result.Stress}</Text>
      <Text style={styles.resultText}>Anxiety: {result.Anxiety}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Retake Test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#f8f9fa" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  resultText: { fontSize: 18, marginVertical: 5 },
  button: { marginTop: 20, padding: 15, backgroundColor: "#007bff", borderRadius: 8 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
