import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import MapScreen from './screens/MapScreen';
import FormScreen from './screens/FormScreen';
import firebase from '@react-native-firebase/app';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      console.log('Firebase no se ha conectado correctamente');
    } else {
      console.log('Firebase se ha conectado correctamente');
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
