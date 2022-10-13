import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { useEffect, useState } from 'react';

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState(null);
  // 카메라 권한 받아오기
  useEffect(() => {
    async () => {
      let { cameraStatus } = await Camera.requestCameraPermissionsAsync();
      if (cameraStatus !== 'granted') {
        Alert.alert('이 앱을 사용하려면 카메라 사용 권한이 필요합니다.');
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
  }
  let imagePreview = <Text>이미지</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.img} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imgView}>{imagePreview}</View>
      <Button title="촬영" onPress={takeImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    height: 200,
    width: '100%',
    marginVertical: 8,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePicker;
