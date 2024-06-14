import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/aesthetic.jpg')}
        style={styles.image}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>IT'S GO TIME, USER.</Text>
        <Text style={styles.time}>{currentTime}</Text>
      </View>

      <View style={styles.buttonBackground}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Running')}
        activeOpacity={0.6}
      >
        <View style={styles.buttonTop}>
          <Text style={styles.buttonText}>Going on a Run?</Text>
        </View>
      </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('StartWorkout')}
            activeOpacity={0.6}
          >
            <Image
              source={require('./../assets/images/grid.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Workout List')}
            activeOpacity={0.6}
          >
            <Image
              source={require('./../assets/images/training.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Summary')}
            activeOpacity={0.6}
          >
            <Image
              source={require('./../assets/images/contract.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Location')}
            activeOpacity={0.6}
          >
            <Image
              source={require('./../assets/images/location.png')}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
  },
  titleContainer: {
    position: 'absolute',
    top: 50,
    left: 95,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  time: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    top: 35,
    left: 30,
    right: 20,
    padding: 10,
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
  image: {
    width: '120%',
    height: '100%',
    top: 0,
    resizeMode: 'cover',
  },
});
