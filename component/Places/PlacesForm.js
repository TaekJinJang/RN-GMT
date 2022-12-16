import { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Place } from '../../models/place';
import Btn from '../UI/Btn';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

const PlacesForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [imageData, setImageData] = useState('');
  const [locationData, setLocationData] = useState('');
  const [enteredType, setEnteredType] = useState('');
  const [enteredStar, setEnteredStar] = useState('');

  const [open, setOpen] = useState(false);
  const [starOpen, setStarOpen] = useState(false);

  const [items, setItems] = useState([
    { label: '한식', value: '한식' },
    { label: '중식', value: '중식' },
    { label: '일식', value: '일식' },
    { label: '양식', value: '양식' },
  ]);
  const [starItems, setStarItems] = useState([
    { label: '★', value: '★' },
    { label: '★★', value: '★★' },
    { label: '★★★', value: '★★★' },
    { label: '★★★★', value: '★★★★' },
    { label: '★★★★★', value: '★★★★★' },
  ]);
  const changeTitleHandler = (enteredTitle) => {
    setEnteredTitle(enteredTitle);
  };
  const changeReviewHandler = (enteredReview) => {
    setEnteredReview(enteredReview);
  };
  const changeTypeHandler = (enteredType) => {
    setEnteredType(enteredType);
  };
  const changeStarHandler = (enteredStar) => {
    setEnteredStar(enteredStar);
  };
  const imageDataHandler = (imageUri) => {
    setImageData(imageUri);
  };

  const locationDataHandler = useCallback((location) => {
    setLocationData(location);
  }, []);

  const savePlaceHandler = () => {
    const placeData = new Place(
      (title = enteredTitle),
      (imageUri = imageData),
      (location = locationData),
      // (address = locationData.address),
      (review = enteredReview),
      (type = enteredType),
      (star = enteredStar)
    );
    onCreatePlace(placeData);
  };

  console.log(enteredStar);
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
        <Text style={styles.label}>분류</Text>
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
      </View>
      <ImagePicker onImageData={imageDataHandler} />
      <LocationPicker onLocationData={locationDataHandler} />
      <Text style={styles.Review}>후기</Text>
      <TextInput
        style={styles.input}
        onChangeText={changeReviewHandler}
        value={enteredReview}
      />
      <Text style={styles.Review}>별점</Text>
      <DropDownPicker
        style={styles.star}
        open={starOpen}
        value={enteredStar}
        items={starItems}
        setOpen={setStarOpen}
        setValue={setEnteredStar}
        setItems={setStarItems}
        placeholder="별점"
        modalProps={{
          animationType: 'fade',
        }}
        listMode="SCROLLVIEW"
        modalTitle="선택해주세요."
      />

      <View style={styles.btn}>
        <Btn onPress={savePlaceHandler}>맛집 추가하기</Btn>
      </View>
    </ScrollView>
  );
};

export default PlacesForm;

const styles = StyleSheet.create({
  star: {
    color: 'yellow',
  },
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  Review: {
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 40,
  },
  btn: {
    marginBottom: 50,
  },
});
