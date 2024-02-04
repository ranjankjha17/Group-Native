import React, { useState } from 'react';
import { View, Text, Button, Modal} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MyPickerModal = () => {
  const [selectedValue, setSelectedValue] = useState('Receipt');
  const [modalVisible, setModalVisible] = useState(false);

  const handlePickerChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Open Modal" onPress={() => setModalVisible(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 20, marginBottom: 10 }}>Select an option:</Text>
            <View>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Select Transaction Type:</Text>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 40 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                <Picker.Item label="Receipt" value="Receipt" />
                <Picker.Item label="Payment" value="Payment" />
              </Picker>
            </View>
            <Button title="Close Modal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyPickerModal;
