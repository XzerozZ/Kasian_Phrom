import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../components/TextF';


interface stateProps{
  isDarkMode: boolean;
  dataAssetInput: any;
  setDataAssetInput: (data: any) => void;
}
const state3: React.FC<stateProps> = ({ isDarkMode, dataAssetInput, setDataAssetInput }) => {
  return (
    <View className='flex-1'>
      <TextF>state3</TextF>
    </View>
  )
}

export default state3