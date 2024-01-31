import React from 'react'
//import { Image } from 'expo-image';

import { StyleSheet,View,Image } from 'react-native'
const Logo = () => {
  return (
    <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}       
          style={styles.logo}
        />       
      </View>
  )
}

export default Logo

const styles = StyleSheet.create({  
    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20, 
      padding:20
    },
    logo: {
      width: 100, 
      height: 100, 
      resizeMode: 'contain', 
    },
  
  });