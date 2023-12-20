import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View,Text,Image } from 'react-native';

export const TestImage2 = () => {
    const [imageData, setimageData] = useState([])

    async function getImageData() {
        const { data } = await axios.get('http://172.24.0.168:5000/getimage')
        console.log(data?.data)
        setimageData(data?.data)

    }

    useEffect(() => {
        getImageData()
    }, [])

    return (

        // <View>
        //     <Text>Images</Text>
        //     {
        //         imageData.map((e, index) => {
        //             const base64String = btoa(String.fromCharCode(null,new Uint8Array(e?.photo?.data)));
 

        //             return (
        //                 <Image
        //                     source={{ uri: `data:image/jpg;base64,${base64String}` }}
        //                     style={{ width: 200, height: 200 }}
        //                     key={index}
        //                 />

        //             )
        //         })



        //     }
        // </View>

        <View>
        <Text>Images</Text>
        {imageData.length > 0 ? (
            imageData.map((e, index) => {
                const base64String = btoa(String.fromCharCode(null,new Uint8Array(e?.photo?.data)));

                return (
                    <Image
                        source={{ uri: `data:image/jpg;base64,${base64String}` }}
                        style={{ width: 200, height: 200 }}
                        key={index}
                    />
                );
            })
        ) : (
            <Text>No images available</Text>
        )}
    </View>

    )
}
