import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert, Image, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { URL } from '../services/services';


export const MasterForm = () => {
  const [codeNo, setCodeNo] = useState('')
  const [groupList, setGroupList] = useState([])
  const [selectedValue, setSelectedValue] = useState('');
  const [formData, setFormData] = useState({
    code: '',
    groupbc: '',
    rrnumber: '',
    name: '',
    cast: '',
    mobileno: '',
    id: '',
    photo: null,

  });

  const fetchCode = async () => {
    const { data } = await axios.get(`${URL}/get-code`)
    console.log(data.data)
    setCodeNo(data.data)
  }
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    fetchCode()

  }, [codeNo]);

  useEffect(()=>{
    const getGroup = async () => {
      const { data } = await axios.get(`${URL}/get-group`)
      setGroupList(data.data)

    }
    getGroup()

  })

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleChoosePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
      //console.log(result.assets[0].uri)
      // Use "canceled" instead of "cancelled"
      if (!result.canceled) {
        // Use the "assets" array to access selected assets
        if (result.assets && result.assets.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            photo: result.assets[0].uri,
          }));
        }
      } else {
        console.log('Image selection cancelled');
      }
    } catch (error) {
      console.error('Error selecting photo:', error);
    }
  };

  const handleSubmit = async () => {

    formData["code"] = codeNo
    try {
      const formDataToSend = new FormData();

      // Append form fields to FormData
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // If formData.photo is a valid URI to an image file
      if (formData.photo) {
        formDataToSend.append('photo', {
          uri: formData.photo,
          type: 'image/jpg', // Adjust the type based on the image format
          name: 'photo.jpg',
        });

      }

      const TIMEOUT_DURATION = 10000; // Set your desired timeout duration in milliseconds

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      };
      console.log("jj", formData)
      try {

        // const response = await axios.post('https://reactnativeserver.vercel.app/upload', formDataToSend, { headers});
        //  const response=await axios({
        //   method: 'POST',
        //   url: `http://172.24.0.168:5000/upload`,
        //   data: formDataToSend,
        //   headers:headers
        // })

        const response = await axios.post(`${URL}/upload`, formDataToSend, {
          headers,
        });


        const { data } = response;
        const { success, message } = data;

        if (success) {
          setFormData({
            code: '',
            groupbc: '',
            rrnumber: '',
            name: '',
            cast: '',
            mobileno: '',
            id: '',
            photo: null,
          });
          setSelectedValue('')
          setCodeNo('')
          alert("Your form is submitted")
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error submitting form1:', error);
          console.error('Full error object:', error);

          // You can also log specific properties of the error object
          console.error('Error response data:', error.response?.data);
          console.error('Error status:', error.response?.status);

        }

      }

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };




  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Master Form</Text>
      <View style={styles.codeContainer}>
        <Text style={{ flex: 1 }}>Code</Text>
        <Text style={{ flex: 1 }}>{codeNo}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Group</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            handleChange('groupbc', itemValue);

          }}
        >
          <Picker.Item label="Select Group" value="" />
          {groupList?.map((element) => (
            <Picker.Item
              key={element.group_id}
              label={element.groupName}
              value={element.groupName}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Aadhaar Number"
        onChangeText={(text) => handleChange('rrnumber', text)}
        value={formData.rrnumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => handleChange('name', text)}
        value={formData.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Cast"
        onChangeText={(text) => handleChange('cast', text)}
        value={formData.cast}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        onChangeText={(text) => handleChange('mobileno', text)}
        value={formData.mobileno}
      />
      <TextInput
        style={styles.input}
        placeholder="ID"
        onChangeText={(text) => handleChange('id', text)}
        value={formData.id}
      />
      <View style={styles.photoContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
          <Text style={[styles.buttonText, { fontWeight: 'normal' }]}>Choose Photo</Text>
        </TouchableOpacity>
        {formData.photo && (
          <Image source={{ uri: formData.photo }} style={styles.photoPreview} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderColor: "red",
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
  
  photoContainer: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    width: '100%',
  },

  photoPreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    width: '55%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,

  }
});
