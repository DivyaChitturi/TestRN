import {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';

const markersArray = [
  {lat: 0, lon: 0},
  {lat: 0.5, lon: 0.5},
  {lat: 1, lon: 1},
  {lat: 1.5, lon: 1.5},
  {lat: 2, lon: 2},
  {lat: 2.5, lon: 2.5},
];

const MapControl = forwardRef((props, ref) => {
  const mapRef = useRef(null);

  useImperativeHandle(ref, () => ({
    animateToRegion: customLocationObject => {
      mapRef.current.animateToRegion(customLocationObject);
    },
  }));

  const renderMarkers = () => {
    return markersArray.map((item, index) => {
      return (
        <Marker coordinate={{latitude: item.lat, longitude: item.lon}}>
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
    });
  };

  return (
    <View style={[props.style]}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{flex: 1}}
        ref={mapRef}
        rotateEnabled={false}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        {renderMarkers()}
      </MapView>
    </View>
  );
});

export default MapControl;
