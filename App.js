import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WorkOutListScreen from './screens/WorkOutListScreen';
import StartWorkoutScreen from './screens/StartWorkoutScreen';
import SummaryScreen from './screens/SummaryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    //adding a overall layout for the entire application
    <View style={styles.container}> 
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home'
          screenOptions={{
            headerStyle:{
              backgroundColor:'#f7f7f7', //light gray background for header
              shadowOpacity: 0.5, //Adding Shadow Depth
              shadowOffset: { height: 1}, //Shadow Direction
              shadowRadius: 3, //blur radius
            },
            headerTintColor: '#333', //Dark text for better readability 
            headerTitleStyle : {
              fontWeight: 'bold', //Bold font weight for header title
            },
          }}
          >
        
          <Stack.Screen name="Home" component={HomeScreen} /> 
          <Stack.Screen name="Workout List" component={WorkOutListScreen} />
          <Stack.Screen name="StartWorkout" component={StartWorkoutScreen}/>
          <Stack.Screen name="Summary" component={SummaryScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', // light gray background color
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
