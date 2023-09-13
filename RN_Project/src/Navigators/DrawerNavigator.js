import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../Screens/CustomDrawer';
import DashBoardScreen from '../Screens/DashBoardScreen';
import MyPlacesScreen from '../Screens/MyPlacesScreen';
import MapScreen from '../Screens/MapScreen';
import UsersList from '../Screens/UsersList';
import LocaleScreen from '../Screens/LocaleScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="DashBoardScreen" component={DashBoardScreen} />
      <Drawer.Screen name="LocaleScreen" component={LocaleScreen} />
      <Drawer.Screen name="MyPlacesScreen" component={MyPlacesScreen} />
      <Drawer.Screen name="MapScreen" component={MapScreen} />
      <Drawer.Screen name="UsersList" component={UsersList} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
