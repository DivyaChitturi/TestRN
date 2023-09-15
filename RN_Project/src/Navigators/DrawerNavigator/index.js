/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../../Screens/CustomDrawer';
import DashBoardScreen from '../../Screens/DashBoardScreen';
import MyPlacesScreen from '../../Screens/MyPlacesScreen';
import MapScreen from '../../Screens/MapScreen';
import UsersList from '../../Screens/UsersList';
import LocaleScreen from '../../Screens/LocaleScreen';
import MapViewHandler from '../../Screens/MapViewHandler';
import UpdateMyLocation from '../../Screens/UpdateMyLocation';
import UsersLocations from '../../Screens/UsersLocations';
import MapColorPicker from '../../Screens/MapColorPicker';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="DashBoardScreen" component={DashBoardScreen} />
      <Drawer.Screen name="LocaleScreen" component={LocaleScreen} />
      <Drawer.Screen name="MyPlacesScreen" component={MyPlacesScreen} />
      {/* <Drawer.Screen name="MapScreen" component={MapScreen} /> */}
      <Drawer.Screen name="UsersList" component={UsersList} />
      <Drawer.Screen name="MapViewHandler" component={MapViewHandler} />
      <Drawer.Screen name="UpdateMyLocation" component={UpdateMyLocation} />
      <Drawer.Screen name="UsersLocations" component={UsersLocations} />
      <Drawer.Screen name="MapColorPicker" component={MapColorPicker} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
