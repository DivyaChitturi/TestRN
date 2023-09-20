import React, {forwardRef, memo, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {useSelector} from 'react-redux';

const MessagesList = forwardRef((props, ref) => {
  const userData = useSelector(state => state.user?.userID);
  const screenHeight = Dimensions.get('screen').height;
  const bottomSheetHeight = screenHeight * 0.75;
  const chatBoxAlign = publisher => {
    return userData?.uid === publisher ? 'flex-end' : 'flex-start';
  };

  const onClose = () => {
    ref.current?.hide();
  };

  return (
    <ActionSheet
      containerStyle={styles.actionSheet}
      ref={ref}
      sliderMaxHeight={bottomSheetHeight}
      sliderMinHeight={0}>
      <SafeAreaView
        style={{
          height: bottomSheetHeight,
        }}>
        <FlatList
          data={props.messages}
          renderItem={({item}) => {
            return (
              <View
                style={[
                  styles.chatContainer,
                  {alignItems: chatBoxAlign(item.publisher)},
                ]}>
                <View
                  style={[
                    styles.chatTextBox,
                    {alignItems: chatBoxAlign(item.publisher)},
                  ]}>
                  <Text style={[styles.publisher]}>{item.publisher}</Text>
                  <Text>{item.message}</Text>
                </View>
              </View>
            );
          }}
        />
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => {
            onClose();
          }}>
          <Text style={{color: '#333'}}>Close</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ActionSheet>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  userAvatarContainer: {
    position: 'absolute',
    top: 70,
    right: 10,
    flex: 1,
    gap: 10,
  },
  actionSheet: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#307ecc',
    padding: 18,
    //height: Dimensions.get('screen').height / 2,
  },
  chatContainer: {
    paddingVertical: 5,
    alignItems: 'flex-end',
    //borderWidth: 1,
    //borderColor: 'green',
  },
  publisher: {
    //fontSize: fontSize.medium,
    fontWeight: 'bold',
  },
  chatTextBox: {
    width: '70%',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default MessagesList;
