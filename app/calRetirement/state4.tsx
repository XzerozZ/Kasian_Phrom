import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../components/TextF';


interface stateProps{
  isDarkMode: boolean;
  dataInput: any;
  setDataInput: (data: any) => void;
}
const state4: React.FC<stateProps> = ({ isDarkMode, dataInput, setDataInput  }) => {
  return (
    <View className='flex-1'>
      <TextF>state4</TextF>
    </View>
  )
}

export default state4