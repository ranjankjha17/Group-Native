import React from 'react'
import { MasterForm } from './MasterForm'
import { RegisterList } from '../components/RegisterList'
import { ScrollView } from 'react-native'

export const RegisterScreen = () => {
    return (
        <ScrollView>
            <MasterForm/>
            <RegisterList/>
        </ScrollView>
    )
}
