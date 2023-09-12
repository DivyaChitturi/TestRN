import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {signOut} from '../Reducers/userSlice';
import styles from '../../Styles';
import {useSelector} from 'react-redux';

const DashBoardScreen = props => {
  const userData = useSelector(state => state.user);
  console.log(userData);
  console.log('DashBoardScreen');

  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 16, fontWeight: '700'}}>DashBoard Screen</Text>
    </View>
  );
};

export default DashBoardScreen;
