import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';



interface AuthProps{
  isDarkMode: boolean;
}
const Auth: React.FC<AuthProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <Text>Auth</Text>
    </View>
  )
}

export default Auth