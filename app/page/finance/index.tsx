import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../../components/TextF';


interface FinanceProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Finance: React.FC<FinanceProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  useEffect(() =>{
    setStateNavbar(true)
  },[]);
    
  return (
    <View className='flex-1'>
      <Text>Finance</Text>
    </View>
  )
}

export default Finance