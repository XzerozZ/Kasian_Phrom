import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';


interface RiskResultProps {
  setStateAssessed: (state: boolean) => void;
  setActiveTab: (tab: string) => void;
}
const RiskResult: React.FC<RiskResultProps> = ({ setActiveTab, setStateAssessed }) => {

  return (
    <View className='flex-1 bg-bgAuth w-full pt-10'>
      <Text>Result</Text>
    </View>
  )
}

export default RiskResult