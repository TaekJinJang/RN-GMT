import {
  launchCameraAsync,
  launchImageLibraryAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { Camera } from "expo-camera";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import { useEffect, useState } from "react";
import OutlineBtn from "../UI/OutLineBtn";
import Btn from "../UI/Btn";

const ImagePicker = ({ onImageData }) => {
  const [pickedImage, setPickedImage] = useState(null);
  // 카메라 권한 받아오기

  async function takeImageHandler() {
    // useEffect(() => {
    //   async () => {
    //     let cameraStatus = await Camera.requestCameraPermissionsAsync();
    //     console.log("카메라권한", cameraStatus);
    //     if (cameraStatus !== "granted") {
    //       Alert.alert("이 앱을 사용하려면 카메라 사용 권한이 필요합니다.");
    //       return false;
    //     }
    //   };
    // }, []);
    const image = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
    setPickedImage(image.uri);
    onImageData(image.uri);
  }

  let imagePreview = (
    <Text style={styles.text}>
      어떤 메뉴가 맛있으셨나요? {"\n"}사진으로 보여주세요!
    </Text>
  );

  if (pickedImage) {
    imagePreview = <Image style={styles.img} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imgView}>{imagePreview}</View>
      <Btn icon="camera" onPress={takeImageHandler}>
        맛집 촬영
      </Btn>
    </View>
  );
};

const styles = StyleSheet.create({
  imgView: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    height: 200,
    width: "100%",
    marginVertical: 8,
    overflow: "hidden",
    borderRadius: 4,
  },
  text: { fontSize: 20, textAlign: "center" },
  img: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
