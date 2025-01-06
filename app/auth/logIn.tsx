import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';



interface LogInProps{
  isDarkMode: boolean;
}
const LogIn: React.FC<LogInProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <Text>LogIn</Text>
    </View>
  )
}

export default LogIn