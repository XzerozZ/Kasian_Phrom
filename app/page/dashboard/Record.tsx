import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import ChartLine from '../../components/ChartLine';
import { LinearGradient } from 'expo-linear-gradient';
import HistoryCard from '../../components/HistoryCard';
import  TextF  from '../../components/TextF';
import Port from '../../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNumberFormat } from "@/app/NumberFormatContext";

interface infoHistoryProp{
  history_id: string,
  method: string,
  type: string,
  name: string,
  category: string,
  money: number,
  track_at: string
}
interface RecordProps{
  isDarkMode: boolean;
  reflesh: boolean;
}
const Record: React.FC<RecordProps> = ({ isDarkMode, reflesh }) => {


  const [infoHistory, setInfoHistory] = useState<infoHistoryProp[]>([]);
  const { addCommatoNumber } = useNumberFormat();

  useEffect (() => {
    const fetchToken = async (token:string ) => {
      try {
        console.log('token:', token);
        const response = await fetch(`${Port.BASE_URL}/history`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();

        const reversData = data.result.data.reverse()
        setInfoHistory(reversData)
        
        
        
        
        
      } catch (error) {
        console.error('Failed to fetch token from storage', error);
      }
    };
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token !== undefined && token !== null ) {
        fetchToken(token);
      }
    };
    
    getToken();
  } ,[reflesh])


  const toThaiMonth = (month: string) => {
    const monthNumber = parseInt(month.slice(5, 7), 10);
    const thaiMonth = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม',
      'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน',
      'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม',
    ];
    return thaiMonth[monthNumber - 1];
  }
  const groupedByMonth = infoHistory.reduce((acc: { [key: string]: typeof infoHistory }, item) => {
    const monthKey = item.track_at.slice(0, 7); // ตัดเอาแค่ YYYY-MM (เช่น "2025-02")
    
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(item);
    
    return acc;
  }, {});

 


  return (
    <ScrollView 
    id='DashboardRecordContainer'
    showsVerticalScrollIndicator={false}>
      <View className=' flex'>
        <View className='mt-5 flex justify-center items-center'>
        </View>
        <View className='mt-5 px-5'>
          <View className='flex justify-center items-center bg-neutral pr-4 pt-7 pl-2 rounded-3xl shadow-sm h-96'>
            <ChartLine infoHistory={infoHistory}/>
          </View>
        </View>
        <View className='px-5 mt-5 gap-3'>
          <TextF className=' text-normalText text-lg'>ประวัติการออม</TextF>
        </View>
        {Object.entries(groupedByMonth).map(([month, items], index) => (
          <View id="HistoryCard" key={month}>
            <View className="px-5 mt-5 mb-2">
              <View className="flex flex-row justify-between items-center mb-5">
                {index === 0
                  ? <TextF className="text-label text-lg py-2">เดือนนี้ {toThaiMonth(month)}</TextF>
                  : <TextF className="text-label text-lg py-2">เดือน {toThaiMonth(month)}</TextF>
                }
                <TextF className={`text-lg ${items.reduce((sum, item) => sum + item.money, 0) > 0 ? ' text-oktext' : 'text-err'}`}>
                  {items.reduce((sum, item) => sum + item.money, 0) > 0 ?`${addCommatoNumber(items.reduce((sum, item) => sum + item.money, 0))}`
                  :items.reduce((sum, item) => sum + item.money, 0) > 0 ?  `+ ${addCommatoNumber(items.reduce((sum, item) => sum + item.money, 0))}` 
                  : `- ${addCommatoNumber(items.reduce((sum, item) => sum + item.money, 0))}`}
                </TextF>
              </View>
              {items.map((data, index) => (
                <View key={index}>
                  <HistoryCard data={data} />
                </View>
              ))}
            </View>
          </View>
        ))}
        
      </View>
      <View className='h-32'></View>
    </ScrollView>
  )
}

export default Record
