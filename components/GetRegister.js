import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import base64 from 'base64-js';

export const GetRegister = () => {
    const [imageData, setimageData] = useState([])

    async function getImageData() {
        const { data } = await axios.get('https://reactnativeserver.vercel.app/getimage')
        console.log(data?.data)
        setimageData(data?.data)

    }

    useEffect(() => {
        getImageData()
    }, [])


    return (
        <View style={styles.container}>
            {/* <Text>Test Get image</Text> */}

            {imageData.map((e, index) => {
                return(
                    <Text key={index}>{e?.name}</Text>
                )
                //   try {
                //     const base64Image = base64.fromByteArray(new Uint8Array(e?.photo?.data));
                //    // console.log('Base64 Image:', base64Image);
                //     if (!base64Image) {
                //       console.warn(`Image data is missing for item at index ${index}`);
                //       return null; 
                //   }

                //     const dataURI = `data:image/jpg;base64,${base64Image}`;

                //    //console.log('Data URI:', dataURI);

                //     return (
                //       <Image
                //         source={{ uri: dataURI }}
                //         style={{ width: 120, height: 100,marginLeft:2,flex:1 }}
                //         key={index}
                //       />
                //     );
                //   } catch (error) {
                //     console.error('Error processing image data:', error);
                //     return null; // Return null for images that couldn't be processed
                //   }

            })}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        // flexGrow: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        padding: 16,
        borderColor: "red",
    },
})