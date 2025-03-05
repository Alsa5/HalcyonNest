import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const ChatbotScreen = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]); // Array for messages

  const handleSend = async () => {
    if (userInput.trim() === '') return;

    // Add user message to state
    setMessages([...messages, { text: userInput, sender: 'user' }]);

    try {
      const response = await axios.post('http://192.168.0.3:5000/dialogflow', {
        queryResult: {
          queryText: userInput
        },
        sessionId: '12345' // Static session ID for simplicity
      });

      const botResponse = response.data.fulfillmentText || "Sorry, I didn't get that.";

      // Add bot response to state
      setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prev) => [
        ...prev,
        { text: 'Error connecting to the chatbot server.', sender: 'bot' }
      ]);
    }

    setUserInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.botBubble
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
          placeholderTextColor="#a5a5a5"
        />
        <Button title="Send" onPress={handleSend} color="#0084ff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    justifyContent: 'flex-end',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  messageBubble: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 20,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084ff',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#0084ff',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Arial',
  },
});

export default ChatbotScreen;
