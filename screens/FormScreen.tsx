// import React, { useState } from 'react';
// import { View, Button, TextInput } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList, VehicleData } from '../App'; // Asegúrate de actualizar esta ruta de importación según corresponda

// type FormScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'Form'
// >;

// type FormScreenRouteProp = RouteProp<RootStackParamList, 'Form'>;

// type Props = {
//   navigation: FormScreenNavigationProp;
//   route: FormScreenRouteProp;
// };

// const FormScreen: React.FC<Props> = ({ navigation }) => {
//   const [vehicleData, setVehicleData] = useState<VehicleData>({ model: '', color: '' });

//   const handleSubmit = () => {
//     // Aquí, asumamos que has recogido los datos del vehículo en vehicleData
//     navigation.navigate('Map', { vehicleData });
//   }

//   return (
//     <View>
//       <TextInput
//         placeholder="Model"
//         value={vehicleData.model}
//         onChangeText={text => setVehicleData({...vehicleData, model: text})}
//       />
//       <TextInput
//         placeholder="Color"
//         value={vehicleData.color}
//         onChangeText={text => setVehicleData({...vehicleData, color: text})}
//       />
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default FormScreen;
