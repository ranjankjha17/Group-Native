import axios from "axios"

export const URL='https://reactnativeserver.vercel.app'

export const createNewGroup = async (data) => {
    const response = await axios.post('https://reactnativeserver.vercel.app/create-group', data, {
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json",
        }
    }
    )
    return response.data
}

