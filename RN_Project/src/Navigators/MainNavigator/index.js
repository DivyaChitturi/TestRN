import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from '../DrawerNavigator';
import ViewProfile from '../../Screens/ViewProfile';

const Stack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <Stack.Group>
      <Stack.Screen name="Home" component={DrawerNavigator} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
    </Stack.Group>
  );
};

export default MainNavigator;
