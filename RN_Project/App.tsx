import React, {useState} from 'react';
import {Provider} from 'react-redux';
import store from './store';

import LoginScreen from './src/Screens/LoginScreen';
import DashBoardScreen from './src/Screens/DashBoardScreen';
import LocaleScreen from './src/Screens/LocaleScreen';
import MyPlacesScreen from './src/Screens/MyPlacesScreen';
import MapScreen from './src/Screens/MapScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
//import Icon from '@react-native-vector-icons/FontAwesome';
import CustomDrawer from './src/Screens/CustomDrawer';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Nav = () => {
  //const [isULoggedIn, setIsULoggedIn] = useState(false);

  const userData = useSelector(state => state.user);
  const isULoggedIn =
    typeof userData?.isLoggedIn?.emailId === 'string' ? true : false;

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="DashBoardScreen"
          component={DashBoardScreen}
          //options={{headerShown: false}}
          // options={{
          //   drawerIcon: ({focused, size}) => (
          //     <Icon name="home" size={size} color={focused ? 'red' : 'black'} />
          //   ),
          // }}
        />
        <Drawer.Screen name="LocaleScreen" component={LocaleScreen} />
        <Drawer.Screen name="MyPlacesScreen" component={MyPlacesScreen} />
        <Drawer.Screen name="MapScreen" component={MapScreen} />
      </Drawer.Navigator>
    );
  };
  const authStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    );
  };
  const mainStack = () => {
    return (
      <DrawerNavigator />
      // <Stack.Navigator
      //   initialRouteName="MyTabs"
      //   screenOptions={{
      //     headerShown: false,
      //   }}>
      //   <Stack.Screen name="Tabs" component={MyTabs} />
      // </Stack.Navigator>
    );
  };
  return isULoggedIn ? mainStack() : authStack();
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
