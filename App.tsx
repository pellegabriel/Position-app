import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import MapViewDirections from 'react-native-maps-directions';
import MapScreen from './screens/MapScreen';

const App: React.FC = () => {
 
  return (
    <View style={styles.container}>
      <MapScreen />
     
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
