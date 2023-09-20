import {useRef, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {setUserList} from '../Reducers/userSlice';
import MapsUsersList from './Maps/MapsUsersList';
//import ActionSheet from 'react-native-actions-sheet';
import MessagesList from './MessagesList';
import {registerSheet} from 'react-native-actions-sheet';
import {SheetProvider} from 'react-native-actions-sheet';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

const UsersLocations = ({navigation, route}) => {
  //registerSheet('example-sheet', MessagesList);
  const actionSheetRef = useRef(null);
  const userData = useSelector(state => state.user?.userID);
  const messages = useSelector(state => state.message?.allMessages);
  const [filteredUser, setFilteredUser] = useState('');

  const [usersPlace, setUsersPlace] = useState([]);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firestore()
      .collection('UsersPosition')
      .onSnapshot(querySnapshot => {
        const users = [];
        const userId = [];

        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          const item = data.userId;
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          userId.push(item);
        });
        setUsersPlace(users);
        dispatch(setUserList({usersList: users}));
        console.log('userIds-------', users);
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    console.log('------route?.params------', route?.params);
    if (route?.params) {
      if (route?.params?.lat && route?.params?.long) {
        mapRef.current?.animateToRegion({
          latitude: route?.params?.lat,
          longitude: route?.params?.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
      } else if (route?.params?.userId) {
        console.log('------route?.params------', route?.params);
        setFilteredUser(
          messages.filter(employee => {
            return employee.publisher === route?.params?.userId;
          }),
        );
        console.log('------filteredUser------', filteredUser);
        actionSheetRef.current?.show();
      }
    }
    if (!route?.params) {
      return;
    }
  }, [messages, route?.params]);

  // useCallback(() => {
  //   if (route?.params) {
  //     setFilteredUser(
  //       messages.filter(employee => {
  //         return employee.userId === route?.params?.userId;
  //       }),
  //     );
  //     actionSheetRef.current?.show();
  //   }
  // }, [messages, route?.params]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          ref={mapRef}
          initialRegion={{
            latitude: 37.78825, // Initial map coordinates
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {usersPlace.map(user => (
            <Marker
              draggable
              key={user.author}
              coordinate={{
                latitude: user.currentLatitude,
                longitude: user.currentLongitude,
              }}
              pinColor={user.userColor}
              title={user.userName}
            />
          ))}
        </MapView>
        <MapsUsersList />
        {/* <SheetProvider>
          <MessagesList messages={filteredUser} ref={actionSheetRef} />
        </SheetProvider> */}
        {/* <View>
          <ActionSheet containerStyle={styles.actionSheet} ref={actionSheetRef}>
            <View>
              <Text>Hi</Text>
            </View>
          </ActionSheet>
        </View> */}
        <MessagesList messages={filteredUser} ref={actionSheetRef} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  map: {
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
});

export default UsersLocations;
