import React, {useState} from 'react';
import {Provider} from 'react-redux';
import store from './store';

import LoginScreen from './src/Screens/LoginScreen';
import DashBoardScreen from './src/Screens/DashBoardScreen';
import LocaleScreen from './src/Screens/LocaleScreen';
import MyPlacesScreen from './src/Screens/MyPlacesScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Nav = () => {
  //const [isULoggedIn, setIsULoggedIn] = useState(false);

  const userData = useSelector(state => state.user);
  const isULoggedIn =
    typeof userData?.isLoggedIn?.emailId === 'string' ? true : false;

  const authStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    );
  };
  const mainStack = () => {
    return <MyTabs />;
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

  return isULoggedIn ? authStack() : mainStack();
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Nav />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
