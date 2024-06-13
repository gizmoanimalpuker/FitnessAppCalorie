import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import workouts from '../workouts.json'; // Import the JSON file
//import { Accelerometer } from 'expo-sensors';

// Define your color scheme
const colors = {
  primary: 'grey', // Example primary color
  secondary: '#ff6f00', // Example secondary color
  background: '#f0f0f0', // Light grey background
  text: '#ffffff', // White text color
  detailText: '#000000', // Black text color for details
  
};

export default function WorkoutListScreen() {
  const [data, setData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setData(workouts); // Set the workout data from the JSON file
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => toggleExpand(index)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>Type: {item.type}</Text>
        <Text style={styles.detail}>Muscle: {item.muscle}</Text>
        <Text style={styles.detail}>Equipment: {item.equipment}</Text>
        <Text style={styles.detail}>Difficulty: {item.difficulty}</Text>
        {expandedId === index && (
          <Text style={styles.instructions}>{item.instructions}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    card: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      padding: 16,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    cardContent: {
      borderBottomWidth: 1,
      borderBottomColor: colors.secondary,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    detail: {
      fontSize: 14,
      color: colors.detailText,
    },
    instructions: {
      fontSize: 12,
      color: colors.detailText,
      marginTop: 5,
    },
});