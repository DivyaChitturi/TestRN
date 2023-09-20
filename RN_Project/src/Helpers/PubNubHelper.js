import PubNub from 'pubnub';
import {useSelector} from 'react-redux';
import {PubNubProvider, usePubNub} from 'pubnub-react';
const PubNubHelper = () => {
  const userData = useSelector(state => state.user?.userID);

  const pubnub = new PubNub({
    publishKey: 'pub-c-f2919219-ac20-4403-b537-a678b79b4381',
    subscribeKey: 'sub-c-c5ddc634-c6fc-11e7-afd4-56ea5891403c',
    uuid: userData?.uid,
    //uuid: 'ITC',
  });
};

export default PubNubHelper;
