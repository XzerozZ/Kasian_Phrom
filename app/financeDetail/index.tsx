import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import TextF from '../components/TextF';
import HeadTitle from '../components/headTitle';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from 'expo-router/build/global-state/router-store';

interface FinanceDetailProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  setSelectedId: (id: number) => void;
  newsId: number;
}
const FinanceDetail: React.FC<FinanceDetailProps> = ({ isDarkMode, setActiveTab, setStateNavbar, setSelectedId, newsId }) => {
  useEffect(() =>{
      setStateNavbar(false);
    },[]);
  
  const [newsDetail, setNewsDetail] = useState<any>(null);

  useEffect(() => {
  const fetchNewsDetail = async () => {
    try {
      let storedNewsId = newsId;

      if (!storedNewsId) {
        const savedId = await AsyncStorage.getItem('newsId');
        storedNewsId = savedId ? parseInt(savedId, 10) : 0;
      } else {
        await AsyncStorage.setItem('newsId', storedNewsId.toString());
      }

      const response = await fetch(`${Port.BASE_URL}/news/${storedNewsId}`, {
        method: 'GET',
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response.ok) throw new Error('Failed to fetch news detail');

      const data = await response.json();
      setNewsDetail(data.result);
      console.log('Fetched news detail:', data.result);
    } catch (error) {
      console.error('Error fetching news detail:', error);
    }
  };

  fetchNewsDetail();
}, [newsId]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // if (!newsDetail) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <>
      <HeadTitle
      id='FinanceDetailHeadTitle'
      setActiveTab={setActiveTab} 
      title='บทความการเงิน' 
      onPress={()=>setSelectedId(0)}/>
      <View className='w-full px-5 mt-3 border-b border-unselectInput'></View>
      <ScrollView 
      id='FinanceDetailContainer'
      className='flex-1 bg-neutral pb-10'>
        <View className='flex items-center justify-center'>
          <Image 
          source={{ uri: newsDetail?.image_title }}
          className='w-full aspect-video object-cover'/>
        </View>


        <Text className='text-2xl text-normalText mt-5 mx-8' style={{fontFamily: 'SarabunBold'}}>{ newsDetail?.title }</Text>
        <TextF className='text-label mx-8 mt-2 mb-5'>อัพเดทเมื่อ { formatDate(newsDetail?.updated_date) }</TextF>
        <TextF className='text-lg text-normalText mx-8'>      { newsDetail?.dialog[0].desc }</TextF >
        <TextF className='text-lg text-normalText mx-8'>
               { newsDetail?.dialog[1].desc }</TextF>
        <TextF className='text-lg text-normalText mx-8'>
               สำหรับการวางแผนการลงทุนแบบมีเป้าหมาย (Goal Based Investing) หมายถึง เมื่อเริ่มลงทุน ควรสำรวจตัวเองว่าเป้าหมาย
        การลงทุนคืออะไร
        </TextF>
      </ScrollView>
    </>
  )
}

export default FinanceDetail;