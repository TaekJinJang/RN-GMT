import { useCallback, useState } from 'react';
import { ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import { Place } from '../../models/place';
import Btn from '../UI/Btn';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';

const PlacesForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredReview, setEnteredReview] = useState('');
  const [imageData, setImageData] = useState('');
  const [locationData, setLocationData] = useState('');
  const changeTitleHandler = (enteredTitle) => {
    setEnteredTitle(enteredTitle);
  };
  const changeReviewHandler = (enteredReview) => {
    setEnteredReview(enteredReview);
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
      (review = enteredReview),
      (type = 1),
      (star = 1)
    );
    onCreatePlace(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>이름</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
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
      <View style={styles.btn}>
        <Btn onPress={savePlaceHandler}>맛집 추가하기</Btn>
      </View>
    </ScrollView>
  );
};

export default PlacesForm;

const styles = StyleSheet.create({
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
