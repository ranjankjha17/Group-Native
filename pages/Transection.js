import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base64 from 'base64-js';
import { View, Text, TouchableOpacity, Modal, Button, Image, StyleSheet, Picker, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { RadioButton } from 'react-native-paper';


export const Transection = () => {
    // const groupName=useSelector(state=>state.group.groupname)
    // console.log(groupName)
    const [selectedData, setSelectedData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [regData, setRegData] = useState([])
    const [value, setValue] = useState('Receipt');
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
            const { data } = await axios.get('https://reactnativeserver.vercel.app/getimage')
            console.log(data?.data)
            setRegData(data?.data)
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
    if (!regData) {
        return (<Text>Loading...</Text>)
    }

    // const filterRegData=regData.filter((e)=>e.groupbc===groupName)
    // console.log(filterRegData)
    return (
        <View>
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
                <View style={{ flex: 1, justifyContent: 'flex-end', margin: 0 }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        {selectedData && (
                            <View style={styles.container}>
                                <Text style={styles.text}>Code: {selectedData.code}</Text>
                                <Text style={styles.text}>Name: {selectedData.name}</Text>
                                {/* <Text style={styles.text}>Aadhaar Number: {selectedData.rrnumber}</Text>
                                <Text style={styles.text}>Cast: {selectedData.cast}</Text>
                                <Text style={styles.text}>Mobile Number: {selectedData.mobileno}</Text>
                                <Text style={styles.text}>ID: {selectedData.id}</Text>
                                <Text style={styles.text}>Group: {selectedData.groupbc}</Text> */}
                                {/* {selectedData?.photo && selectedData?.photo?.data && (
                                    <Image
                                        alt='myphoto'
                                        source={{ uri: getImageURI(selectedData?.photo?.data) }}
                                        style={styles.image}
                                    />
                                )} */}
                                <View>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Transaction Type:</Text>
                                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                            <RadioButton.Android value="Receipt" color="#6200EE" />
                                            <Text style={{ fontSize: 16 }}>Receipt</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <RadioButton.Android value="Payment" color="#6200EE" />
                                            <Text style={{ fontSize: 16 }}>Payment</Text>
                                        </View>
                                    </RadioButton.Group>
                                    {/* <Text style={{ marginTop: 20, fontSize: 16 }}>Selected Option: {value}</Text> */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Amount Type:</Text>
                                    <Picker
                                        selectedValue={amountType}
                                        style={{ height: 50}}
                                        onValueChange={(itemValue, itemIndex) => setAmountType(itemValue)}
                                    >
                                        <Picker.Item label="Credit" value="Credit" />
                                        <Picker.Item label="Debit" value="Debit" />
                                    </Picker>
                                    {/* <Text style={{ marginTop: 20, fontSize: 16 }}>Selected Amount Type: {amountType}</Text> */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Neat:</Text>
                                    <TextInput
                                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
                                        placeholder="Enter text for Neat"
                                        value={neatText}
                                        onChangeText={handleNeatTextChange}
                                    />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Payment Mode:</Text>
                                    <Picker
                                        selectedValue={selectedMode}
                                        style={{ height: 50 }}
                                        onValueChange={(itemValue, itemIndex) => setSelectedMode(itemValue)}
                                    >
                                        <Picker.Item label="Cash" value="Cash" />
                                        <Picker.Item label="UPI" value="UPI" />
                                    </Picker>
                                    {/* <Text style={{ marginTop: 20, fontSize: 16 }}>Selected Mode: {selectedMode}</Text> */}
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Enter Mobile Number:</Text>
                                    <TextInput
                                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                                        onChangeText={handleMobileNumberChange}
                                        value={mobileNumber}
                                        placeholder="Mobile Number"
                                        keyboardType="phone-pad"
                                    // keyboardType="numeric"

                                    />
                                    <Button title="Submit" onPress={handleSubmit} />
                                </View>

                            </View>
                        )}

                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
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