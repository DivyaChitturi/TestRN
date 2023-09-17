import {Provider} from 'react-redux';
import store from './src/Store/store';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/Navigators/RootNavigator';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
