import {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapControl from '../Controls/MapControl';
import LocationHelper from '../Helpers/LocationHelper';

const MapScreen = () => {
  useEffect(() => {
    LocationHelper.checkLocationPermission(
      () => {
        LocationHelper.trackUserLocation(
          locationObject => {
            console.log(locationObject);

            if (locationObject.coords) {
              parentControlMapRef.current.animateToCustomLocation({
                latitude: locationObject.coords.latitude,
                longitude: locationObject.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
            }
          },
          error => {},
        );
      },
      () => {},
    );
  }, []);

  const parentControlMapRef = useRef(null);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text>maps</Text>
        <MapControl ref={parentControlMapRef} style={{flex: 1}} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              parentControlMapRef.current.animateToCustomLocation({
                latitude: 37.3346437,
                longitude: -122.0138429,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
            }}
            style={{
              left: 10,
              right: 10,
              bottom: 30,
              backgroundColor: 'green',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              width: 70,
              height: 70,
              margin: 4,
            }}>
            <Text>Apple HQ</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              parentControlMapRef.current.animateToCustomLocation({
                latitude: 51.5260337,
                longitude: -0.0880577,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
            }}
            style={{
              left: 10,
              right: 10,
              bottom: 30,
              backgroundColor: 'yellow',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              width: 70,
              height: 70,
              margin: 4,
            }}>
            <Text>ITC Office</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              parentControlMapRef.current.animateToCustomLocation({
                latitude: 27.1751495,
                longitude: 78.0395619,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              });
            }}
            style={{
              left: 10,
              right: 10,
              bottom: 30,
              backgroundColor: 'pink',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              width: 70,
              height: 70,
              margin: 4,
            }}>
            <Text>TajMahal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;
