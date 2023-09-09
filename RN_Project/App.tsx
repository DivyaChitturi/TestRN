import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

import LoginScreen from './src/Screens/LoginScreen';
import DashBoardScreen from './src/Screens/DashBoardScreen';
import LocaleScreen from './src/Screens/LocaleScreen';
import MyPlacesScreen from './src/Screens/MyPlacesScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

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
        <Stack.Screen
          name="DashBoardScreen"
          component={DashBoardScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} /> */}
      </Stack.Group>
    );
  };

  const MyTabs = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="DashBoardScreen"
          component={DashBoardScreen}
          // options={{
          //     drawerIcon: ({ focused, size }) => (
          //         <Icon
          //             name="home"
          //             size={size}
          //             color={focused ? 'red' : 'black'}
          //         />
          //     ),
          // }}
        />
        <Drawer.Screen
          name="LocaleScreen"
          component={LocaleScreen}
          // options={{
          //   drawerIcon: ({focused, size}) => (
          //     <Icon name="home" size={size} color={focused ? 'red' : 'black'} />
          //   ),
          // }}
        />
        <Drawer.Screen
          name="MyPlacesScreen"
          component={MyPlacesScreen}
          // options={{
          //   drawerIcon: ({focused, size}) => (
          //     <Icon
          //       name="shopping-cart"
          //       size={size}
          //       color={focused ? 'red' : 'black'}
          //     />
          //   ),
          // }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <Stack.Navigator>
      {isULoggedIn ? (
        <Stack.Screen name="Tabs" component={MyTabs} />
      ) : (
        authStack()
      )}
    </Stack.Navigator>
    // <Stack.Navigator
    //   initialRouteName="Tabs"
    //   screenOptions={{
    //     headerShown: false,
    //   }}>
    //   <Stack.Screen name="Tabs" component={MyTabs} />
    // </Stack.Navigator>
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
