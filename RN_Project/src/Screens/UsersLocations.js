import {useRef, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {setUserList} from '../Reducers/userSlice';
import MapsUsersList from './Maps/MapsUsersList';
import ActionSheet from 'react-native-actionsheet';

const UsersLocations = ({navigation, route}) => {
  let actionSheetRef = useRef();
  const userData = useSelector(state => state.user?.userID);
  console.log(userData);

  const [usersPlace, setUsersPlace] = useState([]);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheetRef.current.show();
  };

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

  const animateToRegion = useEffect(() => {
    if (!route?.params) {
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: route?.params?.lat,
      longitude: route?.params?.long,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  }, [route?.params]);

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
        <MapsUsersList animateToRegion={animateToRegion} />
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
