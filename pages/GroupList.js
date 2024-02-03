import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { URL } from '../services/services';

export const GroupList= () => {
  const [groupList, setGroupList] = useState([]);
  const [loading, setLoading] = useState(true); // State to indicate if data is loading

  const getGroup = async () => {
    try {
      const response = await axios.get(`${URL}/get-group`);
      const { data } = response;
      const { success } = data;
      if (success) {
        setGroupList(data?.data);
        //console.log(data?.data);
        setLoading(false)
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    // Fetch the initial groupList when the component mounts
    getGroup();

    // Fetch the updated groupList whenever it changes
    const intervalId = setInterval(() => {
      getGroup();
    }, 5000); // Adjust the interval according to your requirements

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
}

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Group Name</Text>
        <Text style={styles.headerText}>Members</Text>
        <Text style={styles.headerText}>Amount</Text>
      </View>

      {groupList &&
        groupList?.map((item) => (
          <View key={item.group_id} style={styles.dataRow}>
            <Text style={styles.dataText}>{item.groupName}</Text>
            <Text style={styles.dataText}>{item.members}</Text>
            <Text style={styles.dataText}>{item.amount}</Text>
          </View>
        ))}
    </View>
  );
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
