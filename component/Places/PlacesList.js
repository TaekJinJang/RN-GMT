import { FlatList, Text, View, StyleSheet, Button } from 'react-native';
import PlacesItem from './PlacesItem';
import { useNavigation } from '@react-navigation/native';
import AddPlace from '../../screens/AddPlace';

const PlacesList = ({ places }) => {
  const navigation = useNavigation();
  if (!places || PlacesList.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          아직 장소가 추가되지 않았습니다.{'\n'} 나만의 맛집을 추가해보세요 !
        </Text>
        <Button
          style={styles.fallbackBtn}
          title="맛집 추가하러 가기"
          onPress={() => navigation.navigate('Add')}
        ></Button>
      </View>
    );
  }
  return (
    <FlatList // 많은 장소를 스크롤로 내릴 수 있게 해줌
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlacesItem place={item} />}
    />
  );
  // models/place 의 형태를 가짐
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
  },
  fallbackBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    fontSize: 30,
  },
});
