import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {setUserID} from './src/Reducers/userSlice';
import RootNavigator from './src/Navigators/RootNavigator';

const Nav = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        //setUser(user);
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
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
