import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, Modal, Button, Image, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export const Transection2 = () => {
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
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View>
            {
                regData?.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleNameClick(item)}>
                        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end', margin: 0 }}>
                    <View style={styles.container}>
                        {selectedData && (
                            <View>
                                <Text style={styles.text}>Code: {selectedData.code}</Text>
                                <Text style={styles.text}>Name: {selectedData.name}</Text>

                            </View>
                        )}

                        <View>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Transaction Type:</Text>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 40}}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                            >
                                <Picker.Item label="Receipt" value="Receipt" />
                                <Picker.Item label="Payment" value="Payment" />
                            </Picker>
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
        margin: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },

})  