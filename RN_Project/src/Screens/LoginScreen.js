import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from '../../Styles';
import {validate, res} from 'react-email-validator';
import {useDispatch} from 'react-redux';
import {setUserID} from '../Reducers/userSlice';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = props => {
  const [Name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isRegistering, setIsRegistering] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginHandler = () => {
    console.log('loginHandler');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response, response.user.uid);
        dispatch(setUserID({emailId: email, uid: response.user.uid}));
        //navigation.navigate('DashBoardScreen');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const registerHandler = () => {
    console.log('isRegistering' + isRegistering);
    if (!isRegistering) {
      setIsRegistering(true);
      //runOnJS(setIsRegistering)(true);
    }
    console.log('email' + email);
    if (Name && email && password) {
      validate(email);
      if (res) {
        console.log('the email is Valid');
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
      } else {
        console.log('the email is invalid');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.bgImage}
        source={require('/Users/itc-consultant/Documents/GitHub/TestRN/RN_Project/Assets/Images/login-background.jpg')}
      />
      {isRegistering && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputs}
            placeholder="userName"
            value={Name}
            underlineColorAndroid="transparent"
            onChangeText={text => setName(text)}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          onChangeText={text => setEmail(text)}
        />
        <Image
          style={styles.inputIcon}
          source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => setPassword(text)}
        />
        <Image
          style={styles.inputIcon}
          source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}
        />
      </View>
      <TouchableOpacity
        style={styles.btnForgotPassword}
        //onPress={() => showAlert('restore_password')}
      >
        <Text style={styles.btnText}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.loginButton]}
        onPress={loginHandler}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={registerHandler}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
