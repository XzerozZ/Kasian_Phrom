import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

import  TextF  from '../../components/TextF';
const Logo = require('../../../assets/images/logo.png')

interface ProfileProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Profile: React.FC<ProfileProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
    useEffect(() =>{
      setStateNavbar(true)
    },[]);
    const router = useRouter();


    const [dataProfile, setDataProfile] = useState([
      {title:'อายุที่ต้องการเกษียณ', detail:'65'},
      {title:'อายุที่คาดว่าจะเสียชีวิต', detail:'80'},
      {title:'รายรับต่อเดือน', detail:'30,000'},
      {title:'รายจ่ายต่อเดือน', detail:'15,000'},
      {title:'เงินเฟ้อ', detail:'3%'},
      {title:'รายจ่ายหลังเกษียณ/เดือน', detail:'50,000'},
      {title:'การเพิ่มขึ้นของรายจ่าย/ปี', detail:'3%'},
      {title:'ผลตอบแทนจากการออม/ปี', detail:'1.25%'},
      {title:'ผลตอบแทนจากการลงทุน/ปี', detail:'5%'},
    ])



  
  return (
    <ScrollView 
    id='ProfileContainer'
    showsVerticalScrollIndicator={false}
    className='flex-1 px-5'>
      <View className='flex items-end'>
        <TouchableOpacity 
        id='BtnSetting'
        activeOpacity={1}
        // onPress={() => router.push('/appSetting')}
        onPress={() => setActiveTab('appSetting')}
        // onPress={() => setActiveTab('calRetirement')}

        className='mt-10 items-end pr-2 w-14'>
          <Ionicons name="settings-sharp" size={27} color='#2A4296'/>
        </TouchableOpacity>
      </View>
      <View className='flex flex-row justify-center gap-10 items-center h-40'>
        <View 
        style={{ borderWidth: 3}}
        className='w-36 h-36 rounded-full border-primary'>
          <Image 
            source={Logo}
            style={{objectFit: 'cover', width: '100%', height: '100%', borderRadius:'100%'}}/>
        </View>
        <View className='flex flex-row gap-2 h-32'>
          <View className='flex justify-between'>
            <TextF className='text-lg text-normalText'>ชื่อผู้ใช้</TextF>
            <TextF className='text-lg text-normalText'>ชื่อ</TextF>
            <TextF className='text-lg text-normalText'>อายุ</TextF>
          </View>
          <View className='flex justify-between'>
            <TextF className='text-lg text-normalText'> นาย</TextF>
            <TextF className='text-lg text-normalText'> พิชัย สุขเงิน</TextF>
            <TextF className='text-lg text-normalText'> 45</TextF>
          </View>
        </View>
      </View>
      <TouchableOpacity 
      id='BtnFavorite'
      activeOpacity={1}
      // onPress={() => router.push('/favorite')}
      className='w-44 h-10 bg-primary ml-5 mt-12 rounded-lg justify-center items-center flex flex-row gap-2'>
        <Ionicons name="heart" size={22} color='#fff'/>
        <TextF className=' text-white pt-1'>บ้านพักที่ชื่นชอบ</TextF>
      </TouchableOpacity>
      <View className='flex flex-row justify-between mt-8'>
        <TextF className='text-lg text-normalText'>จำนวนเงินสุทธิ</TextF>
        <TextF className='text-lg text-normalText'>152,600 บาท</TextF>
      </View>
      <View className='flex flex-row justify-between mt-8'>
        <TextF className=' text-label'>การลงทุนที่เหมาะกับคุณ</TextF>
      </View>
      <View className=' bg-unselectInput w-full h-36 mt-5 rounded-lg'></View>
      <View className='flex flex-row justify-between mt-8'>
        <TextF className=' text-label'>ข้อมูล</TextF>
      </View>
      <View className='mb-10 mt-2'>
        {dataProfile.map((data, index) => (
          <View 
          key={index}
          className='flex flex-row justify-between border-b h-14 border-banner items-center'>
            <TextF className='text-lg text-normalText'>{data.title}</TextF>
            <TextF className='text-lg text-primary'>{data.detail}</TextF>
          </View>
        ))}
      </View>
        
      <View className='h-32'></View>
    </ScrollView>
  )
}

export default Profile



