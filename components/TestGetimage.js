import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, Text, View} from 'react-native'
import base64 from 'base64-js';

export const TestGetimage = () => {
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
        <View>
            <Text>Test Get image</Text>

            {imageData.map((e, index) => {
          try {
            const base64Image = base64.fromByteArray(new Uint8Array(e?.photo?.data));
           // console.log('Base64 Image:', base64Image);
            if (!base64Image) {
              console.warn(`Image data is missing for item at index ${index}`);
              return null; 
          }

            const dataURI = `data:image/jpg;base64,${base64Image}`;
  
           //console.log('Data URI:', dataURI);
  
            return (
              <Image
                source={{ uri: dataURI }}
                style={{ width: 20, height: 20 }}
                key={index}
              />
            );
          } catch (error) {
            console.error('Error processing image data:', error);
            return null; // Return null for images that couldn't be processed
          }
        })}


            {/* {imageData.map((item, index) => {
               // const base64Image = item?.photo?.data;
                const base64Image = base64.fromByteArray(new Uint8Array(item?.photo?.data));

                if (!base64Image) {
                    console.warn(`Image data is missing for item at index ${index}`);
                    return null; // Skip rendering if image data is missing
                }

                return (
                    <Image
                        key={index}
                        source={{ uri: `data:image/png;base64,${base64Image}` }}
                        style={{ width: 400, height: 400 }}
                    />
                );
            })} */}

        </View>
    )
}
