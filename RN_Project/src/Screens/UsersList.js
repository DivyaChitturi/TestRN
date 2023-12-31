import {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from '../../Styles';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const UsersList = props => {
  const [myPlacesList, setmyPlacesList] = useState([]);
  const userData = useSelector(state => state.user);

  useEffect(() => {
    const subscriber = firestore()
      .collection('UserMyPlaces')
      .onSnapshot(querySnapshot => {
        const users = [];
        const uniqueItems = new Set();
        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          const item = data.userId;
          if (!uniqueItems.has(item)) {
            uniqueItems.add(item);
            users.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          }
        });
        setmyPlacesList(users);
        console.log(users);
      });
    return () => subscriber();
  }, []);
  return (
    <View style={{flex: 1}}>
      <View>
        <Text>Users</Text>
        <FlatList
          data={myPlacesList}
          //keyExtractor={(item, index) => item.key}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.item}
              key={item}
              onPress={() =>
                props.navigation.navigate('ViewProfile', {
                  userId: item.userId,
                  userName: item.userName,
                })
              }>
              <Text style={styles.itemTitle}>{item.author}</Text>
              <Text style={styles.itemDescription}>
                Latitude: {item.latitude}
              </Text>
              <Text style={styles.itemDescription}>
                Longitude: {item.longitude}
              </Text>
              <Text style={styles.itemDescription}>{item.placeName}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
export default UsersList;
