import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Logout } from '../components/Logout';
import Logo from '../components/Logo';
export const Dashboard = () => {
  // const [showRegisterForm, setShowRegisterForm] = useState(false);
  // const [showGroupForm, setShowGroupForm] = useState(false);
  // const [showForm, setShowForm] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const username = useSelector(state => state.auth.user.username)
//console.log(user)
  useEffect(() => {
  }, [username])
  const handleRegisterButtonClick = () => {
    navigation.navigate('Register')
  };

  const handleGroupFormButtonClick = () => {
    navigation.navigate('Group')

  };
  const handleFormButtonClick = () => {
    navigation.navigate('Auction')
  };
  const handleTransectionButtonClick = () => {
    navigation.navigate('Transection')
  };
  const handleReportButtonClick = () => {
    navigation.navigate('Report')
  };
const handleDepositButtonClick=()=>{
  navigation.navigate('Deposit')
}
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <Logout />
      <Logo />


      <View style={DashboardStyles.buttonContainer}>
        {
          username === "pintu" ? (
            <>
              <TouchableOpacity style={DashboardStyles.button} onPress={handleRegisterButtonClick}>
                <Text style={DashboardStyles.buttonText}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity style={DashboardStyles.button} onPress={handleGroupFormButtonClick} >
                <Text style={DashboardStyles.buttonText}>New Group</Text>
              </TouchableOpacity>
              <TouchableOpacity style={DashboardStyles.button} onPress={handleFormButtonClick} >
                <Text style={DashboardStyles.buttonText}>Auction</Text>
              </TouchableOpacity>
              <TouchableOpacity style={DashboardStyles.button} onPress={handleTransectionButtonClick} >
                <Text style={DashboardStyles.buttonText}>Transection</Text>
              </TouchableOpacity>
              <TouchableOpacity style={DashboardStyles.button} onPress={handleReportButtonClick} >
                <Text style={DashboardStyles.buttonText}>Report</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={{ marginTop: 100 }}>
              <TouchableOpacity style={DashboardStyles.button} onPress={handleTransectionButtonClick} >
                <Text style={DashboardStyles.buttonText}>Transection</Text>
              </TouchableOpacity>
              <TouchableOpacity style={DashboardStyles.button} onPress={handleDepositButtonClick} >
                <Text style={DashboardStyles.buttonText}>Amount Deposit</Text>
              </TouchableOpacity>

            </View>

          )}
      </View>
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
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,

  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginTop: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },

});

