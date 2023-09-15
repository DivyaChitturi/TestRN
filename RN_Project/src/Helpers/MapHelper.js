// import {forwardRef} from 'react';
// import firestore from '@react-native-firebase/firestore';
// import {useSelector} from 'react-redux';

// const MapHelper = forwardRef((props, ref) => {
//   const uid = useSelector(state => state.user?.userID?.uid);

//   const addMarkerDetails = (FirstName,LatName,color) => {
//     try {
//       if (FirstName && LastName && color && userData?.userID?.uid) {
//         firestore()
//           .collection('UsersPosition')
//           .doc(userData?.userID?.uid)
//           .update({
//             firstName: FirstName,
//             lastName: LastName,
//             color: color,
//           })
//           .then(() => {
//             console.log('Marker Details added successfully!');
//           });
//       } else {
//         console.warn('Please provide correct Marker Details');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
// });
// export default MapHelper;
