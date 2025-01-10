import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import TextF from '../components/TextF';
import HeadTitle from '../components/headTitle';

interface FinanceDetailProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const FinanceDetail: React.FC<FinanceDetailProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  useEffect(() =>{
      setStateNavbar(false);
    },[]);

  return (
    <>
      <HeadTitle
      setActiveTab={setActiveTab} 
      title='บทความการเงิน' route='finance'/>
      <ScrollView className='flex-1 bg-neutral w-full'>
        <Image 
        source={{ uri: 'https://www.bam.co.th/uploads/images/241011113820rJjr.png' }}
        className="self-center rounded-md border border-neutral2"
        style={{width: 372, height: 206}}
        resizeMode="cover"/>
        <Text className='text-2xl text-normalText mt-5 mx-8' style={{fontFamily: 'SarabunBold'}}>วิเคราะห์การสร้างเข็มทิศการลงทุนด้วย Goal Based Investing</Text>
        <TextF className='text-label mx-8 mt-2 mb-5'>12/10/2567</TextF>
        <TextF className='text-lg text-normalText mx-8'>      เมื่อสนใจเริ่มต้นลงทุน แต่อาจมีคำถามว่า “เราจะลงทุนใน
        อะไร” หากตั้งคำถามกับตัวเองแบบนี้ มักเกิดจากการไม่มี
        เป้าหมายการลงทุนและผลที่ตามมามักพุ่งเป้าที่ผลตอบแทนเป็นหลัก จนลืมความเสี่ยง</TextF >
        <TextF className='text-lg text-normalText mx-8'>
               ความเสี่ยงของการลงทุน หมายถึง ความผันผวนของผล
        ตอบแทนที่ส่งผลกระทบให้เป้าหมายการลงทุนหรืออาจกระทบต่อเป้าหมายการเงินอื่นๆ ด้วย ดังนั้นหากพุ่งเป้าไปที่ผลตอบแทน
        เป็นอันดับแรก อาจเผชิญกับความเสี่ยงที่สูงเกินความจำเป็น ดังนั้นก่อนเริ่มลงทุนควรเปลี่ยนคำถามจาก “เราจะลงทุนใน
        อะไร” เป็น “ทำไมเราต้องลงทุน” อาจพบคำตอบของแผนการ
        ลงทุนที่ไม่เสี่ยงจนเกินไป สามารถลงทุนตามแผนที่วางเอาไว้ และถึงเป้าหมายในระยะเวลาที่กำหนด</TextF>
        <TextF className='text-lg text-normalText mx-8'>
               สำหรับการวางแผนการลงทุนแบบมีเป้าหมาย (Goal Based Investing) หมายถึง เมื่อเริ่มลงทุน ควรสำรวจตัวเองว่าเป้าหมาย
        การลงทุนคืออะไร
        </TextF>
      </ScrollView>
    </>
  )
}

export default FinanceDetail;