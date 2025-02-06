import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Line } from 'react-native-svg'; // เพิ่ม Svg และ Line
import { Dimensions } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from './TextF';

interface HistoryCardProps{
    data: {statusDeposit: string, name: string, amount: number, time: string, date: string}[];
}


const HistoryCard: React.FC<HistoryCardProps> = ({data}) => {
    return (
        <>
    {data.map((data, index) => (
        <View 
        id='HistoryCardContainer'
        key={index}
        className='flex flex-row justify-between items-center h-28 border-t border-banner'>
            <View className={`w-3 h-full ${data.statusDeposit == 'Deposit'?'bg-ok':'bg-err'}`}></View>
            <View className='flex flex-row h-full justify-between items-center flex-1 pl-5'>
                <TextF className='text-normalText text-lg'>{data.name}</TextF>
                <TextF className='text-normalText text-lg'>{data.amount}</TextF>
                <View className='flex flex-col gap-1 items-end'>
                    <TextF className='text-normalText text-lg'>{data.time}</TextF>
                    <TextF className='text-normalText'>{data.date}</TextF>
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