import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//partially workedo n by Jaden
const SummaryScreen = ({ navigation }) => {
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workoutsData = await AsyncStorage.getItem('workout');
        setWorkoutHistory(workoutsData ? JSON.parse(workoutsData) : []);
      } catch (error) {
        console.error("Failed to fetch workouts from storage", error);
      }
    };

    fetchWorkouts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.text}>Duration: {item.duration} seconds</Text>
      <Text style={styles.text}>Calories Burned: {item.caloriesBurned} </Text>
      <Text style={styles.text}>Date: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/complete.jpg')}
        style={styles.image}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={workoutHistory}
          keyExtractor={item => item.date}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No workout history available.</Text>}
        />
      </View>

      {/* Button Section */}
      <View style={styles.buttonBackground}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Running')}
            activeOpacity={0.6}
          >
            <View style={styles.buttonTop}>
            <Image
              source={require('../assets/images/running.png')}
              style={styles.buttonImage}
            />
            </View>
            
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('StartWorkout')}
            activeOpacity={0.6}
          >
            <Image
              source={require('../assets/images/grid.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Workout List')}
            activeOpacity={0.6}
          >
            <Image
              source={require('../assets/images/training.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Summary')}
            activeOpacity={0.6}
          >
            <Image
              source={require('../assets/images/contract.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Location')}
            activeOpacity={0.6}
          >
            <Image
              source={require('../assets/images/location.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc', // Gray background for the main container
    paddingTop: 20, // Optional: Add some padding at the top for better layout
  },
  image: {
    width: '45%', // 45% of the screen width
    height: undefined, // Let the height adjust automatically
    aspectRatio: 1, // Maintain the aspect ratio
    resizeMode: 'contain',
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#ccc', // Gray background for the image container
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff', // White background for the list container
    marginTop: 20, // Space between the image and the list
    borderTopLeftRadius: 20, // Optional: Rounded corners at the top
    borderTopRightRadius: 20, // Optional: Rounded corners at the top
    paddingTop: 20, // Optional: Padding at the top for better layout
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Gray border color for each item
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000', // Black text color for the title
  },
  text: {
    fontSize: 18,
    color: '#666', // Dark gray text color for the details
  },
  emptyMessage: {
    padding: 20,
    textAlign: 'center',
    color: '#999', // Light gray text color for the empty message
    fontSize: 18,
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
  buttonImage: {
    width: 30,
    height: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SummaryScreen;
