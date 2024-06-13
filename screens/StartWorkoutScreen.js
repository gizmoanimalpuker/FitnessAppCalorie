import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const workouts = require('./../workouts.json');
import { useNavigation } from '@react-navigation/native';
//import { Accelerometer } from 'expo-sensors';

// Define your color scheme
const colors = {
  primary: 'gray', // Example primary color
  secondary: '#ff6f00', // Example secondary color
  background: '#f0f0f0', // Light grey background
  text: '#ffffff', // White text color
  detailText: '#000000', // Black text color for details
};

export default function StartWorkoutScreen({ navigation }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (timerActive) {
      const id = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timerActive]);

  const handleStart = () => {
    setTimerActive(true);
  };

  const handlePauseResume = () => {
    setTimerActive(!timerActive);
  };

  const handleEnd = async () => {
    setTimerActive(false);
    const caloriesBurned = selectedWorkout.cps * timer;
    const roundedCaloriesBurned = caloriesBurned.toFixed(2); // Round to two decimal places
    const workoutSummary = {
      name: selectedWorkout.name,
      duration: timer,
      caloriesBurned: roundedCaloriesBurned,
      date: new Date().toISOString(),
    };
    await saveWorkoutData(workoutSummary);
    setTimer(0);
    setSelectedWorkout(null);
    navigation.navigate('Summary', { summary: workoutSummary });
  };

  const formatTime = () => {
    const seconds = timer % 60;
    const minutes = Math.floor(timer / 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const saveWorkoutData = async (workoutData) => {
    try {
      const existingData = await AsyncStorage.getItem('workout');
      const newData = existingData ? JSON.parse(existingData) : [];
      newData.push(workoutData);
      await AsyncStorage.setItem('workout', JSON.stringify(newData));
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => setSelectedWorkout(item)}>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedWorkout && (
        <View style={styles.workoutContainer}>
          <Text style={styles.workoutText}>Selected: {selectedWorkout.name}</Text>
          <Text style={styles.timerText}>{formatTime()}</Text>
          <Button title="Begin Workout" onPress={handleStart} disabled={timerActive} />
          {timerActive && (
            <Button title={timerActive ? "Pause" : "Resume"} onPress={handlePauseResume} />
          )}
          <Button title="End Workout" onPress={handleEnd} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  workoutContainer: {
    marginTop: 20,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  workoutText: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.text,
  },
  timerText: {
    fontSize: 30,
    marginBottom: 20,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  cardText: {
    color: colors.text,
    fontSize: 18,
  },
});