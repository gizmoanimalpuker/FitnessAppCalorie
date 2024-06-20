import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AccelerometerScreen() {
  const navigation = useNavigation();
  //make xyz attributes
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  //make timers and variables
  const [secondTimer, setSecondTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [initialMovementDetected, setInitialMovementDetected] = useState(false);
  const previousX = useRef(0);
  const [intervalId, setIntervalId] = useState(null);
//set interval for timer
  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    //subscription to watch the accelerometer data
    const subscription = Accelerometer.addListener(accelerometerData => {
      //update the accelerometer data
      setData(accelerometerData);
      //if the phone is not just chillin, it must be moving so start the timer
      if (!initialMovementDetected && Math.abs(previousX.current - accelerometerData.x) > 0.1) {
        setInitialMovementDetected(true);
        startTimer();
      }
//set the new current data
      previousX.current = accelerometerData.x;
    });
//clean up subscription
    return () => {
      subscription && subscription.remove();
    };
  }, []);
//handle timer updates
  useEffect(() => {
    
    let interval;
    //set interval 
    if (initialMovementDetected && timerActive) {
      interval = setInterval(() => {
        setSecondTimer(prevSecondTimer => prevSecondTimer + 1);
      }, 1000);
      setIntervalId(interval);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timerActive, initialMovementDetected]);
//function to start timer
  const startTimer = () => {
    setTimerActive(true);
  };
//function pause timer
  const pauseTimer = () => {
    setTimerActive(false);
  };
//function end workout and save data,
  const handleEndWorkout = async () => {
    setTimerActive(false);
    //calculate calories burned
    const caloriesBurned = calculateCaloriesBurned(secondTimer);
    //make object for summary screen
    const workoutSummary = {
      name: "Run",
      duration: secondTimer,
      caloriesBurned: caloriesBurned,
      date: new Date().toISOString(),
    };
    //save workout data
    await saveWorkoutData(workoutSummary);
    //reset timer
    setSecondTimer(0);
    // Clear interval so timer fully stops
    clearInterval(intervalId); 
    
  };
// wait for workout data to save with async storage
  const saveWorkoutData = async (workoutData) => {
    try {
      const existingData = await AsyncStorage.getItem('workout');
      const newData = existingData ? JSON.parse(existingData) : [];
      newData.push(workoutData);
      await AsyncStorage.setItem('workout', JSON.stringify(newData));
    } catch (error) {
      console.error('Failed to save workout data:', error);
    }
  };
//calories burned = seconds so just kinda return that
  const calculateCaloriesBurned = (durationInSeconds) => {
    
    return durationInSeconds;
  };
//how the list item will look when returned
  return (
    
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer Data:</Text>
      <Text style={styles.text}>x: {data.x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {data.y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {data.z.toFixed(2)}</Text>
      <Text style={styles.text}>Timer: {secondTimer}</Text>
      <View style={styles.buttonBackground}>
      
        <View style={styles.buttonContainer}>
      <Button title="End Workout" onPress={handleEndWorkout} disabled={!timerActive} />
      <Button title="Pause Timer" onPress={pauseTimer} disabled={!timerActive} />
      <Button
        title="See Summary"
        onPress={() => navigation.navigate('Summary')}
      />
    </View>
    </View>
    </View>
  );
}
//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    
  },
  buttonContainer: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
        
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});