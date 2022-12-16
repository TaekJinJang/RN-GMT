import { FlatList, Text, View, StyleSheet, Button } from 'react-native';
import PlacesItem from './PlacesItem';
import { useNavigation } from '@react-navigation/native';
import AddPlace from '../../screens/AddPlace';
import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from 'react';

const PlacesList = ({ places }) => {
  const navigation = useNavigation();

  const selectPlaceHandler = (id) => {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    });
  };
  const [open, setOpen] = useState(false);
  const [enteredType, setEnteredType] = useState('전체보기');
  const [filterType, setFilterType] = useState();

  //  filter함수 쓸 곳
  const filterPlaces = (Type) => {
    if (Type === '전체보기') {
      return setFilterType(places);
    } else {
      setFilterType(
        places.filter((d) => {
          return d.type == Type;
        })
      );
    }
  };

  useEffect(() => {
    filterPlaces(enteredType);
  }, [filterType]);

  const [items, setItems] = useState([
    { label: '한식', value: '한식' },
    { label: '중식', value: '중식' },
    { label: '일식', value: '일식' },
    { label: '양식', value: '양식' },
  ]);
  console.log(places);
  if (!places || places.length === 0) {
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

  console.log(enteredType);

  return (
    <View style={styles.list}>
      <DropDownPicker
        open={open}
        value={enteredType}
        items={items}
        setOpen={setOpen}
        setValue={setEnteredType}
        setItems={setItems}
        placeholder="음식종류"
        modalProps={{
          animationType: 'fade',
        }}
        listMode="SCROLLVIEW"
        modalTitle="선택해주세요."
      />
      <FlatList // 많은 장소를 스크롤로 내릴 수 있게 해줌
        data={filterType}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlacesItem place={item} onSelect={selectPlaceHandler} />
        )}
      />
    </View>
  );
  // models/place 의 형태를 가짐
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
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
