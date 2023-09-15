import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const ViewProfile = ({navigation, route}) => {
  // if (route.params != null) {
  const {userId, userName} = route.params;
  // }

  const [myPlacesList, setmyPlacesList] = useState([]);
  const userData = useSelector(state => state.user);
  useEffect(() => {
    const subscriber = firestore()
      .collection('UserMyPlaces')
      .where('userId', '==', userId)
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
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.coverPhoto}
          source={{
            uri: '/Users/itc-consultant/Documents/GitHub/TestRN/RN_Project/Assets/Images/background.jpg',
          }}
        />
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={{
              uri: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
            }}
          />
          <Text style={styles.nameText}>{userName}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          style={styles.container}
          enableEmptySections={true}
          data={myPlacesList}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MapViewHandler', {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    placeName: item.placeName,
                  });
                }}>
                <View style={styles.box}>
                  {/* <Image style={styles.icon} source={{uri: item.image}} /> */}
                  <Text style={styles.title}>{item.placeName}</Text>
                  <Image
                    style={styles.btn}
                    source={{uri: 'https://img.icons8.com/customer/office/40'}}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#EE82EE',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#FF6347',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    color: '#EE82EE',
    marginLeft: 4,
  },
  btn: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
  },
  body: {
    backgroundColor: '#E6E6FA',
  },
  box: {
    padding: 5,
    marginBottom: 2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
  headerContainer: {
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 180,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -70,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ViewProfile;
