import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const getName = async () => {
        const username = await AsyncStorage.getItem('auth')
        return username
    }
    useEffect(() => {
        const username = getName()
        if (username) {
            navigation.navigate('Home');
        }

    }, [])
    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };
    const handleSubmit = async () => {
        if (formData.username && formData.password) {
            try {
                const headers = {
                    Accept: 'application/json',
                };
                const response = await axios.post('https://skybillserver.vercel.app/login', formData, { headers });
                const { data } = response;
                const { success, message, token, username } = data;
                if (success) {
                    dispatch(login(username))
                    setFormData({
                        username: '',
                        password: '',
                    });

                    navigation.navigate('Home');
                    //alert('Success', 'You are logged in successfully');

                }
                // else {
                //     alert('Error', message || 'Login failed');
                // }
            } catch (error) {
                console.log(error.response.data.message)
                alert("Invalid UserName and Password")
            }
        } else {
            alert("Please Fill UserName and Password")
        }
    }
    return (
        <ScrollView contentContainerStyle={LoginStyles.container}>
            <View style={LoginStyles.headingContainer}>
                <Text style={LoginStyles.heading}>Login to</Text>
                <Text style={LoginStyles.heading}>your Account</Text>
            </View>
            <TextInput
                style={LoginStyles.input}
                placeholder="Username"
                onChangeText={(text) => handleChange('username', text)}
                value={formData.username}
            />
            <TextInput
                style={LoginStyles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => handleChange('password', text)}
                value={formData.password}
            />
            <View style={LoginStyles.buttonContainer}>
                <TouchableOpacity style={LoginStyles.button} onPress={handleSubmit}>
                    <Text style={LoginStyles.buttonText}>Log in</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const LoginStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#081b2f',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 1,
        paddingBottom: 1,
    },
    headingContainer: {
        marginBottom: 30
    },
    heading: {
        textAlign: 'center',
        fontWeight: '500',
        color: '#f8f8f8',
        fontSize: 30,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        backgroundColor: "#3b4858",
        borderWidth: 2,
        marginBottom: 10,
        paddingLeft: 10,
        width: '100%',
        fontWeight: "500",
        borderRadius: 5,
        color: '#cfd3d6'
    },
    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        marginTop: 15
    },
    button: {
        backgroundColor: '#fbb718',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    buttonText: {
        color: '#fffdf8',
        textAlign: 'center',
        fontWeight: "500"
    },
});


