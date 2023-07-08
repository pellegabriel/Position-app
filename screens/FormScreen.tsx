import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';


const FormScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Form'>) => {
  const [vehicleData, setVehicleData] = useState({ model: '', color: '' ,carPatent: ''});

  const handleSubmit = () => {
    navigation.navigate('Map', { vehicleData });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={vehicleData.model}
        onChangeText={text => setVehicleData(prevState => ({...prevState, model: text}))}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={vehicleData.color}
        onChangeText={text => setVehicleData(prevState => ({...prevState, color: text}))}
      />
        <TextInput
        style={styles.input}
        placeholder="Car Patent"
        value={vehicleData.carPatent}
        onChangeText={text => setVehicleData(prevState => ({...prevState, carPatent: text}))}
      />
      <View >
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Listo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
     backgroundColor: 'black',

  },
  input: {
    height: 40,
    borderColor: 'violet',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'violet',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default FormScreen;
