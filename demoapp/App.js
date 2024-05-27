import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window'); // Get screen dimensions
const HomeScreen = () => {
  const handlePress = () => {
    // Handle button press
    alert('I am a cute little button!');
  };
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Press Me" onPress={handlePress} />
      <Image source={require('./assets/photo1.jpg')} style={styles.image} />
      
    </View>
  );
};

const DetailsScreen = () => {
  return (
    <View>
      <Text>Details Screen</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth, // Set width to screen width
    height: screenHeight / 2, // Set height to half of screen height
 
  },
    

});

