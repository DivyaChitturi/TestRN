import {useRef, useState, forwardRef} from 'react';
import {View} from 'react-native';
import LocationHelper from '../Helpers/LocationHelper';

const MapControl = forwardRef((props, ref) => {
  const mapRef = useRef(null);

  useEffect(() => {
    LocationHelper.checkLocationPermission(
      () => {
        LocationHelper.trackUserLocation(
          locationObject => {
            console.log(locationObject);
            if (locationObject.coords) {
              mapRef.current.animateToCustomLocation({
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

  const updatePosition = () => {
    LocationHelper.checkLocationPermission(() => {
      LocationHelper.fetchLocation(position => {
        console.log(position);
        firestore()
          .collection('UsersPosition')
          .doc(userID)
          .set({
            author,
            currentLatitude: latitude,
            currentLongitude: longitude,
            locationTime: getUnixTimeStamp(),
            speed: 1,
            userId: uid,
            userName: author,
          })
          .then(() => {
            console.log('User position added!');
          });
      });
    });
  };
  const getMyCurrentLocation = () => {
    LocationHelper.checkLocationPermission(() => {
      LocationHelper.fetchLocation(position => {
        console.log(position);
      });
    });
  };
  return <View></View>;
});
export default MapControl;
