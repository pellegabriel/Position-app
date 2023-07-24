// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './android/app/src/types/types'; 
import MapScreen from './screens/MapScreen';
import FormScreen from './screens/FormScreen';
import DetailsScreen from './screens/DetailsScreen';
import CompanyScreen from './screens/FormCompanyScreen';
import InitialScreen from './screens/InitialScreen';
import MapCompanyScreen from './screens/MapCompany';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen name="Initial" component={InitialScreen} />
        <Stack.Screen name="Form" component={FormScreen} />
        <Stack.Screen name="FormCompany" component={CompanyScreen} />
        <Stack.Screen name="MapCompany" component={MapCompanyScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
