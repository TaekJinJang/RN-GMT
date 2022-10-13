import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { Alert, Button, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { useEffect } from 'react';

const ImagePicker = () => {
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
  }
  return (
    <View>
      <View></View>
      <Button title="촬영" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;
