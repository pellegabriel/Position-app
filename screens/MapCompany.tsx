import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Button, NativeSyntheticEvent } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Image } from 'react-native';
import customMapStyle from './customMapStyle.json';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../android/app/src/types/types';
import { GOOGLE_MAPS_APIKEY } from '@env'

type MapCompanyScreenRouteProp = RouteProp<RootStackParamList, 'MapCompany'>;

type Props = {
  route: MapCompanyScreenRouteProp;
  navigation: any;
};

const MapCompanyScreen: React.FC<Props> = ({ route, navigation }) => {
  const companyData = route.params.companyData;
  const [companyLocation, setCompanyLocation] = useState(companyData.address.coordinates);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    mapRef.current?.animateToRegion({
      latitude: companyLocation.latitude,
      longitude: companyLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
  }, []);

  const handleCompanyMarkerDragEnd = (event: NativeSyntheticEvent<any>) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCompanyLocation({ latitude, longitude });
  };

  const handleSaveCompanyLocation = () => {
    console.log(companyLocation); // replace this with your API call
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          customMapStyle={customMapStyle}
          style={styles.map}
        >
          <Marker
            coordinate={companyLocation}
            draggable
            onDragEnd={handleCompanyMarkerDragEnd}
          >
            <Image
              source={require('../icons/shop.png')}
              style={{height: 50, width: 50}}
            />
          </Marker>
        </MapView>
      </View>
      <View style={styles.infoBox}>
        <Button title="Guardar ubicación de la compañía" onPress={handleSaveCompanyLocation} />
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
  }
});

export default MapCompanyScreen;
