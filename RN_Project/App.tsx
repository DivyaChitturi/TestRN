import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import LoginScreen from './src/Screens/LoginScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Nav = () => {
  const [isULoggedIn, setIsULoggedIn] = useState(false);

  const authStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Group>
    );
  };
  const mainStack = () => {
    return (
      <Stack.Group>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Group>
    );
  };

  return (
    <Stack.Navigator>{isULoggedIn ? mainStack() : authStack()}</Stack.Navigator>
  );
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Nav />
    </NavigationContainer>
  );
}

export default App;
