import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { URL } from '../services/services';
import { useSelector } from 'react-redux';

export const AuctionList = () => {
    const [auctionList, setAuctionList] = useState([]);
    //console.log(auctionList)
    const [loading, setLoading] = useState(true); // State to indicate if data is loading
    const companyName = useSelector(state => state.auth.user.company)
    const groupName = useSelector(state => state.group.groupname)
    //console.log(groupName)

    const getAuction = async () => {
        try {
            const response = await axios.get(`${URL}/get-auction`);
            const { data } = response;
            const { success } = data;
            if (success) {
                setAuctionList(data?.data);
                // console.log(data?.data);
                setLoading(false)
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };

    useEffect(() => {
        // Fetch the initial groupList when the component mounts
        getAuction();

        // Fetch the updated groupList whenever it changes
        const intervalId = setInterval(() => {
            getAuction();
        }, 50000); // Adjust the interval according to your requirements

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    //   if (loading) {
    //     return <ActivityIndicator size="large" color="#0000ff" />;
    // }

    const filterAuctionList = auctionList.filter((e) => e.group_ === groupName && e.company===companyName)
    //console.log("filterList", filterAuctionList)
    if (filterAuctionList.length > 0) {
        return (
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Group</Text>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={styles.headerText}>Amount</Text>
                    <Text style={styles.headerText}>BCPayment</Text>
                    {/* <Text style={styles.headerText}>IntNo</Text> */}
                </View>

                {
                    filterAuctionList &&
                    filterAuctionList?.map((item) => (
                        <View key={item.form2_id} style={styles.dataRow}>
                            <Text style={styles.dataText}>{item.group_}</Text>
                            <Text style={styles.dataText}>{item.name}</Text>
                            <Text style={styles.dataText}>{item.amount}</Text>
                            <Text style={styles.dataText}>{item.bc_payment}</Text>
                            {/* <Text style={styles.dataText}>{item.intNo}</Text> */}
                        </View>
                    ))}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
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
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dataText: {
        fontSize: 16,
    },
});
