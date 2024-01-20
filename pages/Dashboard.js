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
export const Dashboard = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(true); // Set to true by default
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const username = useSelector(state => state.auth.username)

  useEffect(() => {
  }, [username])
  const handleRegisterButtonClick = () => {
    setShowRegisterForm(true);
    setShowGroupForm(false);
    setShowForm(false)
  };

  const handleGroupFormButtonClick = () => {
    setShowGroupForm(true);
    setShowRegisterForm(false);
    setShowForm(false)

  };
  const handleFormButtonClick = () => {
    setShowForm(true)
    setShowGroupForm(false);
    setShowRegisterForm(false);
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <Logout />
      {/* <MasterForm /> */}
      {/* <GetRegister/> */}
      {/* <NameList/> */}
      {/* <RegisterList/> */}
      {/* <TestGetimage/> */}

      {/* <View style={DashboardStyles.buttonContainer}>
        <Button title="Register" onPress={handleRegisterButtonClick} />
        <Button title="Form" onPress={handleGroupFormButtonClick} />
        <Button title="New Group" onPress={handleFormButtonClick} />
      </View> */}
      <View style={DashboardStyles.buttonContainer}>
        <TouchableOpacity style={DashboardStyles.button} onPress={handleRegisterButtonClick}>
          <Text style={DashboardStyles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.button} onPress={handleGroupFormButtonClick} >
          <Text style={DashboardStyles.buttonText}>New Group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.button} onPress={handleFormButtonClick} >
          <Text style={DashboardStyles.buttonText}>Form</Text>
        </TouchableOpacity>
      </View>
      {showRegisterForm &&
        <>
          <MasterForm />
          <RegisterList />
        </>}
      {showGroupForm && <NewGroup />}
      {showForm && <Form2 />}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },

});

