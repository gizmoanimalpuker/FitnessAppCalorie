import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function MovementSensorScreen() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [secondTimer, setSecondTimer] = useState(0);
  const [intervalTimer, setIntervalTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [initialMovementDetected, setInitialMovementDetected] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    Accelerometer.setUpdateInterval(100); // Update every 100ms for more responsive detection

    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      if (!initialMovementDetected && isMovementDetected(accelerometerData)) {
        setInitialMovementDetected(true);
      }
      if (initialMovementDetected && !timerActive && isMovementDetected(accelerometerData)) {
        startTimer();
      }
      if (timerActive && !isMovementDetected(accelerometerData)) {
        stopTimer();
      }
      if (accelerometerData.x > 0.25 && !alertShown) {
        Alert.alert('Hallo');
        setAlertShown(true);
      }
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (initialMovementDetected) {
      let interval;
      if (timerActive) {
        interval = setInterval(() => {
          setSecondTimer(prevSecondTimer => prevSecondTimer + 1);
          setIntervalTimer(prevIntervalTimer => prevIntervalTimer + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [timerActive, initialMovementDetected]);

  const startTimer = () => {
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
    setSecondTimer(0); // Reset second timer
    setIntervalTimer(0); // Reset interval timer
  };

  const isMovementDetected = (currentData) => {
    const threshold = 0.1; // Adjust the threshold for sensitivity
    return (
      Math.abs(currentData.x) > threshold ||
      Math.abs(currentData.y) > threshold ||
      Math.abs(currentData.z) > threshold
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer Data:</Text>
      <Text style={styles.text}>x: {data.x.toFixed(2)}</Text>
      <Text style={styles.text}>y: {data.y.toFixed(2)}</Text>
      <Text style={styles.text}>z: {data.z.toFixed(2)}</Text>
      <Text style={styles.text}>Second Timer: {secondTimer}</Text>
      <Text style={styles.text}>Interval Timer: {intervalTimer}</Text>
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