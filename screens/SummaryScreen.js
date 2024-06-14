import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SummaryScreen() {
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
      width: '45%', // 30% of the screen width
      height: undefined, // let the height adjust automatically
      aspectRatio: 1, // maintain the aspect ratio
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
});
