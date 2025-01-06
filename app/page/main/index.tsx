import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';



interface MainProps {
  isDarkMode: boolean;
}
const Main: React.FC<MainProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <Text>Main</Text>
    </View>
  )
}

export default Main