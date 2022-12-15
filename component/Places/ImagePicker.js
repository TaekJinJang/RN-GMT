import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { Camera } from "expo-camera";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import * as Permissions from "expo-permissions";
import { useEffect, useState } from "react";
import OutlineBtn from "../UI/OutLineBtn";

const ImagePicker = ({ onImageData }) => {
  const [pickedImage, setPickedImage] = useState(null);
  // 카메라 권한 받아오기
  useEffect(() => {
    async () => {
      await Camera.requestCameraPermissionsAsync();
      let cameraStatus = await Camera.requestCameraPermissionsAsync();
      console.log("카메라권한", cameraStatus);
      if (cameraStatus !== "granted") {
        Alert.alert("이 앱을 사용하려면 카메라 사용 권한이 필요합니다.");
        return false;
      }
    };
  }, []);

  async function takeImageHandler() {
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
    setPickedImage(image.uri);
    onImageData(image.uri);
  }
  let imagePreview = <Text>미리보기</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.img} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imgView}>{imagePreview}</View>
      <OutlineBtn icon="camera" onPress={takeImageHandler}>
        맛집 촬영
      </OutlineBtn>
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
  img: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
