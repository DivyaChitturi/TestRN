import firestore from '@react-native-firebase/firestore';

class MapControl {
  updateMarkerDetails = (FirstName, LastName, color, uid) => {
    console.log(FirstName, LastName, color, uid);
    try {
      if (FirstName && LastName && color && uid) {
        firestore()
          .collection('UsersPosition')
          .doc(uid)
          .update({
            firstName: FirstName,
            lastName: LastName,
            userColor: color,
          })
          .then(() => {
            console.log('Marker Details added successfully!');
          });
      } else {
        console.warn('Please provide correct Marker Details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
}
export default new MapControl();
