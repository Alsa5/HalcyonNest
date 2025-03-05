import React, { useState, useCallback } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const dassQuestions = [
  { id: 1, text: "I found myself getting upset by quite trivial things." },
  { id: 2, text: "I was aware of dryness of my mouth." },
  { id: 3, text: "I couldn't seem to experience any positive feeling at all." },
  { id: 4, text: "I experienced breathing difficulty (e.g., excessively rapid breathing, breathlessness)." },
  { id: 5, text: "I just couldn't seem to get going." },
  { id: 6, text: "I tended to over-react to situations." },
  { id: 7, text: "I had a feeling of shakiness (e.g., legs going to give way)." },
  { id: 8, text: "I found it difficult to relax." },
  { id: 9, text: "I found myself in situations that made me so anxious I was most relieved when they ended." },
  { id: 10, text: "I felt that I had nothing to look forward to." },
  { id: 11, text: "I found myself getting upset rather easily." },
  { id: 12, text: "I felt that I was using a lot of nervous energy." },
  { id: 13, text: "I felt sad and depressed." },
  { id: 14, text: "I found myself getting impatient when I was delayed in any way." },
  { id: 15, text: "I had a feeling of faintness." },
  { id: 16, text: "I felt that I had lost interest in just about everything." },
  { id: 17, text: "I felt I wasn't worth much as a person." },
  { id: 18, text: "I felt that I was rather touchy." },
  { id: 19, text: "I perspired noticeably in the absence of high temperatures or physical exertion." },
  { id: 20, text: "I felt scared without any good reason." },
  { id: 21, text: "I felt that life wasn't worthwhile." },
  { id: 22, text: "I found it hard to wind down." },
  { id: 23, text: "I had difficulty in swallowing." },
  { id: 24, text: "I couldn't seem to get any enjoyment out of the things I did." },
  { id: 25, text: "I was aware of the action of my heart in the absence of physical exertion." },
  { id: 26, text: "I felt down-hearted and blue." },
  { id: 27, text: "I found that I was very irritable." },
  { id: 28, text: "I felt I was close to panic." },
  { id: 29, text: "I found it hard to calm down after something upset me." },
  { id: 30, text: "I feared that I would be 'thrown' by some trivial but unfamiliar task." },
  { id: 31, text: "I was unable to become enthusiastic about anything." },
  { id: 32, text: "I found it difficult to tolerate interruptions." },
  { id: 33, text: "I was in a state of nervous tension." },
  { id: 34, text: "I felt I was pretty worthless." },
  { id: 35, text: "I was intolerant of anything that kept me from getting on with what I was doing." },
  { id: 36, text: "I felt terrified." },
  { id: 37, text: "I could see nothing in the future to be hopeful about." },
  { id: 38, text: "I felt that life was meaningless." }
];

const DassScreen = () => {
  const [responses, setResponses] = useState(Array(38).fill(null));

  // Handle user response
  const handleResponse = useCallback((index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  }, [responses]);

  // Submit user responses
  const submitResponses = async () => {
    if (responses.includes(null)) {
      Alert.alert("Incomplete", "Please answer all questions before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        "http://192.168.0.3:5001/predict", // Your original URL
        JSON.stringify({ responses }), // Convert to JSON string
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      Alert.alert(
        "Results",
        `Depression: ${res.data.depression}\nAnxiety: ${res.data.anxiety}\nStress: ${res.data.stress}`
      );
      console.log(
        "Results",
        `Depression: ${res.data.depression}\nAnxiety: ${res.data.anxiety}\nStress: ${res.data.stress}`
      );
    } catch (error) {
      console.error("API Error:", error?.response?.data || error.message);
      Alert.alert("Error", "Failed to get prediction. Check backend connection.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={dassQuestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={{ marginBottom: 15 }}>
            <Text>{item.text}</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              {[0, 1, 2, 3].map((value) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => handleResponse(index, value)}
                  style={{
                    padding: 10,
                    margin: 5,
                    backgroundColor: responses[index] === value ? "blue" : "lightgray",
                    borderRadius: 5
                  }}
                >
                  <Text style={{ color: "white" }}>{value}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
      <Button title="Submit" onPress={submitResponses} />
    </View>
  );
};

export default DassScreen;