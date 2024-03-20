import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base64 from 'base64-js';
import { ActivityIndicator, View, Text, TouchableOpacity, Modal, Button, Image, StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import { URL } from '../services/services';

export const Transection = () => {
    const [searchCode, setSearchCode] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true); // State to indicate if data is loading
    const [selectedData, setSelectedData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [regData, setRegData] = useState([])
    const [selectedMode, setSelectedMode] = useState('Cash');
    const [mobileNumber, setMobileNumber] = useState('');
    const [amountText, setAmountText] = useState('');
    const [selectedOption, setSelectedOption] = useState('Receipt');
    const [formData, setFormData] = useState({})
    const companyName = useSelector(state => state.auth.user.company)
    const username = useSelector(state => state.auth.user.username)
    const usertype = useSelector(state => state.auth.user.permission)

    const [showMobileInput, setShowMobileInput] = useState(false);

    const handleAmountTextChange = (text) => {
        setAmountText(text);
    };
    const handleMobileNumberChange = (text) => {
        setMobileNumber(text);
    };
    const handleModeChange = (itemValue, itemIndex) => {
        setSelectedMode(itemValue);
        if (itemValue === 'UPI') {
            setShowMobileInput(true);
        } else {
            setShowMobileInput(false);
        }
    };

    const handleSubmit = async () => {
        formData['code'] = selectedData.c_code
        formData['name'] = selectedData.name
        formData['transectionType'] = selectedOption
        // formData['amountType'] = amountType
        formData['paymentMode'] = selectedMode
        formData['amount'] = amountText
        formData['mobilenumber'] = mobileNumber
        formData['company'] = companyName
        formData['group_'] = selectedData?.group_ || '';
        formData['username']=username
        formData['usertype']=usertype
        //console.log('group', selectedData)

        try {
            console.log(formData)
            const { data } = await axios.post(`${URL}/transection`, formData)
            const { message, success } = data;
            if (success) {
                alert('Your data is saved')
                setSelectedOption('')
                // setAmountType('')
                // setSelectedMode('')
                setAmountText('')
                setMobileNumber('')
            }

        } catch (error) {
            console.log(error.response.data.message)
        }
    };

    useEffect(() => {
        async function getImageData() {
            try {
                const { data } = await axios.get(`${URL}/get-client-amount`)
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
        console.log('data',data)
        setSelectedData(data);
        setModalVisible(true);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const filterRegData = regData.filter(e => e.company === companyName)
    //console.log("length",filterRegData)


    const handleSearchCode = (text) => {
        setSearchCode(text);
        if (text === '') {
            setSearchResults(filterRegData);
        } else {
            search();
        }
    };

    const handleSearchName = (text) => {
        setSearchName(text);
        if (text === '') {
            setSearchResults(filterRegData);
        } else {
            search();
        }
    };
    const search = () => {
        let filteredData = filterRegData;
        if (searchCode !== '') {
            filteredData = filteredData.filter(item => item.c_code && item.c_code.includes(searchCode));
        } else if (searchName !== '') {
            const searchNameLower = searchName.toLowerCase();
            filteredData = filteredData.filter(item => item.name && item.name.toLowerCase().includes(searchNameLower))
                .sort((a, b) => a.name.localeCompare(b.name));
        }
        setSearchResults(filteredData);
        console.log(filteredData)
    };

    return (
        <View style={styles.c_container}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <TextInput
                    style={{ height: 40, flex: 1, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginRight: 5, padding: 10 }}
                    placeholder="C_Code"
                    onChangeText={handleSearchCode}
                    value={searchCode}
                />
                <TextInput
                    style={{ height: 40, flex: 2, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
                    placeholder="C_Name"
                    onChangeText={handleSearchName}
                    value={searchName}
                />
            </View>
            {/* <View style={styles.headerRow}>
                <Text style={styles.headerText}>C_Code</Text>
                <Text style={[styles.headerText, { flex: 2 }]}>C_Name</Text>
                <Text style={styles.headerText}>C_Amount</Text>
            </View> */}
            {
                (searchResults.length > 0 ? searchResults : filterRegData)
                    ?.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleNameClick(item)}>
                            <View style={styles.dataRow}>
                                <Text style={styles.dataText}>{item.c_code}</Text>
                                <Text style={[styles.dataText, { flex: 2 }]}>{item.name}</Text>
                                <Text style={styles.dataText}>{item.c_amount}</Text>
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
                                <Text style={styles.text}>Code: {selectedData.c_code}</Text>
                                <Text style={styles.text}>Name: {selectedData.name}</Text>
                            </View>
                        )}

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
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Amount:</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
                                placeholder="Enter Amount"
                                value={amountText}
                                onChangeText={handleAmountTextChange}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Payment Mode:</Text>
                            <Picker
                                selectedValue={selectedMode}
                                style={{ height: 40 }}
                                // onValueChange={(itemValue, itemIndex) => setSelectedMode(itemValue)}
                                onValueChange={handleModeChange}

                            >
                                <Picker.Item label="Cash" value="Cash" />
                                <Picker.Item label="UPI" value="UPI" />
                            </Picker>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                            {showMobileInput && (
                                <View>
                                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Mobile Number:</Text>
                                    <TextInput
                                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                                        onChangeText={handleMobileNumberChange}
                                        value={mobileNumber}
                                        placeholder="Enter Mobile Number"
                                        keyboardType="number-pad"
                                    />
                                </View>
                            )}
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
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        // marginLeft:16,
    },
    dataText: {
        fontSize: 16,
        flex: 1,
    },
    c_container: {
        padding: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },

})  