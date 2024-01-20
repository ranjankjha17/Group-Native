import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base64 from 'base64-js';
import { View, Text, TouchableOpacity, Modal, Button,Image } from 'react-native';

export const NameList = () => {
    const [selectedData, setSelectedData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [regData, setRegData] = useState([])
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

  const getImageURI=(e)=>{
    try {
      const base64Image = base64.fromByteArray(new Uint8Array(e));
      const dataURI = `data:image/jpg;base64,${base64Image}`;
      return dataURI
    } catch (error) {
      console.error('Error converting image data to base64', error);
      return null; // Return null for images that couldn't be processed
    }
  }

    return (
        <View>
            {regData.map((item, index) => (
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
                            <View>
                                <Text>Name: {selectedData.name}</Text>
                                {selectedData?.photo && selectedData?.photo?.data && (
                                    <Image
                                    alt='myphoto'
                                    source={{ uri: getImageURI(selectedData?.photo?.data) }}
                                    style={{ width: 120, height: 100, marginLeft: 2}}
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

