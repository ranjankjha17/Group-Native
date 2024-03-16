import React from 'react'
import { Form2 } from './Form2'
import { AuctionList } from './AuctionList'
import { ScrollView } from 'react-native'

export const AuctionScreen = () => {
    return (
        <ScrollView>
            <Form2 />
            <AuctionList />
        </ScrollView>
    )
}
