import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../components/TextF';


interface SignInProps{
  isDarkMode: boolean;
}
const SignIn: React.FC<SignInProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <TextF>SignIn</TextF>
    </View>
  )
}

export default SignIn