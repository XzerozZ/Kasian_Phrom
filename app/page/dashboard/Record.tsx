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



  const [dataHistoryPerMonth, setDataHistoryPerMonth] = useState([
    {month: '11', amount: 5000, data: dataHistory},
    {month: '10', amount: 5000},
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




  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
          <View 
          key={index}>
            <View className='px-5 mt-5 mb-10'>
              <View className='flex flex-row justify-between items-center mb-5'>
                <TextF className=' text-normalText'>เดือนนี้</TextF>
                <TextF className=' text-normalText'>{data.amount}</TextF>
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
