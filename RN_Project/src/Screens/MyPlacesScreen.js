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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View Style={{backgroundColor: 'red', flex: 1}}>
        <FlatList
          data={myPlacesList}
          renderItem={({item}) => (
            <View style={styles.cardView}>
              <Text style={styles.itemTitle}>{item.placeName}</Text>
              <Text style={styles.itemDescription}>
                Latitude: {item.latitude.toFixed(5)}
              </Text>
              <Text style={styles.itemDescription}>
                Longitude: {item.longitude.toFixed(5)}
              </Text>
              <Text style={styles.itemDescription}>{item.userName}</Text>
            </View>
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            props.navigation.navigate('MapScreen');
          }}>
          <Text style={styles.btnText}>Add Place</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   add: {
//     backgroundColor: 'green',
//     height: 50,
//     width: 300,
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     elevation: 20,
//     borderRadius: 10,
//   },
//   cardView: {
//     padding: 20,
//     margin: 8,
//     borderRadius: 8,
//   },
//   itemTitle: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   itemDescription: {
//     fontSize: 14,
//     color: '#777',
//   },
// });

export default MyPlacesScreen;
