import React from 'react';
import { View, Text, Button, StyleSheet, Image , TouchableOpacity} from 'react-native';
import WorkoutListScreen from './WorkOutListScreen';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../assets/images/app_image.jpg')}
        style={styles.image}
      />
      <Text style={styles.title}>We Go JIMMMMM</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Accelerometer')}
        activeOpacity={0.6}
      >
        <View style={styles.buttonTop}>
          <Text style={styles.buttonText}>Accelerometer</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Workout List')}
        activeOpacity={0.6}
      >
        <View style={styles.buttonTop}>
          <Text style={styles.buttonText}>Go to Workout List</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StartWorkout')}
        activeOpacity={0.6}
      >
        <View style={styles.buttonTop}>
          <Text style={styles.buttonText}>Start Workout</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Summary')}
        activeOpacity={0.6}
      >
        <View style={styles.buttonTop}>
          <Text style={styles.buttonText}>Summary</Text>
        </View>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    borderRadius: 12,
    color: 'white',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#000000', // button_outline_color
    borderRadius: 12, // Convert em to approximate px
    marginBottom: 10,
  },
  buttonTop: {
    borderWidth: 2,
    borderColor: '#000000', // button_outline_color
    backgroundColor: '#e8e8e8', // button_color
    borderRadius: 12, // Convert em to approximate px
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#000000', // button_outline_color
    fontSize: 17,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 400,
    marginBottom: 20,
    borderRadius: 20,
  },
});