import React,{ useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import HeadTitle from '../components/headTitle';
import TextF from '../components/TextF';

interface WhatKasianPhromProps{
    isDarkMode: boolean;
    setActiveTab: (tab: string) => void;
    setStateNavbar: (state: boolean) => void;
}
const WhatKasianPhrom: React.FC<WhatKasianPhromProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {

    useEffect(() => {
    setStateNavbar(false);
    }, [])
    
    return (
        <>
        <HeadTitle
            id='FinanceDetailHeadTitle'
            setActiveTab={setActiveTab} 
            title='เกษียณพร้อมคืออะไร?' 
            onPress={()=>setActiveTab('main')}/>
        <View className='w-full px-5 mt-3 border-b border-unselectInput'></View>
        <ScrollView>
            <View className="px-5">
                <TextF className='py-2'>เกษียณพร้อมคืออะไร?</TextF>
            </View>
            <View className='border-t border-banner w-11/12 mx-auto'></View>
            <View className="px-5 items-center mt-5 gap-2">
                <TextF className='py-2 text-lg text-primary'>อาจารย์ที่ปรึกษา</TextF>
                <TextF className='py-2'>ดร.วิธวินท์ สุสุทธิ</TextF>
            </View>
            <View className="px-5 items-center mt-5 gap-2">
                <TextF className='py-2 text-lg text-primary'>ผู้จัดทำ</TextF>
                <TextF className='py-2'>นาย มณฑล สุขจินดา</TextF>
                <TextF className='py-2'>นาย ชิณภัทร สุขทอง</TextF>
                <TextF className='py-2'>นาย พศิน เลาห์ภูติ</TextF>
                <TextF className='py-2'>นาย ภัทรชนน อุไรวิชัยกุล</TextF>
                <TextF className='py-2'>นางสาว อาทิมา โรจนกมลสันต์</TextF>
            </View>
        </ScrollView>
        </>
    );
  };

export default WhatKasianPhrom;