import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Line } from 'react-native-svg'; // เพิ่ม Svg และ Line
import { Dimensions } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from './TextF';
import { useNumberFormat } from "@/app/NumberFormatContext";



interface infoHistoryProp{
    history_id: string,
    method: string,
    type: string,
    name: string,
    category: string,
    money: number,
    track_at: string
    TransferFrom: string,
}

interface HistoryCardProps{
    data: infoHistoryProp;
}


const HistoryCard: React.FC<HistoryCardProps> = ({ data }) => {


    const { addCommatoNumber } = useNumberFormat();
    

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
            <View className={`w-3 h-full ${data.TransferFrom !== ''?'bg-accent':data.method == 'deposit'?' bg-oktext':'bg-err'}`}></View>
            <View className='flex flex-row h-full justify-between items-center flex-1 pl-5'>
                <View className='flex-1 flex-col gap-1 '>
                    <TextF className='text-normalText text-lg'>{data.type === 'saving_money' ? data.method == 'deposit'?'ออมเงิน':'ถอนเงินออม' : data.method == 'deposit'? 'ลงทุน':'ถอนเงินลงทุน'}</TextF>
                    <View className='flex flex-row gap-2 items-center h-6 '>
                        {data.TransferFrom !== '' && <TextF className='text-primary text-sm '>{data.TransferFrom}</TextF>} 
                        {data.TransferFrom !== '' && <TextF className=' text-accent text-sm '><FontAwesome6 name="arrow-right-long" size={14} /></TextF>} 
                        <TextF className='text-primary text-sm'>{data.name}</TextF>
                    </View>
                    
                </View>
                <TextF className='text-normalText text-lg flex-1 text-center'>{addCommatoNumber(data.money)}</TextF>
                <View className='flex flex-col gap-1 items-end flex-1'>
                    <TextF className='text-normalText text-lg '>{getTime(data.track_at)} น.</TextF>
                    <TextF className='text-normalText'>{getDate(data.track_at)}</TextF>
                </View>
            </View>
        </View>
    );
    
};

export default HistoryCard;