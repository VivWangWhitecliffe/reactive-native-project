import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const HomeScreen = ({ navigation, notes }) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Notes</Text>
      <ScrollView style={styles.scrollView}>
        {notes.map((note, index) => (
          <View key={index} style={styles.noteContainer}>
            <Text style={styles.note}>{note}</Text>
          </View>
        ))}
      </ScrollView>
      <Button
        title="Add Note"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

const DetailsScreen = ({ navigation, setNotes }) => {
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    if (note.trim()) {
      setNotes(prevNotes => [...prevNotes, note]); // Append the new note to the existing notes array
      setNote('');
      navigation.navigate('Home'); // Navigate back to Home screen after adding a note
    }
  };

  return (
    <View style={styles.screenContainer}>
      <TextInput
        style={styles.input}
        placeholder="Write a note..."
        value={note}
        onChangeText={setNote}
      />
      <Button title="Add Note" onPress={handleAddNote} />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const AppNavigator = ({ notes, setNotes }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {props => <HomeScreen {...props} notes={notes} setNotes={setNotes} />}
      </Tab.Screen>
      <Tab.Screen name="Details">
        {props => <DetailsScreen {...props} notes={notes} setNotes={setNotes} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default function App() {
  const [notes, setNotes] = useState(['Sample Note 1', 'Sample Note 2']); // Sample notes

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AppNavigator notes={notes} setNotes={setNotes} />
      </NavigationContainer> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    width: '100%',
  },
  noteContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  note: {
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
