import React, {useEffect, useState} from 'react';
import PubNub from 'pubnub';
import {PubNubProvider, usePubNub} from 'pubnub-react';
import {Text, View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {ChannelList} from '@pubnub/react-native-chat-components';

const pubnub = new PubNub({
  publishKey: 'pub-c-f2919219-ac20-4403-b537-a678b79b4381',
  subscribeKey: 'sub-c-c5ddc634-c6fc-11e7-afd4-56ea5891403c',
  uuid: 'Divya_Chitturi',
});

const PubNubScreen = () => {
  return (
    <PubNubProvider client={pubnub}>
      <Chat currentChannel="space.2ada61db17878cd388f95da34f9">
        <ChannelList
          channels={[
            {
              name: 'ITC',
              custom: {
                profileUrl:
                  'https://www.gravatar.com/avatar/149e60f311749f2a7c6515f7b34?s=256&d=identicon',
              },
              description: 'Everything about movies',
              eTag: 'AbOx6N+6vu3zoAE',
              id: 'space.149e60f311749f2a7c6515f7b34',
              updated: '2020-09-23T09:23:37.175764Z',
            },
            {
              name: 'Divya',
              custom: {
                profileUrl:
                  'https://www.gravatar.com/avatar/2ada61db17878cd388f95da34f9?s=256&d=identicon',
              },
              description: 'Async virtual standup',
              eTag: 'Ab+2+deSmdf/Fw',
              id: 'space.2ada61db17878cd388f95da34f9',
              updated: '2020-09-23T09:23:36.960491Z',
            },
          ]}
        />
      </Chat>
    </PubNubProvider>
  );
};

function Chat() {
  const pubnub = usePubNub();
  const [channels] = useState(['Divya']);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  const handleMessage = event => {
    const message = event.message;

    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      const text = message.text || message;
      //const name = event.publisher + ': ' + text;
      addMessage(messages => [...messages, text]);
    }
  };

  const sendMessage = message => {
    if (message) {
      pubnub
        .publish({channel: channels[0], message})
        .then(() => setMessage(''));
    }
  };

  useEffect(() => {
    pubnub.addListener({message: handleMessage});
    pubnub.subscribe({channels});
  }, [pubnub, channels]);

  return (
    <View>
      <Text>test pubnub</Text>

      <TextInput
        autoComplete="off"
        autoCorrect={false}
        value={message}
        onChangeText={changedText => {
          setMessage(changedText);
        }}
        placeholder="write message"
        style={{
          margin: 10,
          backgroundColor: 'grey',
          color: 'white',
          height: 40,
          padding: 5,
        }}
      />

      <TouchableOpacity
        style={{
          margin: 10,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          height: 44,
        }}
        onPress={() => {
          sendMessage(message);
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Send Message
        </Text>
      </TouchableOpacity>

      <FlatList
        data={messages}
        renderItem={({item, index}) => {
          return (
            <View>
              <Text>{item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

export default PubNubScreen;
