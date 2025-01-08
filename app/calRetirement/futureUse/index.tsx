import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../../components/TextF';


interface futureUseProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const futureUse: React.FC<futureUseProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <TextF>futureUse</TextF>
    </View>
  )
}

export default futureUse