import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Get screen dimensions

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState(['Sample Note 1', 'Sample Note 2']); // Sample notes

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
        onPress={() => navigation.navigate('Details', { notes, setNotes })}
      />
    </View>
  );
};

const DetailsScreen = ({ route, navigation }) => {
  const { notes, setNotes } = route.params;
  const [note, setNote] = useState('');

  const handleAddNote = () => {
    if (note.trim()) {
      setNotes([...notes, note]);
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

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AppNavigator />
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
