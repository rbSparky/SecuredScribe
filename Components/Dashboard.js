import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { TouchableOpacity } from 'react-native';
import { PanResponder } from 'react-native';

const invertColors = (color) => {
  // invert colors using bitwise operator
  return color ^ 0xffffff;
};

const Dashboard = ({ nightMode, onSetPasswordClick }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [isSetPasswordVisible, setIsSetPasswordVisible] = React.useState(false);
  const [theme, setTheme] = React.useState(nightMode);
  const [password, setPassword] = React.useState(''); // added state variable for password

  const buttonStyles = [styles.button, nightMode ? styles.buttonNight : null];
  const noteStyles = [styles.note, nightMode ? styles.noteNight : null];
  const textStyles = [styles.text, nightMode ? styles.textNight : null];

  // added onPress handler to save password to Android storage
  const handleSavePassword = async () => {
    try {
      await AsyncStorage.setItem('password', password);
      console.log('successful');
    } catch (error) {
      this.password = password;
      console.log('error');
    }
  };

  return (
    <View style={[styles.container, theme !== nightMode && styles.dark]}>
      <View style={styles.appNameContainer}>
        <Text style={textStyles}>SecuredScribe</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsCollapsed((prevState) => !prevState);
            //onSetPasswordClick(true);
          }}>
          <Image
            style={[
              styles.icon,
              { tintColor: nightMode ? null : invertColors('#000000') },
            ]}
            source={require('../assets/side-menu.png')}
          />
        </TouchableOpacity>
      </View>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appNameContainer: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  menu: {
    backgroundColor: '#efefef',
    padding: 20,
  },
  menuOption: {
    fontSize: 18,
    marginTop: '5%',
    top: '50%',
  },
  dark: {
    backgroundColor: '#333',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#2196f3',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    //zIndex: 500,
  },
  buttonNight: {
    borderRadius: 5,
    backgroundColor: '#0d47a1',
    //fontColor: #000,
  },
  text: {
    fontSize: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  textNight: {
    color: '#fff',
    fontWeight: 'bold',
  },
  passwordInputContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordInput: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  savePasswordButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
  },
  savePasswordText: {
    color: '#fff',
  },
  passwordBox: {
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default Dashboard;
