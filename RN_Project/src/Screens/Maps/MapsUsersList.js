import {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const MapsUsersList = () => {
  const [usersPlace, setUsersPlace] = useState([]);
  const usersList = useSelector(state => state.user?.UserList?.usersList);
  const messages = useSelector(state => state.message?.allMessages);
  const [msgFlag, setMsgFlag] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    setUsersPlace(usersList);
  }, [usersList, usersPlace]);
  useEffect(
    useCallback => {
      if (messages) {
        setMsgFlag(true);
      }
    },
    [messages, msgFlag, usersList, usersPlace],
  );
  return (
    <View style={styles.mapsUsersContainer}>
      {usersPlace != null && usersPlace.length
        ? usersPlace.map((user, idx) => {
            return (
              <View style={styles.mapUsersinnerContainer} key={idx.toString()}>
                {user.userId !== 'ITC' ? (
                  <TouchableOpacity>
                    <View>
                      <Text>{user.author}</Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('UsersLocations', {
                            lat: user.currentLatitude,
                            long: user.currentLongitude,
                          });
                        }}
                        //onPress={() => props.animateToRegion(user)}
                      >
                        {/* <TouchableOpacity onPress={() => showLocation(user)}> */}
                        {user.author === 'SAN' || user.author === 'Divya' ? (
                          <Image
                            style={styles.mapUserImageIcon}
                            source={{
                              uri: '/Users/itc-consultant/Documents/GitHub/TestRN/RN_Project/Assets/Images/woman.png',
                            }}
                          />
                        ) : (
                          <Image
                            style={styles.mapUserImageIcon}
                            source={{
                              uri: '/Users/itc-consultant/Documents/GitHub/TestRN/RN_Project/Assets/Images/man-1.png',
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={styles.badgeContainer}>
                      {messages.some(
                        message => message.publisher === user.userId,
                      ) && (
                        <Image
                          style={styles.mapUserImageIcon}
                          source={{
                            uri: '/Users/itc-consultant/Documents/GitHub/TestRN/RN_Project/Assets/Images/UnreadMsg.png',
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })
        : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mapsUsersContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flex: 1,
    gap: 10,
    zIndex: 2,
  },
  mapUsersinnerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  badgeContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  mapUserImageIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center',
  },
});
export default MapsUsersList;
