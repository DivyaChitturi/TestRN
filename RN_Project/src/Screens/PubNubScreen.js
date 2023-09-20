import React, {useEffect, useState, useCallback} from 'react';
import PubNub from 'pubnub';
import {PubNubProvider, usePubNub} from 'pubnub-react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../Styles';
import {saveMessage, newMessage} from '../Reducers/messageSlice';

const PubNubScreen = () => {
  const userData = useSelector(state => state.user?.userID);

  const pubnub = new PubNub({
    publishKey: 'pub-c-f2919219-ac20-4403-b537-a678b79b4381',
    subscribeKey: 'sub-c-c5ddc634-c6fc-11e7-afd4-56ea5891403c',
    uuid: userData?.uid,
    //uuid: 'ITC',
  });
  return (
    <PubNubProvider client={pubnub}>
      <Chat />
    </PubNubProvider>
  );
};

function Chat() {
  const pubnub = usePubNub();
  const uid = useSelector(state => state.user?.userID.uid);
  const usersList = useSelector(state => state.user?.UserList?.usersList);
  const [channels] = useState(['ITC', uid]);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [msgFormate, setMsgFormate] = useState([]);
  const dispatch = useDispatch();

  const [senderList, setSenderList] = useState([]);

  //const [input, setInput] = useState('');
  //const [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log('-----usersList-----', usersList);
    if (usersList) {
      let senderUserList = usersList.map(user => ({
        label: user.author,
        value: user.userId,
      }));
      setSenderList(senderUserList);
      console.log(senderList);
    }
  }, [usersList]);
  useEffect(() => {
    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels});
  }, [pubnub, channels]);

  const sendMessage = message => {
    console.log('----Sendvalue---', value);
    if (message) {
      const myMsg = {
        message: message,
        channel: uid,
        publisher: uid,
        timetoken: Math.floor(Date.now() / 1000),
      };
      pubnub.publish({channel: value, message}).then(() => setMessage(''));
      dispatch(saveMessage(myMsg));
    }
  };
  const handleMessage = event => {
    const message = event.message;
    console.log('---------event---------', event);
    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      const text = message.text || message;
      const msg = {
        message: text,
        channel: uid,
        publisher: event.publisher,
        timetoken: event.timetoken,
      };
      addMessage(messages => [...messages, msg]);
      dispatch(newMessage(msg));
    }
  };

  return (
    <View style={styles.chatBoxContainer}>
      <View>
        <Text>Test PubNub</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Enter Text"
          value={message}
          underlineColorAndroid="transparent"
          onChangeText={text => setMessage(text)}
        />
      </View>
      <View style={([styles.dropdown], [styles.dropDownContainer])}>
        <TouchableOpacity>
          <DropDownPicker
            open={open}
            value={value}
            items={senderList}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setSenderList}
            style={styles.dropdown}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.bottom]}>
        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          onPress={() => {
            sendMessage(message);
          }}>
          <Text style={styles.loginText}>Send Message</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={messages}
          renderItem={({item, index}) => {
            return (
              <View key={item.timetoken}>
                <View>
                  <Text>
                    {item.publisher}: {item.message}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

export default PubNubScreen;
