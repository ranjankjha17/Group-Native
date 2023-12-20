import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

export const TestImage2 = () => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.uri);
      }
    });
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await axios.post('http://172.24.0.168:5000/image', formData);

      if (response.status === 200) {
        Alert.alert('Success', 'Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View>
      <Button title="Pick Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      {imageUri && <Button title="Upload Image" onPress={uploadImage} />}
    </View>
  );
};

