import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { URL } from '../services/services';

export const Form2 = () => {
    const [selectedName, setSelectedName] = useState('');
    const [regData, setRegData] = useState([])
    //console.log(regData)
    const [selectedValue, setSelectedValue] = useState('');
   // console.log(selectedValue)
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [groupList, setGroupList] = useState([])
    const [bcamount, setBcamount] = useState('');
    const [amount, setAmount] = useState('')
    const [bcPayment, setBCPayment] = useState('')
    //console.log(bcPayment)
    const [formData, setFormData] = useState({
        date: '',
        group: '',
        name: '',
        bcAmount: '',
        intNo: '',
        percentage: '',
        amount: '',
        c_code:''
    });
    useEffect(() => {
        const getGroup = async () => {
            const { data } = await axios.get(`${URL}/get-group`)
            setGroupList(data.data)

        }
        getGroup()
    }, [])
    useEffect(() => {
        async function getRegData() {
            const { data } = await axios.get('https://reactnativeserver.vercel.app/getimage')
            //console.log(data?.data)
            setRegData(data?.data)
        }
        getRegData()
    }, [formData.group])
    const filterRegData = regData.filter((e) => e.groupbc === formData.group)
    console.log(filterRegData)
    // const handleNameSelection = (name) => {
    //     setSelectedName(name);
    //     handleChange('name', name);
    //     formData['name'] = name
    //     console.log(formData.name)
    // };
    const handleNameSelection = (name) => {
        setSelectedName(name);
        handleChange('name', name);
            const selectedItem = filterRegData.find(item => item.name === name);
            if (selectedItem) {
            setFormData(prevState => ({
                ...prevState,
                c_code: selectedItem.code
            }));
        }
    };
    
    const handleChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);
        handleChange('date', currentDate.toDateString())
    };

    const showDatepicker = () => {
        setShowPicker(true);
    };

    const handleSubmit = async () => {
        formData["bcAmount"] = bcamount.toString()
        formData['amount'] = amount.toString()
        formData['bc_payment'] = bcPayment.toString()
        formData['gsum'] = totalSlno,
        formData['user']=''
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        };
        console.log(formData)
        try {
            const { data } = await axios.post(`${URL}/create-form2`, formData)
            const { message, success } = data;
            if (success) {
                setFormData({
                    date: '',
                    group: '',
                    name: '',
                    bcAmount: '',
                    intNo: '',
                    percentage: '',
                    amount: '',
                })
                setSelectedValue('')
                setBcamount('')
                alert("Your data is saved")
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    useEffect(() => {
        // console.log((bcamount * formData.percentage) / 100)
        if (formData.percentage) {
            if(formData.percentage<=100){
                setAmount((parseInt(bcamount) * parseFloat(formData.percentage)) / 100) / filterRegData.length
            }
            else{
                setAmount(parseInt(bcamount) / filterRegData.length)
            }
        }

        

    }, [formData.percentage, amount])

    useEffect(() => {
        if (formData.percentage) {
            if(formData.percentage<=100){
                setBCPayment(bcamount - ((parseInt(bcamount) * parseFloat(formData.percentage)) / 100));
                // setBCPayment(bcamount - amount)

            }
            else{
                setBCPayment(bcamount - amount)
            }
        }
    }, [formData.percentage, bcamount]);

    const totalSlno = filterRegData.reduce((total, currentItem) => {
        if (currentItem.slno && typeof currentItem.slno === 'number') {
            return total + currentItem.slno;
        }
        return total;
    }, 0); // Initial value of total is 0

    console.log("Total Slno:", totalSlno);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>New Form</Text>
            <View style={styles.dateContainer}>
                <Text style={styles.dateLabel}>Date</Text>
                <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
                    <Text>{date.toDateString()}</Text>
                </TouchableOpacity>
            </View>
            {showPicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Group</Text>
                <Text style={styles.label}>{totalSlno}</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedValue(itemValue);
                        handleChange('group', itemValue);
                        const selectedGroup = groupList.find(group => group.groupName === itemValue);
                        setBcamount(selectedGroup ? selectedGroup.amount : '');

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

            {/* <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => handleChange('name', text)}
                value={formData.name}
            /> */}
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>Name</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedName}
                    onValueChange={(itemValue) => handleNameSelection(itemValue)}
                >
                    <Picker.Item label="Select Name" value="" />
                    {filterRegData.map((e) => (

                        <Picker.Item key={e.master_id} label={` (${e.code}) ${e.name}`} value={e.name} />

                    ))}
                </Picker>
            </View>
            <TextInput
                style={styles.input}
                placeholder="BC Amount"
                value={bcamount.toString()}
                editable={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Int No"
                onChangeText={(text) => handleChange('intNo', text)}
                value={formData.intNo}
            />
            <TextInput
                style={styles.input}
                placeholder="%"
                onChangeText={(text) => handleChange('percentage', text)}
                value={formData.percentage}
            />

            <TextInput
                style={styles.input}
                placeholder="Amount"
                // onChangeText={(text) => handleChange('amount', text)}
                value={amount}
                editable={false}

            />
            {/* <Text>{Calculate_amount()}</Text> */}
            <TextInput
                style={styles.input}
                placeholder="BCPayment"
                // onChangeText={(text) => handleChange('bcpayment', text)}
                // value={formData.bcPayment}
                value={bcPayment.toString()}
                editable={false}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>New</Text>
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
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    dateLabel: {
        flex: 1,
        fontSize: 16,
    },
    dateButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '50%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});


