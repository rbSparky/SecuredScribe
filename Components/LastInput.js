import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LastInput = ({ latestNote }) => {
  return (
    <View style={styles.lastInput}>
      <Text>{latestNote ? "1" : "0"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lastInput: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#efefef',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
});

export default LastInput;
