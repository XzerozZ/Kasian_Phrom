import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Line } from 'react-native-svg'; // เพิ่ม Svg และ Line
import { Dimensions } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from './TextF';

interface infoHistoryProp{
    history_id: string,
    method: string,
    type: string,
    name: string,
    category: string,
    money: number,
    track_at: string
}

interface HistoryCardProps{
    data: infoHistoryProp;
}


const HistoryCard: React.FC<HistoryCardProps> = ({ data }) => {



    const getDate = (date: string) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()+543}`
    }
    const getTime = (date: string) => {
        const d = new Date(date);
        return `${d.getHours()}:${d.getMinutes().toString().length === 1 ? '0'+d.getMinutes() : d.getMinutes()}`
    }


    return (
        <View 
        id='HistoryCardContainer'
        className='flex flex-row justify-between items-center h-28 border-t border-banner'>
            <View className={`w-3 h-full ${data.method == 'deposit'?'bg-ok':'bg-err'}`}></View>
            <View className='flex flex-row h-full justify-between items-center flex-1 pl-5'>
                <TextF className='text-normalText text-lg flex-1'>{data.name === 'อัตโนมัติ' ? 'ออมเงิน' : data.name}</TextF>
                <TextF className='text-normalText text-lg flex-1 text-center'>{data.money}</TextF>
                <View className='flex flex-col gap-1 items-end flex-1'>
                    <TextF className='text-normalText text-lg '>{getTime(data.track_at)} น.</TextF>
                    <TextF className='text-normalText'>{getDate(data.track_at)}</TextF>
                </View>
            </View>
        </View>
    );
    
};

export default HistoryCard;