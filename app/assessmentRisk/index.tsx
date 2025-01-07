import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../components/TextF';


interface AssessmentRiskProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const AssessmentRisk: React.FC<AssessmentRiskProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  return (
    <View className='flex-1'>
      <TextF>AssessmentRisk</TextF>
    </View>
  )
}

export default AssessmentRisk