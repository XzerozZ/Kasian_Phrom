import React, { useEffect, useState, useRef } from 'react';
import { View,Text , Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6, FontAwesome, Fontisto, Octicons, MaterialCommunityIcons, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from '../components/TextF';
import Svg, { Defs, ClipPath, Path, Rect, Circle } from 'react-native-svg';

import HeadTitle from '../components/headTitle';
import AddDebt from './addDebt';



interface DebtManagementProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  backto: string;
}

interface DebtItem {
  id: number;
  name: string;
  type: string;
  amount: number;
  round: number;
  allAmount: number;
  date: string;
  status: string;
  moreInfo: boolean;
}


const DebtManagement: React.FC<DebtManagementProps> = ({ isDarkMode, setActiveTab, setStateNavbar, backto }) => {

  const [statePage, setStatePage] = useState('debtManagement');

  useEffect(() => {
    setStateNavbar(false);
  }, [])



  const [data, setData] = useState([
    {
      id: 1,
      name: 'บ้าน1',
      type: 'home',
      amount: 12000,
      round: 4,
      allAmount: 48000,
      date: 'ม.ค. 68',
      status: 'pending',
      moreInfo: false
    },
    {
      id: 2,
      name: 'รถ1',
      type: 'car',
      amount: 15000,
      round: 3,
      allAmount: 45000,
      date: 'ม.ค. 68',
      status: 'pending',
      moreInfo: false
    },
    {
      id: 3,
      name: 'รถ1',
      type: 'car',
      amount: 12000,
      round: 4,
      allAmount: 48000,
      date: 'ธ.ค. 67',
      status: 'late',
      moreInfo: false
    },
    {
      id: 4,
      name: 'รถ2',
      type: 'car',
      amount: 15000,
      round: 3,
      allAmount: 45000,
      date: 'ม.ค. 68',
      status: 'success',
      moreInfo: false
    },
    {
      id: 5,
      name: 'ที่ดิน1',
      type: 'land',
      amount: 0,
      round: 4,
      allAmount: 48000,
      date: 'ม.ค. 68',
      status: 'rest',
      moreInfo: false
    },
    {
      id: 6,
      name: 'iphone1',
      type: 'iphone',
      amount: 15000,
      round: 3,
      allAmount: 45000,
      date: 'ม.ค. 68',
      status: 'pending',
      moreInfo: false
    },
  ]);


  const animatedHeights = useRef<{ [key: number]: Animated.Value }>(
    data.reduce((acc: { [key: number]: Animated.Value }, item) => {
      acc[item.id] = new Animated.Value(105);
      return acc;
    }, {})
  ).current;
  


  const toggleMoreInfo = (id : number): void => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, moreInfo: !item.moreInfo } : item
      )
    );

    Animated.timing(animatedHeights[id], {
      toValue: data.find((item) => item.id === id)?.moreInfo ? 105 : 235,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
    {statePage === 'debtManagement' && 
    <>
      <HeadTitle 
      setActiveTab={setActiveTab} 
      title='หนี้สิน' 
      onPress={() => setActiveTab(backto)}/>
      <ScrollView className='flex-1'>
        <View className=' flex'>
          <View className='mt-2 flex justify-center items-center bg-bg_debt mx-8 p-3 pt-4 pb-5 rounded-3xl shadow'>
            <View className='flex w-full items-center gap-5'>
              <TextF className='text-lg'>ต้องชำระอีกในเดือนนี้</TextF>
              <TextF className='text-3xl scale-125'>12,000</TextF>
              <TextF>บาท</TextF>
            </View>
            <View className='mt-5 w-11/12 h-[2] bg-err'></View>
            <TextF className='text-lg my-3 py-3'>หนี้สินทั้งหมด</TextF>
            <View className='flex flex-row w-full gap-3 '>
                <View className='flex-1 items-center gap-3 pt-5'>
                <TextF className='text-3xl scale-125'>1</TextF>
                <TextF>รายการ</TextF>
              </View>
              <View className=' w-[2] bg-err'></View>
              <View className='flex-1 items-center gap-3 pt-5'>
                <TextF className='text-3xl scale-125'>300,000</TextF>
                <TextF>บาท</TextF>
              </View>
            </View>
          </View>
        </View>
        <View className='flex flex-col gap-2 mt-5'>
          <View className="flex flex-col gap-3 px-5 mb-10">
            {Object.entries(
              data.reduce((acc: { [key: string]: typeof data }, item) => {
                if (!acc[item.type]) acc[item.type] = [];
                acc[item.type].push(item);
                return acc;
              }, {})
            ).map(([type, items]) => (
              <View key={type} className=" pb-2 gap-5">
                {type === 'home' && <View className='flex flex-row gap-2'><FontAwesome6 name="house-chimney" size={18} color="#070F2D" /><Text className="font-bold text-lg">บ้าน</Text></View>}
                {type === 'land' && <View className='flex flex-row gap-2'><Fontisto name="map-marker-alt" size={18} color="#070F2D" /><Text className="font-bold text-lg">ที่ดิน</Text></View>}
                {type === 'car' && <View className='flex flex-row gap-2'><FontAwesome6 name="car" size={18} color="#070F2D" /><Text className="font-bold text-lg">รถ</Text></View>}
                {type === 'card' && <View className='flex flex-row gap-2'><FontAwesome6 name="credit-card" size={18} color="#070F2D" /><Text className="font-bold text-lg">ค่างวด</Text></View>}
                {type !== 'home' && type !== 'land' && type !== 'car' && <View className='flex flex-row gap-2'><Text className="font-bold text-lg">{type}</Text></View>}
                {items.map((item) => (
                  <Animated.View 
                  key={item.id} 
                  style={{height: animatedHeights[item.id] }}
                  className={`border rounded-xl px-3 pt-2  overflow-hidden ${item.status === 'pending'? 'border-primary':item.status === 'late'?'border-err':item.status === 'rest'?' border-neutral2':'border-neutral2'}`}>
                    <View className="flex flex-row gap-2 items-center justify-between">
                      <TextF className="text-lg">{item.name}</TextF>
                      <View className="flex flex-row gap-2 items-center">
                        <TextF className="text text-label">{item.date}</TextF>
                        <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => toggleMoreInfo(item.id)}
                        className="flex items-center justify-center w-6 h-6">
                          {item.moreInfo?
                          <FontAwesome6 name="angle-up" size={18} color="#2A4296" />
                          :<FontAwesome6 name="angle-down" size={18} color="#2A4296" />}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View className="flex flex-row gap-2">
                      <TextF className="text text-label">ยอดชำระต่อเดือน</TextF>
                    </View>
                    <View className="flex flex-row gap-2 items-center justify-between"> 
                      <View className="flex flex-row gap-2 items-end">
                        <TextF className={`text-2xl font-bold ${item.status === 'pending' || item.status === 'success' ? 'text-primary':item.status === 'late'?'text-err':item.status === 'rest'?'text-label':''}`}>{item.amount}</TextF>
                        <TextF className="text-lg ">บาท</TextF>
                      </View>
                      {item.status === 'pending' && <View className='border border-primary bg-primary rounded-lg w-28 h-10 flex justify-center items-center'><TextF className="text-lg text-white">ชำระ</TextF></View>}
                      {item.status === 'late' && <View className='border border-err bg-err rounded-lg w-28 h-10 flex justify-center items-center'><TextF className="text-lg text-white">ค้างชำระ</TextF></View>}
                      {item.status === 'success' && <View className='border border-oktext rounded-lg w-28 h-10 flex justify-center items-center flex-row gap-1'><TextF className="text-lg text-oktext">ชำระแล้ว</TextF><Ionicons name="checkmark-circle" size={20} color="#30CC30" /></View>}
                      {item.status === 'rest' && <View className='border border-label rounded-lg w-28 h-10 flex justify-center items-center'><TextF className="text-lg text-label">หยุดพัก</TextF></View>}
                      
                    </View>
                    <View className="flex flex-row justify-between gap-2 mt-5">
                      <TextF className="text-lg">เหลือ</TextF>
                      <View className="flex flex-row gap-2 items-end">
                        <TextF className="text-lg">{item.round}</TextF>
                        <TextF className="text-lg">เดือน</TextF>
                      </View>
                    </View>
                    <View className="flex flex-row justify-between">
                      <TextF className="text-lg">คิดเป็นเงินที่ต้องชำระอีก</TextF>
                      <View className="flex flex-row gap-3 items-end">
                        <TextF className="text-lg">{item.allAmount}</TextF>
                        <TextF className="text-lg">บาท</TextF>
                      </View>
                    </View>
                    <View className="flex flex-row gap-2 w-full mt-5">
                      <TouchableOpacity 
                      activeOpacity={1}
                      onPress={() => setStatePage('addDebt')}
                      className="flex-1 items-center justify-center bg-primary rounded-lg h-12">
                        <TextF className="text-lg py-2 text-white">แก้ไขข้อมูลหนี้สิน</TextF>
                      </TouchableOpacity>
                      <View className="flex-1 items-center justify-center bg-err rounded-lg h-12">
                        <TextF className="text-lg py-2 text-white">ลบข้อมูลหนี้สิน</TextF>
                      </View>
                    </View>

                  </Animated.View>
                ))}
              </View>
            ))}
          </View>
        </View>







      </ScrollView>
      </>
    }
    {statePage === 'addDebt' && <>
      <AddDebt isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStatePage={setStatePage}/>
    </>}

    </>
  )
}

export default DebtManagement

