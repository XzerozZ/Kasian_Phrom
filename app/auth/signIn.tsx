import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';



interface SignInProps{
  isDarkMode: boolean;
}
const SignIn: React.FC<SignInProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <Text>SignIn</Text>
    </View>
  )
}

export default SignIn