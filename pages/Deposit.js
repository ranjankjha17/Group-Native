import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, View} from 'react-native'
import { useSelector } from 'react-redux'

const Deposit = () => {
    const username = useSelector(state => state.auth.user.username)
    const [amount,setAmount]=useState('')
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${URL}/get-calculate-amountOfUser?user=${username}`);
                setAmount(response.data.data); // Assuming your response contains a 'total_amount' property
                console.log(response.data.data)
            } catch (error) {
                console.log('Error fetching data:', error.response.data.message);
            }
        };

        fetchData();
    }, [username]); // Specify username as a dependency to trigger the effect when it changes
  return (
    <View>
        <Text>Deposit Amount:{amount} </Text>
    </View>
  )
}

export default Deposit