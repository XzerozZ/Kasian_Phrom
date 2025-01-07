import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../components/TextF';


interface CalRetirementProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const CalRetirement: React.FC<CalRetirementProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  return (
    <View className='flex-1'>
      <TextF>CalRetirement</TextF>
    </View>
  )
}

export default CalRetirement