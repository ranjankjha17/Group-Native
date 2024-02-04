import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base64 from 'base64-js';
import { ActivityIndicator, View, Text, TouchableOpacity, Modal, Button, Image, StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';

export const Transection = () => {
    const [loading, setLoading] = useState(true); // State to indicate if data is loading
    const [selectedData, setSelectedData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [regData, setRegData] = useState([])
    const [selectedValue, setSelectedValue] = useState('Receipt');
    const [amountType, setAmountType] = useState('Credit');
    const [selectedMode, setSelectedMode] = useState('Cash');
    const [mobileNumber, setMobileNumber] = useState('');
    const [neatText, setNeatText] = useState('');

    const handleNeatTextChange = (text) => {
        setNeatText(text);
    };



    const handleMobileNumberChange = (text) => {
        setMobileNumber(text);
    };

    const handleSubmit = () => {
        // Handle submission with the mobile number
        console.log('Submitted mobile number:', mobileNumber);
    };

    useEffect(() => {
        async function getImageData() {
            try {
                const { data } = await axios.get('https://reactnativeserver.vercel.app/getimage')
                console.log(data?.data)
                setRegData(data?.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                // setLoading(false)
            }
        }
        getImageData()
    }, [])

    const handleNameClick = (data) => {
        setSelectedData(data);
        setModalVisible(true);
    };

    const getImageURI = (e) => {
        try {
            const base64Image = base64.fromByteArray(new Uint8Array(e));
            const dataURI = `data:image/jpg;base64,${base64Image}`;
            return dataURI
        } catch (error) {
            console.error('Error converting image data to base64', error);
            return null; // Return null for images that couldn't be processed
        }
    }
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{marginTop:30}}>
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
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                            <Text style={styles.text}>Code: {selectedData.code}</Text>
                            <Text style={styles.text}>Name: {selectedData.name}</Text>
                        </View>
                    )}

                    <View style={{marginBottom:20}}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Set Transaction Type:</Text>
                        <Picker
                            selectedValue={selectedValue}
                            style={{ height: 40 }}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="Receipt" value="Receipt" />
                            <Picker.Item label="Payment" value="Payment" />
                        </Picker>
                    </View>

                    <View style={{marginBottom:20}}>
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
                    <View style={{marginBottom:20}}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Neat:</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
                            placeholder="Enter text for Neat"
                            value={neatText}
                            onChangeText={handleNeatTextChange}
                        />
                    </View>
                    <View style={{marginBottom:20}}>
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
                    <View style={{marginBottom:20}}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter Mobile Number:</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                            onChangeText={handleMobileNumberChange}
                            value={mobileNumber}
                            placeholder="Mobile Number"
                            keyboardType="number-pad"

                        />
                        <Button title="Save" onPress={handleSubmit} />
                    </View>
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        // margin: 10,
        marginTop:0,
        padding: 10,
        paddingTop:0,
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

})  