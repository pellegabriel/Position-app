// import React, { useState } from 'react';
// import { View, Button, TextInput } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';

// type RootStackParamList = {
//   Form: undefined;
//   Map: { vehicleData: { model: string; color: string } };
// };

// const FormScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Form'>) => {
//   const [vehicleData, setVehicleData] = useState({ model: '', color: '' });

//   const handleSubmit = () => {
//     navigation.navigate('Map', { vehicleData });
//   }

//   return (
//     <View>
//       <TextInput
//         placeholder="Model"
//         value={vehicleData.model}
//         onChangeText={text => setVehicleData(prevState => ({...prevState, model: text}))}
//       />
//       <TextInput
//         placeholder="Color"
//         value={vehicleData.color}
//         onChangeText={text => setVehicleData(prevState => ({...prevState, color: text}))}
//       />
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default FormScreen;
