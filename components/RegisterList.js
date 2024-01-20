import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base64 from 'base64-js';
import { View, Text, TouchableOpacity, Modal, Button, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export const RegisterList = () => {
    const groupName=useSelector(state=>state.group.groupname)
    console.log(groupName)
    const [selectedData, setSelectedData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [regData, setRegData] = useState([])
    useEffect(() => {
        async function getImageData() {
            const { data } = await axios.get('https://reactnativeserver.vercel.app/getimage')
            //console.log(data?.data)
            setRegData(data?.data)
        }
        getImageData()
    }, [groupName])

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
if(!regData){
    return(<Text>Loading...</Text>)
}

const filterRegData=regData.filter((e)=>e.groupbc===groupName)
console.log(filterRegData)
    return (
        <View>
            {
            filterRegData?.map((item, index) => (
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
                                <Text style={styles.text}>Name: {selectedData.name}</Text>
                                <Text style={styles.text}>Aadhaar Number: {selectedData.rrnumber}</Text>
                                <Text style={styles.text}>Cast: {selectedData.cast}</Text>
                                <Text style={styles.text}>Mobile Number: {selectedData.mobileno}</Text>
                                <Text style={styles.text}>ID: {selectedData.id}</Text>
                                <Text style={styles.text}>Group: {selectedData.groupbc}</Text>
                                {selectedData?.photo && selectedData?.photo?.data && (
                                    <Image
                                        alt='myphoto'
                                        source={{ uri: getImageURI(selectedData?.photo?.data) }}
                                        style={styles.image}
                                    />
                                )}
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