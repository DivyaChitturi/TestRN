import {useRef, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LocationHelper from '../Helpers/LocationHelper';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
//import styles from '../../Styles';

const MapScreen = props => {
  const userData = useSelector(state => state.userID);
  const isULoggedIn =
    typeof userData?.isLoggedIn?.emailId === 'string' ? true : false;
  const [SearchText, setSearchText] = useState('');
  const [Latitude, setLatitude] = useState('');
  const [Longitude, setLongitude] = useState('');
  const [Place, setPlace] = useState('');
  const [UserID, setUserID] = useState(userData);
  const [UserName, setUserName] = useState(userData?.userID?.user?.email);
  const [Location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    LocationHelper.checkLocationPermission(
      () => {
        LocationHelper.trackUserLocation(
          locationObject => {
            console.log(locationObject);

            if (locationObject.coords) {
              // parentControlMapRef.current.animateToCustomLocation({
              //   latitude: locationObject.coords.latitude,
              //   longitude: locationObject.coords.longitude,
              //   latitudeDelta: 0.015,
              //   longitudeDelta: 0.0121,
              // });
            }
          },
          error => {},
        );
      },
      () => {},
    );
  }, []);

  const addPlace = () => {
    try {
      if (Latitude && Longitude) {
        firestore()
          .collection('UserMyPlaces')
          .add({
            userID: UserID,
            userName: UserName,
            longitude: Latitude,
            latitude: Longitude,
            placeName: Place,
          })
          .then(() => {
            console.log('Place added successfully!');
            props.navigation.navigate('MyPlacesScreen');
          });
      } else {
        console.warn('Please provide correct latitude, longitude');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>maps</Text>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{flex: 1}}
          rotateEnabled={false}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={Location}></MapView>
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log(data, details);
              console.log(UserID);
              console.log(UserName);
              setLatitude(details.geometry.location.lat);
              setLongitude(details.geometry.location.lng);
              setPlace(data.structured_formatting.main_text);
              setLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
            }}
            query={{
              key: 'AIzaSyDx2mu64zlhYnMUN0FlZVQPqb4K7aKp8bg',
              language: 'en',
            }}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={addPlace}>
            <Text style={styles.btnText} value={SearchText}>
              Add Place
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});

export default MapScreen;
