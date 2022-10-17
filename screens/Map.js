import React, { useState, useEffect, useCallback } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Text, View, StyleSheet, Dimensions, Alert } from 'react-native';
import IconBtn from '../component/UI/IconBtn';

function Map({ navigation }) {
  const [mapWidth, setMapWidth] = useState('99%');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 35.91395373474155,
    longitude: 127.73829440215488,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  // 안드로이드 showsMyLocationButton 오류떠서 리랜더링 할 수 있도록 만듦
  const updateMapStyle = () => {
    setMapWidth('100%');
  };

  // 현재 위치 받아오기
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert('사용자의 위치 권한을 얻지 못했습니다.');
        return;
      }
    })();
  }, []);

  // 마커 위치를 Addplace 페이지로 넘겨주기
  useEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconBtn
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [selectedLocation]);

  // 터치로 위치 경도 받아오기
  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  };
  // 받은 위치를 Add 컴포넌트로 넘겨주기
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('선택된 위치 없음!', '지도를 터치하여 위치를 선택해주세요');
      return;
    }
    navigation.navigate('Add', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [selectedLocation]);

  return (
    <>
      <MapView
        onPress={selectLocationHandler}
        style={styles.mapStyle}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
          updateMapStyle();
        }}
      >
        {selectedLocation && (
          <Marker
            title="지정한 위치"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          ></Marker>
        )}
      </MapView>
    </>
  );
}

export default Map;

const styles = StyleSheet.create({
  mapStyle: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
