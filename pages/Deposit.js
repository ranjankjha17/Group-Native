import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import * as Print from 'expo-print';

const Deposit = () => {
    const user = useSelector(state => state.auth.user.username)
    //const user = 'abc'
    const [amount, setAmount] = useState('')
    const [loading, setLoading] = useState(true);
    const [transectionList, setTransectionList] = useState([])
    const [sendTransectionData,setTransectionData]=useState({
        trans_ids:[],
        type:'',
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://reactnativeserver.vercel.app/get-calculate-amountOfUser?user=${user}`);
                console.log(response.data.data)
                setAmount(response.data.data); // Assuming your response contains a 'total_amount' property
                setLoading(false)

            } catch (error) {
                console.log('Error fetching data:', error.response.data.message);
            }
        };

        fetchData();
    }, [user]); // Specify username as a dependency to trigger the effect when it changes

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://reactnativeserver.vercel.app/get-transection?user=${user}`);
                console.log(response.data.data)
                setTransectionList(response.data.data); // Assuming your response contains a 'total_amount' property
                //setLoading(false)

            } catch (error) {
                console.log('Error fetching data:', error.response.data.message);
            }
        };

        fetchData();
    }, [user]); // Specify username as a dependency to trigger the effect when it changes


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    const UPIList = transectionList.filter(e => e.mode === 'UPI')
    const UPIAmount = UPIList.reduce((sum, transaction) => sum + transaction.credit_amount, 0);
    console.log(UPIAmount)

    const cashList = transectionList.filter(e => e.mode === 'Cash')
    const cash_credit_amount = cashList.reduce((sum, transaction) => sum + transaction.credit_amount, 0);
    //const cashList = transectionList.filter(e => e.mode === 'Cash')
    const cash_debit_amount = cashList.reduce((sum, transaction) => sum + transaction.debit_amount, 0);
    const cashAmount = cash_credit_amount - cash_debit_amount
    console.log(cashAmount)

    const handleSubmit = async() => {
        const trans_ids=transectionList.map(e=>e.tran_id)
        console.log(trans_ids)
        sendTransectionData.trans_ids=trans_ids
        sendTransectionData.type='deposit'
        try {
            console.log(sendTransectionData)
            const { data } = await axios.put(`https://reactnativeserver.vercel.app/update-transaction-type`, sendTransectionData)
            const { message, success } = data;
            if (success) {
                // setFormData({
                //     date: '',
                //     group: '',

                // })
                alert("Your data is updated")
            }
        } catch (error) {
            console.log('Error:', error.response.data.message);
        }



    }
    const handlePrint = async () => {
        try {
            //const printBillData = await getPrintBill()
            const htmlContent = generateHTMLContent(transectionList);
            await Print.printAsync({ html: htmlContent });

        } catch (error) {
            console.log("error", error.response.data.message);
        }
    }
    // const generateHTMLContent = (data) => {
    //     return `
    //     <div style="display: flex; justify-content: space-between; font-size: 32px;">
    //       <p style="display: flex; justify-content: space-between;flex:1;">C_Code</p>
    //       <p style="display: flex; justify-content: space-between;flex:1;">Name</p>
    //       <p style="display: flex; justify-content: space-between;flex:1;">Mode</p>
    //       <p style="display: flex; justify-content: space-between;flex:1;">Credit Amount</p>
    //       <p style="display: flex; justify-content: space-between;flex:1;">Debit Amount</p>

    //     </div>
    //     ${data.map(item => `
    //       <div style="display: flex; justify-content: space-between; font-size: 32px;">
    //         <p style="display: flex; justify-content: space-between;flex:1;">${item.c_code}</p>
    //         <p style="display: flex; justify-content: space-between;flex:1;">${item.name}</p>
    //         <p style="display: flex; justify-content: space-between;flex:1;">${item.mode}</p>
    //         <p style="display: flex; justify-content: space-between;flex:1;">${item.credit_amount}</p>
    //         <p style="display: flex; justify-content: space-between;flex:1;">${item.debit_amount}</p>
    //       </div>
    //     `).join('')}
    //     <hr style="border-top: 2px solid black;">

    //   `;
    // }

    const generateHTMLContent = (data) => {
        // Calculate total credit and debit amounts
        const UPIList = transectionList.filter(e => e.mode === 'UPI')
        const UPIAmount = UPIList.reduce((sum, transaction) => sum + transaction.credit_amount, 0);
        //console.log(UPIAmount)
    
        const cashList = transectionList.filter(e => e.mode === 'Cash')
        const cash_credit_amount = cashList.reduce((sum, transaction) => sum + transaction.credit_amount, 0);
        //const cashList = transectionList.filter(e => e.mode === 'Cash')
        const cash_debit_amount = cashList.reduce((sum, transaction) => sum + transaction.debit_amount, 0);
        const cashAmount = cash_credit_amount - cash_debit_amount
       // console.log(cashAmount)
    
        // Generate HTML content for data
        const dataHTML = data.map(item => `
          <div style="display: flex; justify-content: space-between; font-size: 32px;">
            <p style="display: flex; justify-content: space-between; flex:1;">${item.c_code}</p>
            <p style="display: flex; justify-content: space-between; flex:1;">${item.name}</p>
            <p style="display: flex; justify-content: space-between; flex:1;">${item.mode}</p>
            <p style="display: flex; justify-content: space-between; flex:1;">${item.credit_amount}</p>
            <p style="display: flex; justify-content: space-between; flex:1;">${item.debit_amount}</p>
          </div>
        `).join('');

        // Generate HTML content for totals
        const totalsHTML = `
          <div style="display: flex; justify-content: space-between; font-size: 32px;">
            <p style="display: flex; justify-content: space-between; flex:1;"><strong>UPI:${UPIAmount}</strong></p>
            <p style="display: flex; justify-content: space-between; flex:1;"><strong>Cash:${cashAmount}</strong></p>
            <p style="display: flex; justify-content: space-between; flex:2;"><strong>Deposit Amount:${amount}</strong></p>
          </div>
        `;

        // Combine data HTML, horizontal line, and totals HTML
        return `
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 32px;">
            <p style="display: flex; justify-content: space-between; flex:1;"><strong>C_Code</strong></p>
            <p style="display: flex; justify-content: space-between; flex:1;"><strong>Name</strong></p>
            <p style="display: flex; justify-content: space-between; flex:1;"><strong>Mode</strong></p>
            <p style="display: flex; justify-content: space-between; flex:1;"><strong>Credit Amount</strong></p>
            <p style="display: flex; justify-content: space-between; flex:1;"><strong>Debit Amount</strong></p>
        </div>
            ${dataHTML}
            <hr style="border-top: 2px solid black;">
            ${totalsHTML}
          </div>
        `;
    }

    return (
        <View style={styles.container}>
            <View style={styles.amountContainer}>
                <Text style={[styles.headingtext, { marginTop: 20 }]}>UPI: {UPIAmount}</Text>
                <Text style={[styles.headingtext, { marginTop: 20 }]}>Cash: {cashAmount}</Text>
            </View>
            <Text style={[styles.headingtext, { marginTop: 0 }]}>Deposit Amount: {amount}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Deposit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handlePrint}>
                    <Text style={styles.buttonText}>Print</Text>
                </TouchableOpacity>
            </View>


            {
                transectionList?.map((item) => {
                    return (
                        <View style={styles.dataRow} key={item.tran_id}>
                            <Text style={styles.dataText}>{item.name}</Text>
                            <Text style={{ marginRight: 8, marginLeft: 8 }}>{item.c_code}</Text>
                            <Text style={styles.dataText}>{item.mode}</Text>
                            <Text style={styles.dataText}>{item.credit_amount}</Text>
                            <Text style={styles.dataText}>{item.debit_amount}</Text>

                        </View>
                    );
                })
            }
        </View>


    )
}

export default Deposit


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 16,
        borderColor: "red"
    },
    heading: {
        fontSize: 24,
        //fontWeight: 'bold',
        marginBottom: 20,
        color: '#0c3761',
        fontWeight: '500',
        textAlign: "center"
    },
    headingtext: {
        // Your heading text styles here
        // For example:
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
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
    amountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // marginTop:10
        // paddingTop:20

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20
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