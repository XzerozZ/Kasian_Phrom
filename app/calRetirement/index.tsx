import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';



interface CalRetirementProps{
  isDarkMode: boolean;
}
const CalRetirement: React.FC<CalRetirementProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <Text>CalRetirement</Text>
    </View>
  )
}

export default CalRetirement