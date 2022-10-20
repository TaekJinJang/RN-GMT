import { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OutlineBtn from '../component/UI/OutLineBtn';

const PlaceDetails = ({ route }) => {
  useEffect(() => {}, []);
  //   const selectedPlaceId = route.params.placeId;
  const showOnMapHandler = () => {};

  return (
    <Text>구현중입니다</Text>
    // <ScrollView>
    //   <Image style={styles.image} />
    //   <View style={styles.locationContainer}>
    //     <View style={styles.addressContainer}>
    //       <Text style={styles.address}>주소</Text>
    //     </View>
    //     <OutlineBtn icon="map" onPress={showOnMapHandler}>
    //       지도 보기
    //     </OutlineBtn>
    //   </View>
    // </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
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
