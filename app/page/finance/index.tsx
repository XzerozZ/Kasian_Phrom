import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import  TextF  from '../../components/TextF';
import AssessCard from '@/app/components/AssessCard';
import FinanceCard from '@/app/components/FinArticleCard';
import articles from './articles';

interface FinanceProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
// ถ้าหา riskId ไม่เจอจะให้เป็น 0 แปลว่ายังไม่ได้ทำการประเมินความเสี่ยง
const Finance: React.FC<FinanceProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  useEffect(() =>{
      setStateNavbar(true);
    },[]);

  const handlePress = (id: number) => {
    console.log(`Article ${id} clicked!`);
    setActiveTab('financeDetail');
  }

  return (
    <>
      <ScrollView className='flex-1 bg-neutral w-full'>
        <View className='flex-row mt-3 ml-5 h-14 items-center'>
        <Text 
          style={{ fontFamily: 'SarabunBold'}}
          className=' text-normalText text-2xl ml-3 h-12 pt-2'>คู่มือการเงิน
        </Text>
      </View>
      <AssessCard setActiveTab={setActiveTab} riskId={4} />
        <View className='mx-8 mt-8'>
          <TextF className='text-label'>
            บทความการเงิน
          </TextF>
          {articles.map((article) => (
          <FinanceCard
            key={article.id}
            id={article.id}
            title={article.title}
            date={article.date}
            imgUrl={article.imgUrl}
            onPress={() => handlePress(article.id)}
          />
        ))}
        </View>
      </ScrollView>
    </>
  )
}

export default Finance;