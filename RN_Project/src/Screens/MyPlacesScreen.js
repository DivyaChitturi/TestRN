import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from '../../Styles';
import firestore from '@react-native-firebase/firestore';

const MyPlacesScreen = props => {
  const [myPlacesList, setmyPlacesList] = useState([]);

  useEffect(() => {
    fetchMyPlaces();
  }, []);

  const fetchMyPlaces = async () => {
    try {
      const myPlacesCollection = await firestore()
        .collection('UserMyPlaces')
        .get();

      setmyPlacesList(myPlacesCollection._docs);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 16, fontWeight: '700'}}>MyPlaces Screen</Text>
      <FlatList
        data={myPlacesList}
        renderItem={({item, index}) => {
          console.log(item);

          return (
            <View
              style={{
                height: 60,
                marginHorizontal: 80,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text>{item._data.userId}</Text>
              <Text>{item._data.userName}</Text>
            </View>
          );
        }}
      />
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
