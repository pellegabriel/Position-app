import React from 'react';
import { Button, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../android/app/src/types/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Initial'>;

type Props = {
  navigation: NavigationProp;
};

const InitialScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to Form"
        onPress={() => navigation.navigate('Form')}
      />
      <Button
        title="Go to FormCompany"
        onPress={() => navigation.navigate('FormCompany')}
      />
    </View>
  );
};

export default InitialScreen;
