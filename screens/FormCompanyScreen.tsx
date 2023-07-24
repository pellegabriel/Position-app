import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../android/app/src/types/types';
import Geocoder from 'react-native-geocoding'; 
import {GOOGLE_MAPS_APIKEY} from '@env'

Geocoder.init(GOOGLE_MAPS_APIKEY); 

const FormCompanyScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'FormCompany'>) => {
  const [companyData, setCompanyData] = useState({ name: '', address: ''});

  const handleSubmit = () => {
    Geocoder.from(companyData.address)
      .then(json => {
        const { lat: latitude, lng: longitude } = json.results[0].geometry.location;
  
        const updatedCompanyData = {
          ...companyData, 
          address: {
            value: companyData.address,
            coordinates: {
              latitude,
              longitude
            }
          }
        };
  
        navigation.navigate('MapCompany', { companyData: updatedCompanyData });
      })
      .catch(error => console.warn(error));
  }
  

  return (
    <View style={styles.container}>

        <TextInput
        style={styles.input}
        placeholder="Name Company"
        value={companyData.name}
        onChangeText={text => setCompanyData(prevState => ({...prevState, name: text}))}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={companyData.address}
        onChangeText={text => setCompanyData(prevState => ({...prevState, address: text}))}
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

export default FormCompanyScreen;
