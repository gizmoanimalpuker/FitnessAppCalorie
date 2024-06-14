import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import workouts from '../workouts.json'; // Import the JSON file

const colors = {
  primary: 'grey',
  secondary: '#ff6f00',
  background: '#f0f0f0',
  text: '#ffffff',
  detailText: '#000000',
};

// Mapping of workout names to images
const workoutImages = {
  'Incline Hammer Curls': require('../assets/images/incline-hammer-curl.png'),
  'Wide-grip barbell curl': require('../assets/images/wide-grip-barbell-curl.png'),
  'EZ-bar spider curl': require('../assets/images/spider-curl.png'),  
  'Hammer Curls' : require('../assets/images/hammer-curls.jpg'),
  'EZ-Bar Curl': require('../assets/images/ez-bar-curl.jpg'),
  'Zottman Curl': require('../assets/images/zottman-curl.jpg'),
  'Biceps curl to shoulder press': require('../assets/images/bicep-shoulder.jpg'),
  'Barbell Curl': require('../assets/images/barbell-curl.jpg'),
  'Concentration curl': require('../assets/images/concentration-curl.jpg'),
  'Flexor Incline Dumbbell Curls': require('../assets/images/flexor-incline.png'),

  // Add more mappings as needed
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
        {workoutImages[item.name] && (
          <Image source={workoutImages[item.name]} style={styles.image} />
        )}
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
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
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
