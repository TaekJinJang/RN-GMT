import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OutlineBtn from '../component/UI/OutLineBtn';
import { fetchPlaceDetails } from '../util/database';

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();
  const selectedPlaceId = route.params.placeId;
  const showOnMapHandler = () => {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.lat,
      initialLng: fetchedPlace.lng,
    });
  };
  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
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
  console.log(fetchedPlace);
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineBtn icon="map" onPress={showOnMapHandler}>
          지도 보기
        </OutlineBtn>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: 'blue',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
