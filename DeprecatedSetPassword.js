import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, BlurView, TextInput, Button } from 'expo-blur';

const SetPassword = (props) => {
  const { setPassword } = props;
  const [password, setPasswordFunc] = React.useState('');

  return (
    <Modal>
      <BlurView intensity={100} style={styles.overlay}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPasswordFunc}
            placeholder="Enter password"
            secureTextEntry={true}
          />
          <Button title="Confirm" onPress={() => setPassword(password)} />
        </View>
      </BlurView>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});

export default SetPassword;
