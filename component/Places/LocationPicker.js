import { Button, Image, StyleSheet, Text, View } from "react-native";
import OutlineBtn from "../UI/OutLineBtn";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import getMapPreview, { getAddress } from "../../util/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import Btn from "../UI/Btn";

const LocationPicker = ({ onLocationData }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const [pickedLocation, setPickedLocation] = useState();

  const getLocationHandler = async () => {
    let location = await Location.getCurrentPositionAsync({});

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map");
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
      if (status !== "granted") {
        setErrorMsg("사용자의 위치 권한을 얻지 못했습니다.");
        return;
      }
    })();
  }, []);
  // 지도에서 찍은 마커 위치 받아오기
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  // 변경된 주소 데이터 받아오기
  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onLocationData({ ...pickedLocation, address: address });
      }
    };
    handleLocation();
  }, [pickedLocation, onLocationData]);
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <Btn icon="location" onPress={getLocationHandler}>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;내 위치 찾기 &nbsp; &nbsp; &nbsp;
          &nbsp;
        </Btn>
        <Btn icon="map" onPress={pickOnMapHandler}>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;지도 찾기 &nbsp; &nbsp; &nbsp;
          &nbsp;
        </Btn>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    height: 200,
    width: "100%",
    marginVertical: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
