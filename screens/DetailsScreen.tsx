import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../android/app/src/types/types';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { marker } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{marker.title}</Text>
      {/* Aquí puedes agregar más detalles usando las propiedades del marcador */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
