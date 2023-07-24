import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { Image } from 'react-native';
import customMapStyle from './customMapStyle.json';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../android/app/src/types/types';
import { GOOGLE_MAPS_APIKEY } from '@env'

type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;

type Props = {
  route: MapScreenRouteProp;
  navigation: any;
};

type Store = {
  geometry: {
    location: {
      lat: number,
      lng: number,
    },
  },
  name: string,
};

const MapScreen: React.FC<Props> = ({ route, navigation }) => {
  const vehicleData = route.params.vehicleData;
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);  
  const [markers, setMarkers] = useState<any[]>([]); // Agrega un nuevo estado para los marcadores
  const destination = vehicleData.address.coordinates;

  const mapRef = useRef<MapView>(null);

  const handleGeolocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=25000&type=store&key=${GOOGLE_MAPS_APIKEY}`
        )
          .then(response => response.json())
          .then(data => {
            const stores = data.results.map((store: Store) => ({  // Aquí estamos especificando que 'store' es de tipo 'Store'
              coordinate: {
                latitude: store.geometry.location.lat,
                longitude: store.geometry.location.lng,
              },
              title: store.name,
            }));
            setMarkers(stores);
          })
          .catch(error => console.log(error));

        mapRef.current?.animateToRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);
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
  };

  useEffect(() => {
    handleGeolocation();
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
          ref={mapRef}
          customMapStyle={customMapStyle}
          style={styles.map}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              anchor={{ x: 0.5, y: 0.5 }}
              onCalloutPress={() => navigation.navigate('Details', { marker })}
            >
              <Image
                source={require('../icons/placeholder.png')}
                style={{height: 20, width: 50, resizeMode: 'contain'}}
              />
            </Marker>
          ))}

          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <Image
              source={require('../icons/pin-map.png')}
              style={{height: 48, width: 48}}
            />
          </Marker>
          <Marker
            coordinate={destination}
          >
            <Image
              source={require('../icons/shop.png')}
              style={{height: 50, width: 50}}
            />
          </Marker>
          <MapViewDirections
            origin={{ latitude: latitude, longitude: longitude }}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={result => {
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
