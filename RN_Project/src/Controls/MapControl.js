import {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const MapControl = forwardRef((props, ref) => {
  const mapRef = useRef(null);
  const [MarkerLocation, setMarkerLocation] = useState('');

  useImperativeHandle(ref, () => ({
    animateToRegion: customLocationObject => {
      mapRef.current.animateToRegion(customLocationObject);
      setMarkerLocation({
        lat: customLocationObject.latitude,
        lon: customLocationObject.longitude,
      });
    },
  }));

  const renderMarkers = () => {
    if (MarkerLocation) {
      return (
        <Marker
          draggable
          coordinate={MarkerLocation}
          pinColor="blue"
          title={''}
          description={''}
        />
      );
    }
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
