import {useRef, useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {setUserList} from '../Reducers/userSlice';

const UsersLocations = ({navigation, route}) => {
  const userData = useSelector(state => state.user?.userID);
  console.log(userData);
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
        dispatch(setUserList({usersList: userId}));
        console.log('userIds-------', userId);
      });

    return () => subscriber();
  }, []);

  const animateToRegion = user => {
    console.log(user.currentLatitude);
    mapRef.current?.animateToRegion({
      latitude: user.currentLatitude,
      longitude: user.currentLongitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };
  return (
    <View style={{flex: 1}}>
      <View></View>
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
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
      </View>
      <View>
        <View style={styles.markerContainer}>
          {usersPlace.map(user => (
            <TouchableOpacity
              key={user.author}
              //style={styles.button}
              onPress={() => animateToRegion(user)}>
              <Text>{user.userName}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default UsersLocations;
