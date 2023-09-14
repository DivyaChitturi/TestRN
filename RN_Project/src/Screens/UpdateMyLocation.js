import React, {useEffect, useCallback} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import LocationHelper from '../Helpers/LocationHelper';

const UpdateMyLocation = () => {
  const uid = useSelector(state => state.user?.userID?.uid);

  useEffect(() => {
    const intervelTime = setInterval(updateLocation, 300000);
    return () => {
      clearInterval(intervelTime);
    };
  }, [updateLocation]);

  // const updateLocation = useCallback(async () => {
  //   try {
  //     LocationHelper.fetchLocation(
  //       async position => {
  //         const {latitude, longitude} = position.coords;
  //         const userId = uid;
  //         await firestore()
  //           .collection('UsersPosition')
  //           .doc(userId)
  //           .set({
  //             author: 'Divya',
  //             currentLatitude: position.coords.latitude,
  //             currentLongitude: position.coords.longitude,
  //             locationTime: Math.floor(Date.now() / 1000),
  //             speed: position.coords.speed,
  //             userId: uid,
  //             userName: 'Divya.ch@gmail.com',
  //           });
  //         console.log('Position updated successfully:', latitude, longitude);
  //       },
  //       error => {
  //         console.error('Error getting location:', error);
  //       },
  //     );
  //   } catch (error) {
  //     console.error('Error updating position:', error);
  //   }
  // }, [uid]);

  const updateLocation = useCallback(async () => {
    try {
      LocationHelper.trackUserLocation(
        async position => {
          const {latitude, longitude} = position.coords;
          const userId = uid;
          await firestore()
            .collection('UsersPosition')
            .doc(userId)
            .set({
              author: 'Divya',
              currentLatitude: position.coords.latitude,
              currentLongitude: position.coords.longitude,
              locationTime: Math.floor(Date.now() / 1000),
              speed: position.coords.speed,
              userId: uid,
              userName: 'Divya.ch@gmail.com',
            });
          console.log('Position updated successfully:', latitude, longitude);
        },
        error => {
          console.error('Error getting location:', error);
        },
      );
    } catch (error) {
      console.error('Error updating position:', error);
    }
  }, [uid]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Location</Text>
      <Button title="Update Now" onPress={updateLocation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default UpdateMyLocation;
