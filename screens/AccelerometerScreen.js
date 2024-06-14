import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AccelerometerScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [secondTimer, setSecondTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [initialMovementDetected, setInitialMovementDetected] = useState(false);
  const previousX = useRef(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      
      if (!initialMovementDetected && Math.abs(previousX.current - accelerometerData.x) > 0.1) {
        setInitialMovementDetected(true);
        startTimer();
      }

      previousX.current = accelerometerData.x;
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  useEffect(() => {
    
    let interval;
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

  const startTimer = () => {
    setTimerActive(true);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const handleEndWorkout = async () => {
    setTimerActive(false);
    const caloriesBurned = calculateCaloriesBurned(secondTimer);
    const workoutSummary = {
      name: "Run",
      duration: secondTimer,
      caloriesBurned: caloriesBurned,
      date: new Date().toISOString(),
    };
    await saveWorkoutData(workoutSummary);
    setSecondTimer(0);
    clearInterval(intervalId); // Clear interval to stop timer completely
    Alert.alert('Workout ended and saved successfully.');
  };

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

  const calculateCaloriesBurned = (durationInSeconds) => {
    // Assuming 1 calorie burned per second while running
    // Adjust this calculation based on your specific scenario
    return durationInSeconds;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer Data:</Text>
      <Text style={styles.text}>x: {data.x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {data.y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {data.z.toFixed(2)}</Text>
      <Text style={styles.text}>Timer: {secondTimer}</Text>
      
      <Button title="End Workout" onPress={handleEndWorkout} disabled={!timerActive} />
      <Button title="Pause Timer" onPress={pauseTimer} disabled={!timerActive} />
      <Button
        title="See Summary"
        onPress={() => navigation.navigate('Summary')}
      />
    </View>
  );
}

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
});