import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../android/app/src/types/types';
import Geocoder from 'react-native-geocoding'; 
import {GOOGLE_MAPS_APIKEY} from '@env'
import firestore from '@react-native-firebase/firestore';

Geocoder.init(GOOGLE_MAPS_APIKEY); 

const FormScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Form'>) => {
  const [vehicleData, setVehicleData] = useState({
    model: '',
    color: '',
    carPatent: '',
    address: {
      value: '',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  const handleSubmit = () => {
    Geocoder.from(vehicleData.address.value)
      .then(json => {
        var location = json.results[0].geometry.location;
        const updatedAddress = {
            value: vehicleData.address.value,
            coordinates: {
              latitude: location.lat,
              longitude: location.lng,
            }
        };
        
        setVehicleData({...vehicleData, address: updatedAddress});

        // Aquí es donde guardas los datos en Firestore
        firestore()
          .collection('vehicles')
          .add(updatedAddress)
          .then(() => {
            console.log('Address added!');
            navigation.navigate('Map', { vehicleData: {...vehicleData, address: updatedAddress} });
          })
          .catch(error => {
            console.error("Error writing document: ", error);
          });
      })
      .catch(error => console.warn(error));
  }

  // ...


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
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={vehicleData.address.value}
        onChangeText={text => setVehicleData(prevState => ({...prevState, address: {...prevState.address, value: text}}))}
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
