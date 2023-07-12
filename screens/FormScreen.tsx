import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import { RootStackParamList } from '../types';
// import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const FormScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Form'>) => {
  const [vehicleData, setVehicleData] = useState({
    model: '',
    color: '',
    carPatent: '',
    address: { value: '', coordinate: { latitude: '', longitude: '' } },
  });

  const handleSubmit = async () => {
    const uid = auth().currentUser?.uid;
    // const uid = firebase.auth().currentUser?.uid; esto lo saque ya que al isntalar auth, solo usando auth() deberia estar.
    if (!uid) {
      // Aca podes manejar el caso en el que no haya ningún usuario autenticado.
      return;
    }

    const userDocument = firestore().collection('users').doc(uid);

    await userDocument.set({
      vehicleData: {
        model: vehicleData.model,
        color: vehicleData.color,
        carPatent: vehicleData.carPatent,
        address: {
          value: vehicleData.address.value,
          coordinate: {
            latitude: vehicleData.address.coordinate.latitude,
            longitude: vehicleData.address.coordinate.longitude
          }
        }
      }
    }, { merge: true });

    // Aca pasamos el uid a MapScreen
    navigation.navigate('Map', { uid, vehicleData });
  }


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={vehicleData.model}
        onChangeText={text => setVehicleData(prevState => ({ ...prevState, model: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={vehicleData.color}
        onChangeText={text => setVehicleData(prevState => ({ ...prevState, color: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Car Patent"
        value={vehicleData.carPatent}
        onChangeText={text => setVehicleData(prevState => ({ ...prevState, carPatent: text }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={vehicleData.address.value}
        onChangeText={text => setVehicleData(prevState => ({ ...prevState, address: { ...prevState.address, value: text } }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={vehicleData.address.coordinate.latitude}
        onChangeText={text => setVehicleData(prevState => ({ ...prevState, address: { ...prevState.address, coordinate: { ...prevState.address.coordinate, latitude: text } } }))}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={vehicleData.address.coordinate.longitude}
        onChangeText={text => setVehicleData(prevState => ({ ...prevState, address: { ...prevState.address, coordinate: { ...prevState.address.coordinate, longitude: text } } }))}
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
