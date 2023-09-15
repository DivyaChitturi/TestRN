import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/LoginScreen';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  const authStack = () => {
    <Stack.Group>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Group>;
  };
  return {authStack};
};

export default AuthNavigator;
