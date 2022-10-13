import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import { Alert, Button, View } from 'react-native';
import * as Permissions from 'expo-permissions';

const ImagePicker = () => {
  // 카메라 권한 받아오기
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('이 앱을 사용하려면 카메라 사용 권한이 필요합니다.');
      console.log(cameraPermissionInformation.status);

      return false;
    }
    return true;
  }
  async function takeImageHandler() {
    const camera = await verifyPermission({});
    if (!camera) {
      return;
    }
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
