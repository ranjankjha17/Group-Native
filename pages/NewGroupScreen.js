import React from 'react'
import { NewGroup } from './NewGroup'
import { GroupList } from './GroupList'
import { ScrollView } from 'react-native'

export const NewGroupScreen = () => {
    return (
        <ScrollView>
            <NewGroup />
            <GroupList/>
        </ScrollView>
    )
}
