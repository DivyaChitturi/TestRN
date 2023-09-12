import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import styles from '../../Styles';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const MyPlacesScreen = props => {
  const [myPlacesList, setmyPlacesList] = useState([]);
  const userData = useSelector(state => state.user);

  useEffect(() => {
    const subscriber = firestore()
      .collection('UserMyPlaces')
      .where('userID', '==', userData?.isLoggedIn?.emailId)
      .onSnapshot(querySnapshot => {
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setmyPlacesList(users);
        console.log(users);
      });

    return () => subscriber();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={myPlacesList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              key={item}
              onPress={() =>
                props.navigation.navigate('ViewProfile', {
                  //id: item,
                  //name: name,
                })
              }>
              <Text style={styles.itemTitle}>{item.placeName}</Text>
              <Text style={styles.itemDescription}>
                Latitude: {item.latitude.toFixed(5)}
              </Text>
              <Text style={styles.itemDescription}>
                Longitude: {item.longitude.toFixed(5)}
              </Text>
              <Text style={styles.itemDescription}>{item.userName}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View>
        <Text>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => {
              props.navigation.navigate('MapScreen');
            }}>
            <Text style={styles.btnText}>Add Place</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};
export default MyPlacesScreen;
