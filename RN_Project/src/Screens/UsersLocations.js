import {useRef, useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const UsersLocations = ({navigation, route}) => {
  const userData = useSelector(state => state.user?.userID);
  console.log(userData);
  const [usersPlace, setUsersPlace] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('UsersPosition')
      //.where('userId', '==', userData?.userID?.uid)
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setUsersPlace(users);
        console.log(users);
      });

    return () => subscriber();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825, // Initial map coordinates
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {usersPlace.map(user => (
            <Marker
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
