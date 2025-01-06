import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';



interface FinanceProps{
  isDarkMode: boolean;
}
const Finance: React.FC<FinanceProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <Text>Finance</Text>
    </View>
  )
}

export default Finance