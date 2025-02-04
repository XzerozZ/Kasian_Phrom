import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import ChartLine from '../../components/ChartLine';
import { LinearGradient } from 'expo-linear-gradient';
import HistoryCard from '../../components/HistoryCard';
import  TextF  from '../../components/TextF';

interface RecordProps{
  isDarkMode: boolean;
}
const Record: React.FC<RecordProps> = ({ isDarkMode }) => {



  const [dataHistory, setDataHistory] = useState([
      {statusDeposit:'Deposit', name: 'เงินออม', amount: 5000, time: '20:43 น', date: '17/11/2024'},
      {statusDeposit:'Deposit',name: 'เงินออม', amount: 5000, time: '20:43 น', date: '17/11/2024'},
      {statusDeposit:'Withdraw',name: 'ถอนเงินลงทุน', amount: 5000, time: '20:43 น', date: '17/11/2024'},]);

  const [dataHistory2, setDataHistory2] = useState([
    {statusDeposit:'Deposit', name: 'เงินออม', amount: 8000, time: '20:43 น', date: '18/10/2024'},
    {statusDeposit:'Deposit',name: 'เงินออม', amount: 5000, time: '20:43 น', date: '12/10/2024'},]);

  const [dataHistoryPerMonth, setDataHistoryPerMonth] = useState([
    {month: '11', amount: 5000, data: dataHistory},
    {month: '10', amount: 18000, data: dataHistory2},
    {month: '9', amount: 5000},
    {month: '8', amount: 5000},
    {month: '7', amount: 5000},
    {month: '6', amount: 5000},
    {month: '5', amount: 5000},
    {month: '4', amount: 5000},
    {month: '3', amount: 5000},
    {month: '2', amount: 5000},
    {month: '1', amount: 5000},
    {month: '12', amount: 5000},
  ]);

  const toThaiMonth = (month: string) => {
    switch (month) {
      case '1':
        return 'มกราคม';
      case '2':
        return 'กุมภาพันธ์';
      case '3':
        return 'มีนาคม';
      case '4':
        return 'เมษายน';
      case '5':
        return 'พฤษภาคม';
      case '6':
        return 'มิถุนายน';
      case '7':
        return 'กรกฎาคม';
      case '8':
        return 'สิงหาคม';
      case '9':
        return 'กันยายน';
      case '10':
        return 'ตุลาคม';
      case '11':
        return 'พฤศจิกายน';
      case '12':
        return 'ธันวาคม';
      default:
        return '';
    }
  }



  return (
    <ScrollView 
    id='DashboardRecordContainer'
    showsVerticalScrollIndicator={false}>
      <View className=' flex'>
        <View className='mt-5 flex justify-center items-center'>
          <TextF className='text-2xl font-bold'>ชื่อแผน</TextF>
        </View>
        <View className='mt-5 px-5'>
          <View className='flex justify-center items-center bg-neutral pr-4 pt-7 pl-2 rounded-3xl shadow-sm h-96'>
            <ChartLine/>
          </View>
          

        </View>
        
        <View className='px-5 mt-5 gap-3'>
          <TextF className=' text-normalText text-lg'>ประวัติการออม</TextF>
        </View>
        {dataHistoryPerMonth.map((data, index) => (
          data.data && data.data.length > 0 &&
          <View 
          id='HistoryCard'
          key={index}>
            <View className='px-5 mt-5 mb-2'>
              <View className='flex flex-row justify-between items-center mb-5'>
                {index === 0
                ? <TextF className=' text-label text-lg'>เดือนนี้ {toThaiMonth(data.month)}</TextF>
                : <TextF className=' text-label text-lg'>เดือน {toThaiMonth(data.month)}</TextF>
                }
                
                <TextF className=' text-oktext text-lg'>+ {data.amount}</TextF>
              </View>
              <HistoryCard data={data.data || []}/>
            </View>
          </View>
        ))}
        
      </View>
      <View className='h-32'></View>
    </ScrollView>
  )
}

export default Record
