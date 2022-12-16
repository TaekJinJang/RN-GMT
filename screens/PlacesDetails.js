import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OutlineBtn from "../component/UI/OutLineBtn";
import { deletePlace, fetchPlaceDetails } from "../util/database";

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();
  const selectedPlaceId = route.params.placeId;
  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.lat,
      initialLng: fetchedPlace.lng,
    });
  };
  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: "자세히보기",
        headerTitleAlign: "center",
      });
    };

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>맛집 정보를 가져오는중 ...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <Text style={styles.title}>맛집 이름 : {fetchedPlace.title}</Text>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>주소 : {fetchedPlace.address}</Text>
        </View>
        <OutlineBtn icon="map" onPress={showOnMapHandler}>
          지도 보기
        </OutlineBtn>
      </View>
      <Text style={styles.star}>별점 : {fetchedPlace.star}</Text>
      <Text style={styles.review}>후기 : {fetchedPlace.review}</Text>
      <View style={styles.btn}>
        <Button
          title="삭제"
          color="red"
          onPress={async () => {
            await deletePlace(selectedPlaceId);
            Alert.alert("맛집 정보가 삭제되었습니다.");
            navigation.pop();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  btn: {
    marginTop: 50,
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  review: { padding: 10, fontWeight: "bold", fontSize: 18 },
  star: { padding: 10, fontWeight: "bold", fontSize: 15, color: "red" },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: "gray",
    // textAlign: 'center',
    fontWeight: "bold",
    fontSize: 16,
  },
});
