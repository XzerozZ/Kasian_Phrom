import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import HeadTitle from '../components/headTitle';
import WideBtn from '../components/WideBtn';


interface RiskResultProps {
  setStateAssessed: (state: boolean) => void;
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const RiskResult: React.FC<RiskResultProps> = ({ setActiveTab, setStateAssessed , isDarkMode, setStateNavbar}) => {
  const handleSubmit = () => {
    console.log('pop up asking if the user insist to delete an old assessment and make a new one.')
    setStateAssessed(false)
  }
  return (
    <>
      <HeadTitle isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} title='ผลการประเมิน' route='finance'/>
      <ScrollView className='flex-1 bg-neutral w-full' showsVerticalScrollIndicator={false}>
        <TextF className='text-center mt-3 text-primary text-lg'>คุณคือผู้ลงทุนประเภท</TextF>
        <WideBtn
          text="ทำแบบประเมินความเสี่ยงอีกครั้ง"
          disabled={false} // ไม่ต้องปิดปุ่ม
          onPress={handleSubmit}
        />
      </ScrollView>
    </>
  )
}

export default RiskResult