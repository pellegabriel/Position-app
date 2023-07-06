import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const destination = { latitude: -34.92158951393353, longitude: -57.952644470960294 }; // This is a fixed destination
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBBVk4iIjHSYXgGjZA08-VKCCCbm03Z2is'; // replace with your Google Maps Directions API Key
  const handleGeolocation = () => {
    // if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
          (position) => {
            setLongitude(position.coords.longitude)
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message, 'error');
          },
          {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 10000
        }      );
    // }
  }
  useEffect(() => {
    handleGeolocation()
  }, []);

  // if (latitude === null || longitude === null) {
  //   return null;
  // }
  return (
    <View style={styles.container}>
      {/* <MapScreen /> */}
        <MapView
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
        />
        {/* <Marker
          coordinate={destination}
        />  */}
        <MapViewDirections
          // origin={{ latitude: latitude, longitude: longitude }}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onReady={result => {
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  map: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default App;
