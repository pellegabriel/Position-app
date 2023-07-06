import { StackScreenProps } from '@react-navigation/stack';
import { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { RootStackParamList } from './types';


const FormScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Form'>) => {
  const [myString, setMyString] = useState('');

  const handleSubmit = () => {
    navigation.navigate('Map', { myString });
  }

  return (
    <View>
      <TextInput
        placeholder="Type something..."
        value={myString}
        onChangeText={setMyString}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default FormScreen;
