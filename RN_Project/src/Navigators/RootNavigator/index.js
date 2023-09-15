import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setUserID} from '../../Reducers/userSlice';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import LoginScreen from '../../Screens/LoginScreen';
import DrawerNavigator from '../DrawerNavigator';
import ViewProfile from '../../Screens/ViewProfile';
import MainNavigator from '../MainNavigator';
import AuthNavigator from '../AuthNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isULoggedIn = useSelector(state => state.user.isLoggedIn);

  console.log('---------isULoggedIn----------' + isULoggedIn);
  //const [user, setUser] = useState();

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(user => {
  //     if (user) {
  //       setUser(user);
  //       const {uid, email} = user;
  //       const userDataUid = {uid, email};
  //       dispatch(setUserID(userDataUid));
  //       console.log('------userDataUid-from firestore Auth------', userDataUid);
  //     } else {
  //       // User not logged in or has just logged out.
  //     }
  //   });
  //   return subscriber;
  // }, []);

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

export default RootNavigator;
