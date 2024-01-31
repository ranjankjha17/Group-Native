import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MasterForm } from './MasterForm';
import { Logout } from '../components/Logout';
import { GetRegister } from '../components/GetRegister';
import { NameList } from '../Test/NameList';
import { RegisterList } from '../components/RegisterList';
import { TestGetimage } from '../components/TestGetimage';
import { Form2 } from './Form2';
import { NewGroup } from './NewGroup'
import { GroupList } from './GroupList';
import { GroupList2 } from './GroupList2';
import Logo from '../components/Logo';
export const Dashboard = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const username = useSelector(state => state.auth.username)

  useEffect(() => {
  }, [username])
  const handleRegisterButtonClick = () => {
    // setShowRegisterForm(true);
    // setShowGroupForm(false);
    // setShowForm(false)
    navigation.navigate('Register')
  };

  const handleGroupFormButtonClick = () => {
    // setShowGroupForm(true);
    // setShowRegisterForm(false);
    // setShowForm(false)
    navigation.navigate('Group')

  };
  const handleFormButtonClick = () => {
    // setShowForm(true)
    // setShowGroupForm(false);
    // setShowRegisterForm(false);
    navigation.navigate('Auction')
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <Logout />
      <Logo/>
      <View style={DashboardStyles.buttonContainer}>
        <TouchableOpacity style={DashboardStyles.button} onPress={handleRegisterButtonClick}>
          <Text style={DashboardStyles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.button} onPress={handleGroupFormButtonClick} >
          <Text style={DashboardStyles.buttonText}>New Group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.button} onPress={handleFormButtonClick} >
          <Text style={DashboardStyles.buttonText}>Auction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.button} onPress={""} >
          <Text style={DashboardStyles.buttonText}>Transection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.button} onPress={""} >
          <Text style={DashboardStyles.buttonText}>Report</Text>
        </TouchableOpacity>

      </View>
      {/* {showRegisterForm &&
        <>
          <MasterForm />
          <RegisterList />
        </>}
      {showGroupForm &&
        <>
          <NewGroup />
          <GroupList />
        </>}
      {showForm && <Form2 />} */}
    </ScrollView>
  )
}
const DashboardStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    marginTop: 10,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingLeft: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    // marginLeft: 5,
    marginTop:5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },

});

