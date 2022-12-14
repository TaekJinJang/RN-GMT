import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Styled from 'styled-components/native';
import Map from './screens/Map';
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import PlaceDetails from './screens/PlacesDetails';
import { init } from './util/database';

// SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

function NotificationScreen() {
  return <Text>Notification</Text>;
}

function MessageScreen() {
  return <Text>Message</Text>;
}

const App = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        // DB연결 성공시
        setDbInitialized(true);
        console.log('성공');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (dbInitialized) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [dbInitialized]);

  // if (!dbInitialized) {
  //   return <View onLayout={onLayoutRootView}></View>;
  // }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={{
            title: '홈',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            title: '지도',
            tabBarIcon: ({ color, size }) => (
              <Icon name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddPlace}
          options={{
            title: '맛집 추가',
            tabBarIcon: ({ color, size }) => (
              <Icon name="add" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{
            title: '맛집 모음',
            tabBarIcon: ({ color, size }) => (
              <Icon name="book" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
