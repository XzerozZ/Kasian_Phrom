import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../components/TextF';


interface LogInProps{
  isDarkMode: boolean;
}
const LogIn: React.FC<LogInProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <TextF>LogIn</TextF>
    </View>
  )
}

export default LogIn