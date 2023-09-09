import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../../Styles';

const MyPlacesScreen = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 16, fontWeight: '700'}}>MyPlaces Screen</Text>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={() => {
          props.navigation.navigate('MapScreen');
        }}>
        <Text style={styles.loginText}>Add Place</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyPlacesScreen;
