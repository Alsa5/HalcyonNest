import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MotivAuraGame = () => {
  const [message, setMessage] = useState(null);
  const [rizzMessage, setRizzMessage] = useState(null);

  const handleEmojiClick = (emoji) => {
    let motivationMessage = "";
    let rizz = "";

    switch (emoji) {
      case "😊":
        motivationMessage = "You're amazing! Keep going!";
        rizz = "You have a heart of gold! ✨ You're glowing! 🌟";
        break;
      case "😄":
        motivationMessage = "Stay positive! You're doing great!";
        rizz = "Your smile can light up the room! 😊 Keep shining! 🌞";
        break;
      case "🥰":
        motivationMessage = "You're loved! Keep shining!";
        rizz = "Your kindness makes the world a better place! 💖";
        break;
      case "🤩":
        motivationMessage = "You're a star! Keep reaching higher!";
        rizz = "You’ve got the charm! Keep being awesome! ✨💫";
        break;
      case "😎":
        motivationMessage = "You're on fire! Keep up the awesome work!";
        rizz = "You're rocking it! 🔥 Keep slaying! 👑";
        break;
      case "😃":
        motivationMessage = "Keep it up! You're unstoppable!";
        rizz = "You're amazing inside and out! 💥 Keep the vibes high! 🙌";
        break;
      default:
        motivationMessage = "Great job! Keep smiling!";
        rizz = "You're unstoppable! 🌟 Let the good times roll! 🎉";
    }

    setMessage(motivationMessage);
    setRizzMessage(rizz);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tap an Emoji!</Text>

      <View style={styles.emojiContainer}>
        {["😊", "😄", "🥰", "🤩", "😎", "😃"].map((emoji) => (
          <TouchableOpacity key={emoji} onPress={() => handleEmojiClick(emoji)} style={styles.emojiCircle}>
            <Text style={styles.emoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.rizzText}>{rizzMessage}</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setMessage(null);
              setRizzMessage(null);
            }}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", 
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  emojiCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFEB3B",  
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emoji: {
    fontSize: 40,
  },
  messageContainer: {
    position: "absolute",
    bottom: 100,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#FFEB3B",  
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  rizzText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9800",  
    textAlign: "center",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#FF9800",  
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MotivAuraGame;
