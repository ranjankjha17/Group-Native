import { configureStore} from '@reduxjs/toolkit'
import authSlice from '../reducers/login'
import groupSlice from '../reducers/group'
import logger from 'redux-logger'
const rootReducer={
    auth:authSlice,
    group:groupSlice
}

const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({ serializableCheck: false}).concat(logger),
    devTools: process.env.NODE_ENV !== "production",
})



export default store