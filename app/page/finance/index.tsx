import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import  TextF  from '../../components/TextF';
import AssessCard from '@/app/components/AssessCard';
import FinanceCard from '@/app/components/FinArticleCard';
import Port from '@/Port';
import FinanceDetail from '@/app/financeDetail/index';

interface FinanceProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}

const Finance: React.FC<FinanceProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {

  const [news, setNews] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState(0);
  const [refreshing, setRefreshing] = useState(false);



  useEffect(() => {
    setStateNavbar(true);
    const fetchNews = async () => {
      try {
        const response = await fetch(`${Port.BASE_URL}/news`, {
          method: "GET",
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Network response was not ok");
        }

        const data = await response.json();
        console.log('Fetched news:', data.result);
        setNews(data.result);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [refreshing]);

  const handlePress = (id: number) => {
    console.log(`Article ${id} clicked! Redirecting to finance detail page...`);
    setSelectedId(id);
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  if (selectedId) {
    return (
      <FinanceDetail
        isDarkMode={isDarkMode}
        setActiveTab={setActiveTab}
        setStateNavbar={setStateNavbar}
        setSelectedId={setSelectedId}
        newsId={selectedId}
        refreshing={refreshing}
        setRefreshing={setRefreshing}
      />
    );
  } 

  return (
    <>
      <ScrollView 
      id='FinanceContainer'
      showsVerticalScrollIndicator={false}
      className='flex-1 bg-neutral w-full'>
        <View className='flex-row mt-3 ml-5 h-14 items-center bg-neutral1'>
          <Text 
            style={{ fontFamily: 'SarabunBold'}}
            className=' text-normalText text-2xl ml-3 h-12 pt-2'>คู่มือการเงิน
          </Text>
          
        </View>
        <View className='mx-5'>
          <AssessCard setActiveTab={setActiveTab}/>
        </View>
        <View className='px-5 mt-8'>
          <TextF className='text-label'>
            บทความการเงิน
          </TextF>
          {news.map((news) => (
          <FinanceCard
            key={news.news_id}
            id={news.news_id}
            title={news.title}
            date={formatDate(news.updated_date)}
            imgUrl={news.image_title}
            onPress={() => handlePress(news.news_id)}
          />
        ))}
        </View>
        <View className='h-40'></View>
      </ScrollView>
    </>
  )
}

export default Finance;