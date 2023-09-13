import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {useDispatch} from 'react-redux';
import LoginScreen from './src/Screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {setUserID} from './src/Reducers/userSlice';
import DrawerNavigator from './src/Navigators/DrawerNavigator';
import ViewProfile from './src/Screens/ViewProfile';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Nav = () => {
  const isULoggedIn = useSelector(state => state.user.isLoggedIn);

  console.log('---------isULoggedIn----------' + isULoggedIn);
  const [user, setUser] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        const {uid, email} = user;
        const userDataUid = {uid, email};
        dispatch(setUserID(userDataUid));
        console.log('------userDataUid-from firestore Auth------', userDataUid);
      } else {
        // User not logged in or has just logged out.
      }
    });
    return subscriber;
  }, []);

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
        <Stack.Screen name="Home" component={DrawerNavigator} />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />
      </Stack.Group>
    );
  };
  return (
    <Stack.Navigator>{isULoggedIn ? mainStack() : authStack()}</Stack.Navigator>
  );
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
