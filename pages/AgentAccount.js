import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

export const AgentAccount = () => {
    const user = useSelector(state => state.auth.user.username)
    const [loading, setLoading] = useState(true);
    const [transectionList, setTransectionList] = useState([])
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedUserInfo, setSelectedUserInfo] = useState(null);
    const [selectedSheetNumber, setSelectedSheetNumber] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [sendTransectionData, setTransectionData] = useState({
        trans_ids: [],
        type: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://reactnativeserver.vercel.app/get-transection-alldata`);
                console.log(response.data.data)
                setTransectionList(response.data.data); // Assuming your response contains a 'total_amount' property
                //setLoading(false)

            } catch (error) {
                console.log('Error fetching data:', error.response.data.message);
            }
        };

        fetchData();
    }, []); // Specify username as a dependency to trigger the effect when it changes


    const transactionsByUser = {};

    transectionList.forEach(transaction => {
        if (transaction.user_type === 'user' && transaction.user !== '') {
            if (!transactionsByUser.hasOwnProperty(transaction.user)) {
                transactionsByUser[transaction.user] = {
                    transactions: [],
                    sheetnumber: transaction.sheetnumber // Assuming sheetnumber is the same for all transactions of the same user
                };
            }
            transactionsByUser[transaction.user].transactions.push(transaction);
        }
    });

    console.log("trans", transactionsByUser);

    const userSums = {};

    for (const user in transactionsByUser) {
        const userTransactions = transactionsByUser[user].transactions;
        const credit_amount = userTransactions.reduce((sum, transaction) => sum + transaction.credit_amount, 0);
        const debit_amount = userTransactions.reduce((sum, transaction) => sum + transaction.debit_amount, 0);
        const sum = credit_amount - debit_amount;
        userSums[user] = sum;
    }

    const results = [];

    for (const user in userSums) {
        results.push({ user: user, sum: userSums[user], sheetnumber: transactionsByUser[user].sheetnumber });
    }

    console.log(results);

    // const handleUserChange = (itemValue, itemIndex) => {
    //     setSelectedUser(itemValue);
    //     const selected = results.find(item => item.user === itemValue);
    //     setSelectedUserInfo(selected);
    // }
    const handleUserChange = (itemValue, itemIndex) => {
        setSelectedUser(itemValue);
        const selected = results.find(item => item.user === itemValue);
        setSelectedUserInfo(selected);
        const userResults = results.filter(item => item.user === itemValue);
        if (userResults.length > 0) {
            setSelectedSheetNumber(userResults[0].sheetnumber);
            console.log(userResults[0].sheetnumber)
            const filteredData = transectionList.filter(item => item.user === itemValue && item.sheetnumber === userResults[0].sheetnumber);
            setFilteredData(filteredData);
            console.log(filteredData)
        } else {
            setSelectedSheetNumber(null);
            setFilteredData([]);
        }
    }
    const handleSubmit = async () => {
        const trans_ids = filteredData.map(e => e.tran_id)
        console.log(trans_ids)
        sendTransectionData.trans_ids = trans_ids
        sendTransectionData.type = 'deposit'
        sendTransectionData.sheetnumber = parseInt(filteredData[0].sheetnumber) + 1
        // console.log(transectionList[0].sheetnumber+1)
        try {
            console.log(sendTransectionData)
            const { data } = await axios.put(`https://reactnativeserver.vercel.app/update-transaction-type`, sendTransectionData)
            const { message, success } = data;
            if (success) {
                setFilteredData([])
                //setAmount('')
                alert("Your data is deposited")
            }
        } catch (error) {
            console.log('Error:', error.response.data.message);
        }



    }


    return (
        <ScrollView style={styles.container}>
            {/* <Text>AgentAccount</Text> */}
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedUser}
                    onValueChange={handleUserChange}
                >
                    <Picker.Item label="Select User" value={null} />
                    {results.map((item, index) => (
                        <Picker.Item key={index} label={`${item.user} ${item.sum}`} value={item.user} />
                    ))}
                </Picker>
            </View>
            {selectedUserInfo && (
                <View style={styles.selectedUserInfo}>
                    <Text style={styles.heading}>{`User: ${selectedUserInfo.user}`}</Text>
                    <Text style={styles.heading}>{`Sum: ${selectedUserInfo.sum}`}</Text>
                </View>
            )}

            {
                transectionList && filteredData?.map((item) => {
                    return (
                        <View style={styles.dataRow} key={item.tran_id}>
                            <Text style={[styles.dataText, { flex: 2 }]}>{item.name}</Text>
                            <Text style={{ marginRight: 8, marginLeft: 8 }}>{item.c_code}</Text>
                            <Text style={styles.dataText}>{item.mode}</Text>
                            <Text style={styles.dataText}>{item.credit_amount}</Text>
                            <Text style={styles.dataText}>{item.debit_amount}</Text>

                        </View>
                    );
                })
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Deposit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.button} onPress={handlePrint}>
                    <Text style={styles.buttonText}>Print</Text>
                </TouchableOpacity> */}
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 16,
        borderColor: "red"
    },
    heading: {
        fontSize: 16,
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
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    picker: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    pickeritem: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    selectedUserInfo: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        color: '#0c3761',
        fontWeight: '500',
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingBottom: 8
    },

    dataText: {
        fontSize: 16,
        flex: 1,
    },

});


