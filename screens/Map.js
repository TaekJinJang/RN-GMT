import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import IconBtn from "../component/UI/IconBtn";
import { useIsFocused } from "@react-navigation/native";

function Map({ navigation, route }) {
  console.log(route.params);

  let initialLocation = route.params && {
    // 상세페이지에서 데이터를 받아왔다면 lat,lng값에 데이터를 넣어주기
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };
  let [touch, setTouch] = useState(true);
  console.log("터치", touch);
  const [mapWidth, setMapWidth] = useState("99%");
  let [selectedLocation, setSelectedLocation] = useState();

  const [initialRegion, setInitialRegion] = useState({
    latitude: initialLocation ? initialLocation.lat : 35.91395373474155,
    longitude: initialLocation ? initialLocation.lng : 127.73829440215488,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  // 안드로이드 showsMyLocationButton 오류떠서 리랜더링 할 수 있도록 만듦
  const updateMapStyle = () => {
    setMapWidth("100%");
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    // 지도를 열때마다 실행
    if (isFocused) {
      updateMapStyle();
      console.log("그냥이펙트", selectedLocation);
      setSelectedLocation(initialLocation);
      // route.params = null;
      if (route.params) {
        route.params = null;
      }
    }
  }, [isFocused]);

  // 현재 위치 받아오기
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert("사용자의 위치 권한을 얻지 못했습니다.");
        return;
      }
    })();
    // if (route.params) {
    //   setInitialLocation(route.params);
    // }
  }, []);

  // 저장 아이콘 띄우기
  useEffect(() => {
    console.log("레이아웃", initialLocation);
    if (initialLocation) {
      setTouch(true);
      // 데이터가 있을땐 읽기전용 지도로 만들기위해 return으로 아래 코드를 인식하지 못하게함
      return navigation.setOptions({
        headerRight: "",
      });
    }
    setTouch(false);
    navigation.setOptions({
      headerRight: () => (
        <IconBtn icon="save" size={24} onPress={savePickedLocationHandler} />
      ),
    });
  }, [isFocused]);

  // 받은 위치를 Add 컴포넌트로 넘겨주기
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("선택된 위치 없음!", "지도를 터치하여 위치를 선택해주세요");
      console.log(selectedLocation);
      return;
    }
    navigation.navigate("Add", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [selectedLocation]);

  // 터치로 위치 경도 받아오기
  const selectLocationHandler = (event) => {
    if (touch) {
      // 데이터가 있을땐 읽기전용 지도로 만들기위해 return으로 아래 코드를 인식하지 못하게함
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
    console.log("위치", selectedLocation);
  };

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
          mapWidth;
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
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
});
