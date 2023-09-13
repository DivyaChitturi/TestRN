import {useRef, useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const MapViewHandler = ({navigation, route}) => {
  const userData = useSelector(state => state.user.userID);
  const [SearchText, setSearchText] = useState('');
  const [Latitude, setLatitude] = useState('');
  const [Longitude, setLongitude] = useState('');
  const [Place, setPlace] = useState('');
  const [Location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const mapRef = useRef(null);

  useEffect(() => {
    console.log('route.params', route.params);
    if (route.params && route.params.latitude && route.params.longitude) {
      console.log(route.params, 'route');
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: route.params.latitude,
          longitude: route.params.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      }
      setLocation({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [route.params]);

  const addPlace = () => {
    try {
      if (Latitude && Longitude) {
        firestore()
          .collection('UserMyPlaces')
          .add({
            //userId, 	userName,	latitude, 	longitude, 	placeName,	author
            userId: userData?.uid,
            userName: userData?.email,
            longitude: Longitude,
            latitude: Latitude,
            placeName: Place,
            author: 'Divya',
          })
          .then(() => {
            console.log('Place added successfully!');
            navigation.navigate('MyPlacesScreen');
          });
      } else {
        console.warn('Please provide correct latitude, longitude');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderMarkers = (lat, lon) => {
    return (
      <Marker coordinate={{latitude: lat, longitude: lon}}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: 'red',
          }}>
          <Text>a</Text>
        </View>
      </Marker>
    );
  };
  const onMapReady = useCallback(() => {
    setIsMapReady(true);
  }, []);
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
          initialRegion={Location}
          //onMapReady={onMapReady}
          ref={mapRef}></MapView>
        <View style={styles.searchBox}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details = null) => {
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

export default MapViewHandler;