import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { URL, createNewGroup } from '../services/services';
import { useSelector } from 'react-redux';

export const NewGroup = () => {
    const groupLength=useSelector((state)=>state.group.groupLength)
   // console.log(groupLength)
    const [formData, setFormData] = useState({
        groupName: '',
        amount: '',
        members: '',
    });
    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    // useEffect(()=>{

    // },[groupLength])

    const handleSubmit = async () => {
        console.log(formData)
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
           };    
        try {
            const { data } = await axios.post(`${URL}/create-group`, formData)              
            const { message, success } = data;
            if (success) {
                setFormData({
                    groupName: '',
                    amount: '',
                    members: '',
                })
                alert("New Group Created")
            }
        } catch (error) {
            console.error('Error:', error.message);

        }
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>New Group Creation</Text>
            <TextInput
                style={styles.input}
                placeholder="Group Name"
                onChangeText={(text) => handleChange('groupName', text)}
                value={formData.groupName}
            />
            <TextInput
                style={styles.input}
                placeholder="Amount"
                onChangeText={(text) => handleChange('amount', text)}
                value={formData.amount}
            />
            <TextInput
                style={styles.input}
                placeholder="Number Of Members"
                onChangeText={(text) => handleChange('members', text)}
                value={formData.members}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Exit</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderColor: "red"
    },
    heading: {
        fontSize: 24,
        //fontWeight: 'bold',
        marginBottom: 20,
        color: '#0c3761',
        fontWeight: '500',
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
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

});
