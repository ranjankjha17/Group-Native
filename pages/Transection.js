import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base64 from 'base64-js';
import { ActivityIndicator, View, Text, TouchableOpacity, Modal, Button, Image, StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { URL } from '../services/services';

export const Transection = () => {
    const [loading, setLoading] = useState(true); // State to indicate if data is loading
    const [selectedData, setSelectedData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [regData, setRegData] = useState([])
    const [selectedValue, setSelectedValue] = useState('Receipt');
    const [amountType, setAmountType] = useState('Credit');
    const [selectedMode, setSelectedMode] = useState('Cash');
    const [mobileNumber, setMobileNumber] = useState('');
    const [amountText, setAmountText] = useState('');
    const [selectedOption, setSelectedOption] = useState('Receipt');
    const [formData, setFormData] = useState({})

    const handleNeatTextChange = (text) => {
        setNeatText(text);
    };
    const handleMobileNumberChange = (text) => {
        setMobileNumber(text);
    };
    const handleSubmit = async () => {
        formData['code'] = selectedData.code
        formData['name'] = selectedData.name
        formData['transectionType'] = selectedOption
        formData['amountType'] = amountType
        formData['paymentMode'] = selectedMode
        formData['amount'] = neatText
        formData['mobilenumber'] = mobileNumber
        // console.log('form data', formData)

        try {
            const { data } = await axios.post(`${URL}/transection`, formData)
            const { message, success } = data;
            if (success) {
                alert('Your data is saved')
                setSelectedOption('')
                setAmountType('')
                // setSelectedMode('')
                setNeatText('')
                setMobileNumber('')
            }

        } catch (error) {
            console.log(error.response.data.message)
        }
    };

    useEffect(() => {
        async function getImageData() {
            try {
                const { data } = await axios.get('https://reactnativeserver.vercel.app/getimage')
                console.log(data?.data)
                setRegData(data?.data)
                setLoading(false)
            } catch (error) {
                console.log(error.response.data.message)
                // setLoading(false)
            }
        }
        getImageData()
    }, [])

    const handleNameClick = (data) => {
        setSelectedData(data);
        setModalVisible(true);
    };

    // const getImageURI = (e) => {
    //     try {
    //         const base64Image = base64.fromByteArray(new Uint8Array(e));
    //         const dataURI = `data:image/jpg;base64,${base64Image}`;
    //         return dataURI
    //     } catch (error) {
    //         console.error('Error converting image data to base64', error);
    //         return null; // Return null for images that couldn't be processed
    //     }
    // }
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ marginTop: 20 }}>
            {
                regData?.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleNameClick(item)}>
                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View>
                    <View style={styles.container}>
                        {selectedData && (
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                <Text style={styles.text}>Code: {selectedData.code}</Text>
                                <Text style={styles.text}>Name: {selectedData.name}</Text>
                            </View>
                        )}

                        {/* <View style={{marginBottom:20}}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Set Transaction Type:</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 40 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Receipt" value="Receipt" />
                            <Picker.Item label="Payment" value="Payment" />
                        </Picker>
                    </View> */}
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Transaction Type:</Text>
                            <RadioButton.Group onValueChange={newValue => setSelectedOption(newValue)} value={selectedOption}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                    <RadioButton.Android value="Receipt" />
                                    <Text style={{ fontSize: 16 }}>Receipt</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton.Android value="Payment" />
                                    <Text style={{ fontSize: 16 }}>Payment</Text>
                                </View>
                            </RadioButton.Group>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Amount Type:</Text>
                            <Picker
                                selectedValue={amountType}
                                style={{ height: 40 }}
                                onValueChange={(itemValue, itemIndex) => setAmountType(itemValue)}
                            >
                                <Picker.Item label="Credit" value="Credit" />
                                <Picker.Item label="Debit" value="Debit" />
                            </Picker>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Amount:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
                                placeholder="Enter Amount"
                                value={amountText}
                                onChangeText={handleNeatTextChange}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Payment Mode:</Text>
                            <Picker
                                selectedValue={selectedMode}
                                style={{ height: 40 }}
                                onValueChange={(itemValue, itemIndex) => setSelectedMode(itemValue)}
                            >
                                <Picker.Item label="Cash" value="Cash" />
                                <Picker.Item label="UPI" value="UPI" />
                            </Picker>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Mobile Number:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                                onChangeText={handleMobileNumberChange}
                                value={mobileNumber}
                                placeholder="Enter Mobile Number"
                                keyboardType="number-pad"
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        // margin: 10,
        marginTop: 0,
        padding: 10,
        paddingTop: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    image: {
        width: 120,
        height: 100,
        marginLeft: 2,
        borderRadius: 5,
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

})  