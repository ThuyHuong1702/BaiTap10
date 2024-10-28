import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, Button } from 'react-native';
import { Camera, useCameraPermissions } from 'expo-camera';

export default function ScanScreen() {
  const [hasScanned, setHasScanned] = useState(false);
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = useCameraPermissions();

  // Log Camera object for debugging
  useEffect(() => {
    console.log('Camera:', Camera);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      if (status !== 'granted') {
        Alert.alert('Permission to access camera was denied');
      }
    })();
  }, [requestPermission]);

  const handleBarCodeScanned = ({ type, data }) => {
    if (!hasScanned) {
      setHasScanned(true);
      Alert.alert(`Barcode Type: ${type}`, `Data: ${data}`, [
        { text: 'OK', onPress: () => setHasScanned(false) },
      ]);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  // Check if permission is loading or not granted
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (permission.status === 'denied') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {permission.status === 'granted' ? (
        <Camera 
          style={styles.camera} 
          type={facing} 
          onBarCodeScanned={handleBarCodeScanned}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Text style={styles.message}>Camera permission not granted.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
