import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../../Styles';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import MapControl from '../Controls/MapControl';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

const MapColorPicker = props => {
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [color, setColor] = useState('');
  const userData = useSelector(state => state.user);
  console.log('----userData?.userID?.uid------', userData?.userID?.uid);

  const onSelectColor = ({hex}) => {
    console.log(hex);
    setColor(hex);
  };
  const addMarkerDetails = () => {
    MapControl.updateMarkerDetails(
      FirstName,
      LastName,
      color,
      userData?.userID?.uid,
    );
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={require('/Users/itc-consultant/Documents/GitHub/TestRN/RN_Project/Assets/Images/login-background.jpg')}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="First Name"
          value={FirstName}
          underlineColorAndroid="transparent"
          onChangeText={text => setFirstName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Last Name"
          value={LastName}
          underlineColorAndroid="transparent"
          onChangeText={text => setLastName(text)}
        />
      </View>
      <View>
        <ColorPicker
          style={{width: '70%'}}
          value="red"
          onComplete={onSelectColor}>
          <Preview />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>
      </View>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={addMarkerDetails}>
        <Text style={styles.loginText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapColorPicker;
