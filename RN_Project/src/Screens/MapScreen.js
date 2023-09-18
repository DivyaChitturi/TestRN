import {useRef, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LocationHelper from '../Helpers/LocationHelper';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import MapControl from '../Controls/MapControl';
import MapViewHandler from './MapViewHandler';
//import styles from '../../Styles';

const MapScreen = navigation => {
  return (
    <View style={styles.container}>
      <MapViewHandler />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    position: 'absolute',
    //marginTop: Platform.OS === 'ios' ? 40 : 20,
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
