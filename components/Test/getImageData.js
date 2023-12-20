import axios from 'axios';

// Replace with your API endpoint
const apiUrl = 'http://172.24.0.168:5000/getimage';

const getImageData = async () => {
  try {
    const {data} = await axios.get('http://172.24.0.168:5000/getimage');
    console.log(data?.data)
    return data?.data.photo?.data; // Assuming the server returns an object with 'imageData'
  } catch (error) {
    console.error('Error fetching image data:', error);
  }
};

export default getImageData;
