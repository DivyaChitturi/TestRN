import * as React from 'react';
import {View, Text, Button} from 'react-native';

const DashBoardScreen = props => {
  console.log('DashBoardScreen');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 16, fontWeight: '700'}}>DashBoard Screen</Text>
    </View>
  );
};

export default DashBoardScreen;
