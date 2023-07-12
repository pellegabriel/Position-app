import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import firestore from '@react-native-firebase/firestore';
import customMapStyle from './customMapStyle.json';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;

type Props = {
  route: MapScreenRouteProp;
};

const MapScreen: React.FC<Props> = ({ route }) => {
  const { uid, vehicleData } = route.params;
  console.log(vehicleData, 'data del formulario')
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  //Aca se le da un estado inicial para la variable destination. 
  const [destination, setDestination] = useState({ latitude: -34.92158951393353, longitude: -57.952644470960294 });
  const GOOGLE_MAPS_APIKEY = 'TU_APY_KEY';

  const handleGeolocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position, 'funciono');
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error.code, error.message, 'error');
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
      }
    );
  }

  useEffect(() => {
    handleGeolocation();

    const fetchData = async () => {
      const userDocument = firestore().collection('users').doc(uid);
      const doc = await userDocument.get();

      if (doc.exists) {
        const data = doc.data();
        const vehicleData = data?.vehicleData;

        if (vehicleData && vehicleData.address && vehicleData.address.coordinate) {
          setDestination({
            latitude: parseFloat(vehicleData.address.coordinate.latitude),
            longitude: parseFloat(vehicleData.address.coordinate.longitude)
          });
        }
      }
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.vehicleData}>Vehicle Model: {vehicleData.model}</Text>
        <Text style={styles.vehicleData}>Vehicle Color: {vehicleData.color}</Text>
        <Text style={styles.vehicleData}>Vehicle Patent: {vehicleData.carPatent}</Text>

      </View>
      <View style={styles.mapContainer}>
        <MapView
          customMapStyle={customMapStyle}
          style={styles.map}
          initialRegion={{
            latitude: -34.92158951393353,
            longitude: -57.952644470960294,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <Image
              source={require('../icons/person.png')}
              style={{ height: 48, width: 48 }}
            />
          </Marker>
          <Marker
            coordinate={destination}
          >
            <Image
              source={require('../icons/house.png')}
              style={{ height: 50, width: 50 }}
            />
          </Marker>
          <MapViewDirections
            origin={{ latitude: latitude, longitude: longitude }}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={result => {
              console.log(result);
              setDistance(result.distance);
              setDuration(result.duration);
            }}
          />
        </MapView>
      </View>

      <View style={styles.infoBox}>
        <Text>Distancia: {distance} km</Text>
        <Text>Duracion: {duration} min</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  mapContainer: {
    marginTop: 10,
    flex: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'violet'
  },
  map: {
    flex: 1,
  },
  infoBox: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    paddingTop: 20,
    marginLeft: 20
  },
  vehicleData: {
    padding: 5
  }
});

export default MapScreen;
