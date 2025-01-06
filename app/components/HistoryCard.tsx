import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Line } from 'react-native-svg'; // เพิ่ม Svg และ Line
import { Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome6, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';





const HistoryCard = () => {
    const [dataHistory, setDataHistory] = useState([
        {statusDeposit:'Deposit', name: 'เงินออม', amount: 5000, time: '20:43 น', date: '17/11/2024'},
        {statusDeposit:'Deposit',name: 'เงินออม', amount: 5000, time: '20:43 น', date: '17/11/2024'},
        {statusDeposit:'Withdraw',name: 'ถอนเงินลงทุน', amount: 5000, time: '20:43 น', date: '17/11/2024'},]);

    return (
        <>
    {dataHistory.map((data, index) => (
        <View 
        key={index}
        className='flex flex-row justify-between items-center h-28 border-t border-banner'>
            <View className={`w-3 h-full ${data.statusDeposit == 'Deposit'?'bg-ok':'bg-err'}`}></View>
            <View className='flex flex-row h-full justify-between items-center flex-1 pl-5'>
                <Text className='text-normalText text-lg'>{data.name}</Text>
                <Text className='text-normalText text-lg'>{data.amount}</Text>
                <View className='flex flex-col gap-1 items-end'>
                    <Text className='text-normalText text-lg'>{data.time}</Text>
                    <Text className='text-normalText'>{data.date}</Text>
                </View>
            </View>
            <View className='flex items-center pt-2 h-full'>
                <FontAwesome6 name="trash" size={15} color='#FF4438'/>
            </View>
        </View>
    ))}
    </>
    );
    
  };

  export default HistoryCard;