import React from 'react';
import {
  Platform
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import {
  Alert
} from "react-native";
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/LinksScreen';
import LinksScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReadText from "../components/ReadText"
import Pointsinfo from "../components/Pointsinfo"
import Openglava from "../components/Openglava"

const config = Platform.select({
  web: {
    headerMode: 'screen'
  },
  default: {},
});

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Pointsinfo:Pointsinfo,
    Openglava:Openglava,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Избранное',

  tabBarIcon: ({
    focused
  }) => ( <
    TabBarIcon focused = {
      focused
    }
    name = {
      Platform.OS === 'ios' ?
      'ios-star' :
        'md-star'
    }
    />
  ),
};

HomeStack.path = 'star';

const tabbarVisible = (navigation) => {
  const { routes } = navigation.state;

  let showTabbar = true;
  routes.forEach((route) => {

    if (route.routeName === 'ReadText') {

      showTabbar = false;
    }
  });

  return showTabbar;
};
const LinksStack = createStackNavigator({
    Links: LinksScreen,
    ReadText: {screen:ReadText, navigationOptions: {header: null},},
    Openglava:Openglava,
    Pointsinfo:Pointsinfo,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Главная',
  tabBarIcon: ({
    focused
  }) => ( <
    TabBarIcon focused = {
      focused
    }
    name = {
      Platform.OS === 'ios' ? 'ios-home' : 'md-home'
    }
    />
  ),
};

LinksStack.path = 'home';

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Pointsinfo:Pointsinfo,
    Openglava:Openglava,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Настройки',
  backgroundColor: 'red',

  tabBarIcon: ({
    focused
  }) => ( <
    TabBarIcon focused = {
      focused
    }
    name = {
      Platform.OS === 'ios' ? 'ios-options' : 'md-options'
    }
    />
  ),
};

SettingsStack.path = 'settings';

const tabNavigator = createBottomTabNavigator({

  Home:HomeStack,
  Links:LinksStack,
  Settings:SettingsStack
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: tabbarVisible(navigation),
    }),
  },
);

tabNavigator.path = '';

export default tabNavigator;
