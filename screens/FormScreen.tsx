import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import database from '@react-native-firebase/database';

const FormScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'Form'>) => {
  const [vehicleData, setVehicleData] = useState({
    model: '',
    color: '',
    carPatent: '',
    address: '',
  });

  const handleSubmit = () => {
    geocodeAddress(vehicleData.address);
    navigation.navigate('Map', {vehicleData});
  };

  const geocodeAddress = (address: string) => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=YOUR_GOOGLE_API_KEY`,
    )
      .then(response => response.json())
      .then(data => {
        const coordinate = data.results[0].geometry.location;
        const userRef = database().ref('/user/address');
        userRef.set({
          value: address,
          coordinate: {
            latitude: coordinate.lat,
            longitude: coordinate.lng,
          },
        });
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={vehicleData.model}
        onChangeText={text =>
          setVehicleData(prevState => ({...prevState, model: text}))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={vehicleData.color}
        onChangeText={text =>
          setVehicleData(prevState => ({...prevState, color: text}))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Car Patent"
        value={vehicleData.carPatent}
        onChangeText={text =>
          setVehicleData(prevState => ({...prevState, carPatent: text}))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={vehicleData.address}
        onChangeText={text =>
          setVehicleData(prevState => ({...prevState, address: text}))
        }
      />
      <View>
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
