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
  refreshing: boolean;
  setRefreshing: (refresh: boolean) => void;
}
const FinanceDetail: React.FC<FinanceDetailProps> = ({ isDarkMode, setActiveTab, setStateNavbar, setSelectedId, newsId, refreshing, setRefreshing }) => {
  useEffect(() =>{
      setStateNavbar(false);
    },[]);
  
  const [newsDetail, setNewsDetail] = useState<any>();
  const [newDialog, setNewDialog] = useState<any>();

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
      setNewDialog(data.result.dialog);
      console.log('Fetched news detail:', JSON.stringify(data.result, null, 2));
      console.log('Fetched news detail:', JSON.stringify(data.result.image_desc, null, 2));

    } catch (error) {
      console.error('Error fetching news detail:', error);
    }
  };

  fetchNewsDetail();
}, [newsId]);


console.log(newDialog)
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

  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (newsDetail?.image_desc) {
      Image.getSize(newsDetail.image_desc, (width, height) => {
        const screenWidth = Dimensions.get("window").width * 0.9; // 90% ของหน้าจอ
        const calculatedHeight = (height / width) * screenWidth; // คำนวณความสูงตามอัตราส่วน
        setImageHeight(calculatedHeight);
      }, (error) => console.warn("Image load error:", error));
    }
  }, [newsDetail?.image_desc]);

  return (
    <>
      <HeadTitle
      id='FinanceDetailHeadTitle'
      setActiveTab={setActiveTab} 
      title='บทความการเงิน' 
      onPress={()=>{setSelectedId(0),setRefreshing(!refreshing)}}/>
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
        {newsDetail?.image_desc !== null && 
        (<View className='w-10/12 mx-auto'>
          <Image 
          source={{ uri: newsDetail?.image_desc }}
          style={{ width: "100%", height: imageHeight, resizeMode: 'contain' }} 
          className='flex-1'/>
          <View className='h-5'/>
        </View>)
          }
        {newDialog !== undefined && newDialog.map((item: any, index: number) => (
          <Text 
            key={item.d_id} 
            className={` text-normalText mx-8 ${item.type === 'Heading' ? 'text-xl mt-4' : item.type === 'Small' ? 'text': 'text-lg'}`}
            style={{ fontFamily: item.bold ? 'SarabunBold' : 'Sarabun' }}>
            {item.desc}
          </Text>
        ))}
        <View className='h-20'/>
      </ScrollView>
    </>
  )
}

export default FinanceDetail;

[
{
    "d_id": "5614082c-1061-4786-83c2-bfd90067c4cb",
    "type": "Heading",
    "desc": "General Information\r\n\r\n",
    "bold": true,
    "news_id": "00002"
},
{
    "d_id": "efce4b41-7f2d-4efb-9e9d-5f5ea4c2b234",
    "type": "Paragraph",
    "desc": "         Momonga is a hyperactive and slightly mean flying squirrel. It is always acting cute and begging for all sorts of things. Personality wise, it is very self-centered, and will often shamelessly demand things or refuse to share. Even during dangerous situations, it would ask for food and rest. In pursuit of these, it is core motivation for Momonga to \"act cute\", and they make conscious effort to imitate other characters' cute actions, notably Chiikawa. It often imitates Chiikawa's yawning and crying.",
    "bold": false,
    "news_id": "00002"
},]