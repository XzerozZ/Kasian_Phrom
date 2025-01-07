import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../components/TextF';


interface AuthProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Auth: React.FC<AuthProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  return (
    <View className='flex-1'>
      <TextF>Auth</TextF>
    </View>
  )
}

export default Auth