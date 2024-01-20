import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { URL } from '../services/services';
import { useDispatch } from 'react-redux';
import { groupListLength } from '../reducers/group';

const data = [
  { id: '1', groupname: 'Group 1', members: 5, amount: '$100' },
  { id: '2', groupname: 'Group 2', members: 3, amount: '$50' },
  { id: '3', groupname: 'Group 3', members: 8, amount: '$150' },
  // Add more data as needed
];

export const GroupList = () => {
    const dispatch=useDispatch()
    const [groupList, setGroupList] = useState([])
    useEffect(() => {
        const getGroup = async () => {
          try {
            const response = await axios.get(`${URL}/get-group`)
            const { data } = response;
            const { success } = data;
            if (success) {
              setGroupList(data?.data)
              console.log(data?.data)
    
            }
          } catch (error) {
            console.log(error.response.data.message)
          }
        }
        getGroup()
        dispatch(groupListLength(groupList.length))
      }, [groupList.length])

    return (
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>Group Name</Text>
            <Text style={styles.headerText}>Members</Text>
            <Text style={styles.headerText}>Amount</Text>
          </View>
    
          {groupList && groupList?.map((item) => (
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
        