// import RNFetchBlob from 'rn-fetch-blob';

import RNFetchBlob from "react-native-fetch-blob";

const convertBlobToImage = (blobData) => {
  const imagePath = `${RNFetchBlob.fs.dirs.DocumentDir}/image.jpg`;

  RNFetchBlob.fs
    .writeFile(imagePath, blobData, 'base64')
    .then(() => console.log('Image saved to:', imagePath))
    .catch((error) => console.error('Error saving image:', error));
};

export default convertBlobToImage;
