import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebase from '@react-native-firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyDlPRw7kl8GbKDWJQWB1mwS5YXNU8ZovjI",
  authDomain: "teiki-55f38.firebaseapp.com", // Asegúrate de reemplazar esto con el valor correcto de tu consola Firebase
  databaseURL: "https://teiki-55f38-default-rtdb.firebaseio.com",
  projectId: "teiki-55f38",
  storageBucket: "teiki-55f38.appspot.com",
  messagingSenderId: "746433084236",
  appId: "1:746433084236:android:5d913450ee77df4b1c6de9",
};


// Inicializa Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


AppRegistry.registerComponent(appName, () => App);





