import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../../components/TextF';


interface MainProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Main: React.FC<MainProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  return (
    <View className='flex-1'>
      <Text>Main</Text>
    </View>
  )
}

export default Main