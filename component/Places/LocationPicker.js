import { Button, Image, StyleSheet, Text, View } from 'react-native';
import OutlineBtn from '../UI/OutLineBtn';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import getMapPreview from '../../util/location';
import { useNavigation } from '@react-navigation/native';

const LocationPicker = () => {
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState();
  console.log(pickedLocation);

  const getLocationHandler = async () => {
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  let locationPreview = <Text>선택한 위치 없음</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }}
      />
    );
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('사용자의 위치 권한을 얻지 못했습니다.');
        return;
      }
    })();
  }, []);
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineBtn icon="location" onPress={getLocationHandler}>
          내 위치 찾기
        </OutlineBtn>
        <OutlineBtn icon="map" onPress={pickOnMapHandler}>
          지도 찾기
        </OutlineBtn>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    height: 200,
    width: '100%',
    marginVertical: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
