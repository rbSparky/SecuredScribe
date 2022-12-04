import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { BlurView } from 'expo';
import { Octicons } from '@expo/vector-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faMoon } from '@fortawesome/free-solid-svg-icons';

import Collapsible from 'react-native-collapsible';

/*
import { NavigationContainer } from 'react-navigation';
import { createNavigatorFactory } from 'react-navigation';
*/

import Dashboard from './components/Dashboard';
import LastInput from './components/LastInput';

export default class App extends React.Component {
  state = {
    notes: [],
    note: '',
    editingNote: null,
    nightMode: false,
    isCollapsed: true,
    setIsCollapsed: true,
    setPasswordClicked: false, // added state variable to track whether "Set Password" has been clicked
  };

  handleChange = (event) => {
    //this.setState({ note: event.target.value });
    this.setState({ note: event.nativeEvent.text });
  };

  toggleNightMode = () => {
    this.setState((state) => ({
      nightMode: !state.nightMode,
    }));
  };

  toggleScreenBlur = () => {
    this.setState((state) => ({
      screenBlur: !state.screenBlur,
    }));
  };

  componentDidMount() {
    // Enable user input in the TextInput component
    this.input.setNativeProps({ editable: true });
  }

  handleSubmit = () => {
    const { notes, note, editingNote } = this.state;

    if (editingNote === null) {
      // add new note
      const lines = note.split('\n');
      const title = lines[0];
      const noteWithoutTitle = lines.slice(1);

      this.setState({
        notes: [
          ...notes,
          {
            id: notes.length + 1,
            title,
            note: noteWithoutTitle,
          },
        ],
        note: '',
      });
    } else {
      // update existing note
      const updatedNotes = notes.map((n, index) => {
        if (index === editingNote) {
          const lines = note.split('\n');
          const title = lines[0];
          const noteWithoutTitle = lines.slice(1);

          return { title, note: noteWithoutTitle };
        }
        return n;
      });

      this.setState({
        notes: updatedNotes,
        note: '',
        editingNote: null,
      });
    }
  };

  handleEdit = (index) => {
    const { notes } = this.state;

    // get the note to be edited
    const note = notes[index];
    const title = note.title;
    const noteText = note.note.join('\n');

    this.setState({
      note: title + '\n' + noteText,
      editingNote: index,
    });
  };

  handleSetPasswordClick = (val) => {
    this.setState({
      setPasswordClicked: val,
    });
  };

  deleteNote = (index) => {
    this.setState((prevState) => {
      // Filter out the note with the given index
      const notes = prevState.notes.filter((note, i) => i !== index);
      return { notes };
    });
  };

  render() {
    //const [isCollapsed, setIsCollapsed] = React.useState(true);
    const { setPasswordClicked } = this.state;
    const { notes, note, editingNote } = this.state;
    const { nightMode } = this.state;
    const filteredNotes = notes.filter(Boolean);
    const latestNote = filteredNotes[filteredNotes.length - 1];

    const containerStyles = [
      styles.container,
      nightMode ? styles.containerNight : null,
    ];
    const noteStyles = [
      styles.note,
      nightMode ? styles.noteNight : null,
      {
        elevation: 10,
      },
    ];
    const inputStyles = [styles.input, nightMode ? styles.inputNight : null];
    const textStyles = [styles.text, nightMode ? styles.textNight : null];
    const noteTextStyles = [
      styles.noteText,
      nightMode ? styles.noteTextNight : null,
    ];
    const buttonStyles = [
      styles.button,
      nightMode ? styles.buttonNight : null,
      {
        elevation: 10,
      },
    ];

    if (!setPasswordClicked) {
      return (
        <View
          style={[containerStyles, { filter: 0 ? 'blur(10px)' : 'blur(0px)' }]}>
          <View style={styles.overlayContainer}>
            <Dashboard
              nightMode={nightMode}
              onSetPasswordClick={this.handleSetPasswordClick}
            />
          </View>
          <View style={styles.header}></View>

          <TextInput
            ref={(input) => {
              this.input = input;
            }}
            style={inputStyles}
            value={note}
            onChange={this.handleChange}
            placeholder={0 ? 'hi' : 'Enter a new note'}
            multiline
          />
          <Text>&nbsp;</Text>
          <TouchableOpacity
            id="button"
            style={buttonStyles}
            title={editingNote === null ? 'Add Note' : 'Update Note'}
            onPress={this.handleSubmit}>
            <Text style={textStyles}>
              {editingNote === null ? 'Add Note' : 'Update Note'}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={filteredNotes}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View key={index} style={noteStyles}>
                <Text style={[noteTextStyles, { fontWeight: 'bold' }]}>
                  {item.title}
                </Text>
                {item.note.map((line, i) => (
                  <Text style={noteTextStyles} key={i}>
                    {line}
                  </Text>
                ))}
                <Text>&nbsp;</Text>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => this.handleEdit(index)}>
                    <FontAwesome name="pencil" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={{ width: 10 }} />
                  <TouchableOpacity onPress={() => this.deleteNote(index)}>
                    <FontAwesome name="trash" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity onPress={this.toggleNightMode}>
            {nightMode ? (
              <Octicons name="sun" size={24} color="white" />
            ) : (
              <Octicons name="moon" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      );
    }
  }
}
//<LastInput latestNote={latestNote} />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
    position: 'relative',
    //filter: this.state.nightMode ? 'blur(50px)' : null,
  },
  containerNight: {
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: '#fff',
    height: 40,
    //marginTop: 10,
    marginBottom: 10,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    opacity: 0,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 0,
    //zIndex: 0,
  },
  nightButton: {
    height: 50,
    width: 50,
    margin: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#2196f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    elevation: 10,
  },
  textNight: {
    color: '#fff',
    fontWeight: 'bold',
    elevation: 10,
  },
  noteText: {
    color: '#000',
    elevation: 10,
  },
  noteTextNight: {
    color: '#fff',
    elevation: 10,
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

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  inputNight: {
    borderColor: '#ccc',
    backgroundColor: '#efefef',
  },

  notesContainer: {
    padding: 10,
  },

  note: {
    margin: 10,
    padding: 20,
    backgroundColor: '#efefef',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noteNight: {
    backgroundColor: '#1f1b24',
  },
  dark: {
    backgroundColor: '#121212',
  },
});

/*
else {
      return (
        <View
          style={[containerStyles, { filter: 0 ? 'blur(10px)' : 'blur(0px)' }]}>
          <View style={styles.overlayContainer}>
            <Dashboard
              nightMode={nightMode}
              onSetPasswordClick={this.handleSetPasswordClick}
            />
          </View>
          <View style={styles.header}></View>
          <FlatList
            data={filteredNotes}
            numColumns={2}
            renderItem={({ item, index }) => (
              <View key={index} style={noteStyles}>
                <Text style={[noteTextStyles, { fontWeight: 'bold' }]}>
                  {item.title}
                </Text>
                {item.note.map((line, i) => (
                  <Text style={noteTextStyles} key={i}>
                    {line}
                  </Text>
                ))}
                <Text>&nbsp;</Text>
                <FontAwesome.Button
                  name="pencil"
                  backgroundColor="#ffffff"
                  color="#000000"
                  onPress={() => this.handleEdit(index)}
                />
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.nightButton}
            title={nightMode ? 'L' : 'N'}
            onPress={this.toggleNightMode}>
            <Text style={textStyles}>{nightMode ? 'L' : 'N'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    */
