import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const ScrollBar = ({ children }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 30,
  },
});

export default ScrollBar;
