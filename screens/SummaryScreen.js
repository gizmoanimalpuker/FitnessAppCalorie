import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SummaryScreen() {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const workoutsData = await AsyncStorage.getItem('workout');
      setWorkoutHistory(workoutsData ? JSON.parse(workoutsData) : []);
    };

    fetchWorkouts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Duration: {item.duration} seconds</Text>
      <Text>Calories Burned: {item.caloriesBurned}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <FlatList
      data={workoutHistory}
      keyExtractor={(item) => item.date}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
});