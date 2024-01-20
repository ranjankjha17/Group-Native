import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const groupSlice = createSlice({
    name: 'group',
    initialState: {
        groupname: "",
        groupLength:0
    },
    reducers: {
        addGroup: (state, action) => {
            state.groupname = action.payload;
        },
        groupListLength:(state,action)=>{
            state.groupLength += 1;
        },
        resetGroup: state => {
            state.groupname = "";
        },
    },
});

export const { addGroup, resetGroup,groupListLength } = groupSlice.actions;
export default groupSlice.reducer;