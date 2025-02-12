import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

import AssessCard from '@/app/components/AssessCard';
import Port from '../../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  TextF  from '../../components/TextF';
const Logo = require('../../../assets/images/logo.png')
import { useNumberFormat } from "@/app/NumberFormatContext";



interface Profile {
  age: number,
  u_id: string,
  fname: string,
  lname: string,
  uname: string,
  email: string,
  provider: string,
  image_link: string,
  role: {
    r_id: number,
    role: string,
  },
  retirement: {
    financial_id: string,
    planName: string,
    birth_date: string,
    retirement_age: number,
    expect_lifespan: number,
    current_savings: number,
    current_savings_returns: number,
    monthly_income: number,
    monthly_expenses: number,
    current_total_investment: number,
    investment_return: number,
    expected_monthly_expenses: number,
    expected_inflation: number,
    annual_expense_increase: number,
    annual_savings_return: number,
    annual_investment_return: number,
    user_id: string,
    created_at: string,
    updated_at: string,
  };
  risk: {
    Risk: {
      risk_id: number,
      risk: string
    }
  }

}
interface MoneyProfile {
  all_money: number;
}

interface ProfileProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Profile: React.FC<ProfileProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
    const[userProfile, setUserProfile] = useState<Profile>();
    const[userMoney, setUserMoney] = useState<MoneyProfile>();
    const [dataProfile, setDataProfile] = useState<{ title: string; detail: string }[]>([]);
    const [imgProfile, setImgProfile] = useState<string>('');
    const { addCommatoNumber } = useNumberFormat();
    

    useEffect(() =>{
      setStateNavbar(true)
      const detailProfile = async() => {
        try {
          const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${Port.BASE_URL}/user`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      const responseMoney = await fetch(`${Port.BASE_URL}/user/plan`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      if (!response.ok) {
  
        const errorData = await response.json();
        console.log('errorDataAsset',errorData)
        throw new Error(errorData.message || "Network response was not ok");
      }
  
      const dataUser = await response.json();
      const dataMoney = await responseMoney.json();
      setUserProfile(dataUser.result)
      setUserMoney(dataMoney.result)
      console.log('----------------------a',JSON.stringify(dataUser.result, null, 2));
      console.log('----------------------a',JSON.stringify(dataMoney.result, null, 2));
      setDataProfile([
        { title: 'อายุที่ต้องการเกษียณ', detail: String(dataUser.result?.retirement?.retirement_age ?? '') },
        { title: 'อายุที่คาดว่าจะเสียชีวิต', detail: String(dataUser.result?.retirement?.expect_lifespan ?? '')},
        { title: 'รายรับต่อเดือน', detail: String(dataUser.result?.retirement?.monthly_income ?? '') },
        { title: 'รายจ่ายต่อเดือน', detail: String(dataUser.result?.retirement?.monthly_expenses ?? '') },
        { title: 'เงินเฟ้อ', detail: String(dataUser.result?.retirement?.expected_inflation ?? '') },
        { title: 'รายจ่ายหลังเกษียณ/เดือน', detail: String(dataUser.result?.retirement?.expected_monthly_expenses ?? '') },
        { title: 'การเพิ่มขึ้นของรายจ่าย/ปี', detail: String(dataUser.result?.retirement?.annual_expense_increase ?? '') },
        { title: 'ผลตอบแทนจากการออม/ปี', detail: String(dataUser.result?.retirement?.annual_savings_return ?? '') },
        { title: 'ผลตอบแทนจากการลงทุน/ปี', detail: String(dataUser.result?.retirement?.annual_investment_return ?? '') },
      ]);
      setImgProfile(dataUser.result?.image_link ?? '');
      
    } catch (error) {
      throw new Error(error as string);
    }
      }
      detailProfile()
      

    },[]);
    const router = useRouter();


    
console.log('dataProfile',dataProfile)


  
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
      <View className='flex flex-row justify-start pl-14 gap-10 items-center h-40'>
        <View 
        style={{ borderWidth: 3}}
        className='w-36 h-36 rounded-full border-primary overflow-hidden'>
          <Image 
            source={{uri: imgProfile}}
            style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
        </View>
        <View className='flex flex-row gap-2 h-32'>
          <View className='flex justify-between'>
            <TextF className='text-lg text-normalText'>ชื่อผู้ใช้</TextF>
            <TextF className='text-lg text-normalText'>ชื่อ</TextF>
            <TextF className='text-lg text-normalText'>อายุ</TextF>
          </View>
          <View className='flex justify-between'>
            <TextF className='text-lg text-normalText'> {userProfile?.uname}</TextF>
            <TextF className='text-lg text-normalText'> {userProfile?.fname} {userProfile?.lname}</TextF>
            <TextF className='text-lg text-normalText'> {userProfile?.age}</TextF>
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
        <TextF className='text-lg text-normalText'>{addCommatoNumber(userMoney?.all_money)}</TextF>
      </View>
      <View className='flex flex-row justify-between mt-8'>
        <TextF className=' text-label'>การลงทุนที่เหมาะกับคุณ</TextF>
      </View>
      <AssessCard setActiveTab={setActiveTab}/>
      {dataProfile.length > 0 && <View>
        <View className='flex flex-row justify-between mt-8'>
          <TextF className=' text-label'>ข้อมูล</TextF>
        </View>
        <View className='mb-10 mt-2'>
          {dataProfile.map((data, index) => (
            <View 
            key={index}
            className='flex flex-row justify-between border-b h-14 border-banner items-center'>
              <TextF className='text-lg text-normalText'>{data.title}</TextF>
              <TextF className='text-lg text-primary'>{addCommatoNumber(data.detail)}</TextF>
            </View>
          ))}
        </View>
      </View>}
      <View className='h-32'></View>
    </ScrollView>
  )
}

export default Profile