import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';



interface NursingHousesProps{
  isDarkMode: boolean;
}
const NursingHouses: React.FC<NursingHousesProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <Text>NursingHouses</Text>
    </View>
  )
}

export default NursingHouses