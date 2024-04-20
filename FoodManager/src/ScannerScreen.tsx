import {
    View,
    StyleSheet,
    TextInput,
    Text,
    Pressable,
    TouchableOpacity,
    Image,
    Button,
    FlatList
  } from "react-native";
  import React, { useState, useRef } from "react";
  import { SearchBar, ListItem } from 'react-native-elements';
  import { Ionicons } from '@expo/vector-icons';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Camera , useCameraDevices, CameraDevice} from 'react-native-vision-camera';

const ScannerScreen = () => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const [device, setDevice] = useState<CameraDevice | undefined>(devices[devices.length-1]);

  const takePicture = async () => {
    if (camera.current) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      console.log(data.uri);
    }};

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} ref={camera} device={device} isActive={true}/>
        <TouchableOpacity onPress={takePicture} style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
      </View>
    );
};

  const styles = StyleSheet.create({
    middle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export {ScannerScreen};