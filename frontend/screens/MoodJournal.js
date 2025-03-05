import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ScrollView, Platform 
} from "react-native";

const MoodJournal = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [thoughts, setThoughts] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSubmit = () => {
    if (selectedMood && thoughts.trim() !== "") {
      setEntries([{ mood: selectedMood, thoughts, timestamp: new Date().toLocaleString() }, ...entries]);
      setSelectedMood(null);
      setThoughts("");
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <div style={styles.webScrollContainer}> {/* ✅ Force Scroll for Web */}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Haven Nest Mood Journal</Text>
              <View style={styles.card}>
                <Text style={styles.subtitle}>How are you feeling today?</Text>
                <View style={styles.moodContainer}>
                  {["😊", "😢", "😡", "😌", "🤔"].map((emoji, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.moodButton,
                        selectedMood === emoji && styles.selectedMood
                      ]}
                      onPress={() => setSelectedMood(emoji)}
                    >
                      <Text style={styles.moodText}>{emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.card}>
                <Text style={styles.subtitle}>Write your thoughts here:</Text>
                <TextInput
                  style={styles.input}
                  multiline
                  placeholder="Express your thoughts..."
                  placeholderTextColor="#A9A9A9"
                  value={thoughts}
                  onChangeText={setThoughts}
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>

              {entries.length > 0 && (
                <View style={styles.card}>
                  <Text style={styles.subtitle}>Previous Entries</Text>
                  {entries.map((entry, index) => (
                    <View key={index} style={styles.entry}>
                      <Text style={styles.entryMood}>{entry.mood}</Text>
                      <Text style={styles.entryThoughts}>{entry.thoughts}</Text>
                      <Text style={styles.entryTime}>{entry.timestamp}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        </div>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Haven Nest Mood Journal</Text>
            <View style={styles.card}>
              <Text style={styles.subtitle}>How are you feeling today?</Text>
              <View style={styles.moodContainer}>
                {["😊", "😢", "😡", "😌", "🤔"].map((emoji, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[
                      styles.moodButton,
                      selectedMood === emoji && styles.selectedMood
                    ]}
                    onPress={() => setSelectedMood(emoji)}
                  >
                    <Text style={styles.moodText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.subtitle}>Write your thoughts here:</Text>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Express your thoughts..."
                placeholderTextColor="#A9A9A9"
                value={thoughts}
                onChangeText={setThoughts}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            {entries.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.subtitle}>Previous Entries</Text>
                {entries.map((entry, index) => (
                  <View key={index} style={styles.entry}>
                    <Text style={styles.entryMood}>{entry.mood}</Text>
                    <Text style={styles.entryThoughts}>{entry.thoughts}</Text>
                    <Text style={styles.entryTime}>{entry.timestamp}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A7BD5",
  },
  webScrollContainer: { 
    height: "100vh", 
    overflowY: "auto", /* ✅ Forces Scroll on Web */ 
    display: "flex",
    flexDirection: "column",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  innerContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A7BD5",
    marginBottom: 10,
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  moodButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
  },
  selectedMood: {
    backgroundColor: "#3A7BD5",
  },
  moodText: {
    fontSize: 30,
  },
  input: {
    height: 100,
    borderColor: "#3A7BD5",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#004080",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  entry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  entryMood: {
    fontSize: 24,
    marginBottom: 5,
  },
  entryThoughts: {
    fontSize: 16,
    color: "#333",
  },
  entryTime: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
});

export default MoodJournal;