import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SideBarMenu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuItemPress = (menuItem) => {
    console.log(`Pressed: ${menuItem}`);
    setIsDrawerOpen(false);
  };

  const menuItems = [
    { label: 'Home', icon: 'home' },
    { label: 'Business', icon: 'business' },
    { label: 'Settings', icon: 'settings' },
  ];

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {/* Drawer content */}
      {isDrawerOpen && (
        <View style={{ width: 200, padding: 20, backgroundColor: 'lightgray' }}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              onPress={() => handleMenuItemPress(item.label)}
            >
              <Ionicons name={item.icon} size={20} style={{ marginRight: 10 }} />
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Main content */}
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={toggleDrawer} style={{ padding: 10 }}>
          <Ionicons name={isDrawerOpen ? 'arrow-back' : 'menu'} size={30} />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Main Content Goes Here</Text>
        </View>
      </View>
    </View>
  );
};
