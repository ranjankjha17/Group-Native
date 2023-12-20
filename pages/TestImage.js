import React, { useState } from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export const TestImage = () => {
    const [photo, setphoto] = useState(null)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setphoto(result.assets[0].uri);
        }
    };
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
    };

    const handleSubmit = async () => {
        const formData = new FormData()
        if (photo) {
            formData.append('photo', {
                uri: photo,
                type: 'image/jpeg',
                name: 'photo.jpeg',
            });
        }

        const response = await axios.post('http://172.24.0.168:5000/image', formData,{headers})
    }

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={[styles.buttonText, { fontWeight: 'normal' }]}>Choose Photo</Text>
            </TouchableOpacity>
            {photo && (
                <Image source={{ uri: photo }} style={styles.photoPreview} />
            )}

            <Button title='Submit' onPress={handleSubmit}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        flex: 1,
        marginRight: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    photoPreview: {
        width: 200,
        height: 200,
        marginTop: 10,
    },


})