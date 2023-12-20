import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import getImageData from './getImageData';
import convertBlobToImage from './convertBlobToImage';

const ImageViewer = () => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const blobData = await getImageData();
      convertBlobToImage(blobData);
      setImageUri(`${RNFetchBlob.fs.dirs.DocumentDir}/image.jpg`);
    };

    fetchData();
  }, []);

  return (
    <Image
      source={{ uri: imageUri }}
      style={{ width: 200, height: 200 }}
      resizeMode="contain"
    />
  );
};

export default ImageViewer;
