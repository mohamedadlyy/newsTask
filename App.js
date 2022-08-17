import React from 'react';
import 'react-native-gesture-handler';
import Home from './src/screens/Home/View/Home';
import Settings from './src/screens/Settings/View/Settings';
import NewsDetails from './src/screens/NewsDetails/View/NewsDetails';
import SplashScreen from './src/screens/SplashScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";
import { Root } from 'native-base';
const AppStackNavigator = createStackNavigator({
  Splash: SplashScreen,
  NewsDetails: {
    screen: NewsDetails,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      gestureEnabled: false

    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      gestureEnabled: false

    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
      gestureEnabled: false

    }
  },



},
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      header: null
    },
  },
);

const App = () => {

  const AppContainer = createAppContainer(AppStackNavigator);
  return (
    <Root>
      <AppContainer />
    </Root>
  );
};

export default App;