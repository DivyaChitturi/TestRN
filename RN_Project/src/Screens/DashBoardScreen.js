import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {signOut} from '../Reducers/userSlice';
import styles from '../../Styles';
import {useSelector} from 'react-redux';

const DashBoardScreen = props => {
  const userData = useSelector(state => state.user);
  console.log('userID' + userData?.userID?.uid);
  console.log('DashBoardScreen');

  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={styles.bgImage}
        source={require('/Users/itc-consultant/Documents/GitHub/TestRN/RN_Project/Assets/Images/woman-calculating-bills.jpg')}
      />
      <Text style={{fontSize: 16, fontWeight: '700'}}>DashBoard Screen</Text>
    </View>
  );
};

export default DashBoardScreen;
