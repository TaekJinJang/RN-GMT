import { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
// import {RNPickerSelect} from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import { Place } from "../../models/place";
import Btn from "../UI/Btn";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlacesForm = ({ onCreatePlace }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredReview, setEnteredReview] = useState("");
  const [imageData, setImageData] = useState("");
  const [locationData, setLocationData] = useState("");
  const [enteredType, setEnteredType] = useState("");
  const [enteredStar, setEnteredStar] = useState("");
  const Type = ["한식", "중식", "일식", "양식"];
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
        {/* <RNPickerSelect
          value={Type}
          onOpen={() => {
            // 선택창이 열릴때
            Keyboard.dismiss(); //키보드 내림
          }}
          onValueChange={(value, index) => {
            setEnteredType(value);
          }}
          items={(() =>
            //선택할수 있는 값들
            this.state.sdList.map((sd) => ({
              // state에 저장한 리스트를 불러와 label 값과 value 값을 준다.
              label: sd,
              value: sd,
            })))()}
          useNativeAndroidPickerStyle={false} // 안드로이드 기본 스타일을 사용할 것인지
          placeholder={{
            // 값이 없을때 보일 값, 없어도 된다면 이 안의 내용을 지운다. placeholder={{}} 이건 남겨둠.. 이부분까지 지우면 기본값으로 설정됨.
            label: "종류",
            value: null,
          }}
          style={{
            // 스타일은 아래 3가지로 나누어 적용한다
            placeholder: style.sel_placeholder,
            inputAndroid: style.sel_inputAnd,
            inputIOS: style.sel_inputIOS,
          }}
        /> */}
        <Picker>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
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
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  Review: {
    fontWeight: "bold",
    marginBottom: 4,
    marginTop: 40,
  },
  btn: {
    marginBottom: 50,
  },
});
