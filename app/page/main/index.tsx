import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import  TextF  from '../../components/TextF';
import { FontAwesome6, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Logo = require('../../../assets/images/logo.png');


interface MainProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Main: React.FC<MainProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
    useEffect(() =>{
      setStateNavbar(true)
    },[]);
  
    
  return (
    <View className='justify-between flex-1'>
      <ScrollView className="flex h-screen gap-5 pb-28">
        <View
          style={{
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
            overflow: 'hidden',
          }}
          className='w-full h-1/4 '>
          <LinearGradient
            colors={['#FFFFFF', '#C8D4FF']}
            style={{
              flex: 1,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
          >
            <View className='flex-row justify-between mt-10 ml-9'>
              <Image source={Logo} style={styles_pic.logo} />
              <View className='mr-7 mt-3'>
                <TouchableOpacity 
                  activeOpacity={1}
                  onPress={()=>setActiveTab('notification')}
                  className=''>
                  <MaterialCommunityIcons name="bell" size={30} color="#2A4296" />
                </TouchableOpacity>
              </View>
            </View>
            <TextF className='justify-center ml-7 text-lg text-normalText'> ระยะเวลาก่อนเกษียณ  23,425 วัน </TextF>
            <TextF className='justify-center ml-7 pt-3 text-xl text-normalText'> จำนวนเงินที่ต้องเก็บก่อนเกษียณ </TextF>
            <TextF className='justify-center ml-7 pt-3 text-2xl text-normalText'> 20,000,000,000    บาท </TextF>
          </LinearGradient>
        </View>
        <View>
          <TextF className='ml-7 mt-6 text-normalText'>ไปให้ถึงเป้าหมายที่วางไว้ </TextF>

          <View className='rounded-xl border border-banner h-32 ml-7 mr-7 mt-8'>
            <TextF className='m-4 ml-6 text-normalText'>จำนวนเงินที่ต้องเก็บในเดือนนี้</TextF>
            <View>
              <TextF className='text-3xl ml-6 text-normalText'>19,000 บาท</TextF>
              <TextF className='text-right mr-5 text-normalText'>ดูแผนของฉัน <AntDesign name="caretright" size={12} color="#F68D2B"/></TextF>
            </View>
          </View>

          <TextF className='ml-7 mt-6'>บริการที่น่าสนใจ </TextF>
          <View className='flex-wrap flex-row px-5 gap-8 mt-5'>
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={() => setActiveTab('nursingHouses')}
            style={{ alignItems: 'center' }} // จัดตำแหน่งให้อยู่กลาง
          >
            <View className="bg-banner h-20 w-20 rounded-3xl justify-center items-center">
              <FontAwesome6 name="person-cane" size={40} color="#2a4296" />
            </View>
            <Text className="pt-3 text-normalText">บ้านพักคนชรา</Text>
          </TouchableOpacity>

            <View className='items-center'>
              <View className='bg-bgmenu_Finance h-20 w-20 rounded-3xl justify-center items-center '><Ionicons name="document-outline" size={30} color="#38b62d"/></View>
              <TextF className='pt-3 text-normalText'>คู่มือการเงิน</TextF>
            </View>
            <View className='items-center'>
              <View className='bg-bgmenu_Change h-20 w-20 rounded-3xl justify-center items-center'><Ionicons name="sync-circle-outline" size={40} color="#19a4ca"/></View>
              <TextF className='pt-3 text-normalText'>ปรับแผน</TextF>
            </View>
            <View className='items-center'>
              <View className='bg-bgmenu_Testfinance h-20 w-20 rounded-3xl justify-center items-center'><FontAwesome name="line-chart" size={25} color="#f04545"/></View>
              <TextF className='break-words w-24 text-center pt-3 text-normalText'>วัดความเสี่ยงการลงทุน</TextF>
            </View>
            <View className='items-center'>
              <View className='bg-bgmenu_Money h-20 w-20 rounded-3xl justify-center items-center'><FontAwesome name="money" size={25} color="#da9e1d"/></View>
              <TextF className='break-words w-24 text-center pt-3 text-normalText'>เงินที่ใช้หลังเกษียณ</TextF>
            </View>
            <View className='items-center'>
              <View className='bg-orange-100 h-20 w-20 rounded-3xl justify-center items-center'><AntDesign name="questioncircleo" size={30} color="#da9e1d"/></View>
              <TextF className='break-words w-20 text-center pt-3 text-normalText'>เกษียณพร้อมคืออะไร?</TextF>
            </View>
          </View>
          <View className='flex-row justify-between ml-7 mt-7'>
            <TextF className='text-normalText'>บ้านพักคนชราแนะนำ</TextF>
            <TouchableOpacity 
              activeOpacity={1} 
              onPress={() => setActiveTab('nursingHouses')}
              style={{ flexDirection: 'row', alignItems: 'center' }} // ใช้สำหรับจัดการตำแหน่งของ text ให้อยู่ในแนวนอน
            >
              <Text className="mr-7 text-normalText">ดูทั้งหมด</Text>
            </TouchableOpacity>

          </View>
          <View className='flex-row'>
            <ScrollView horizontal className='w-11/12'> 
              <View className='flex-row'>
                <Image
                source={{ uri: "https://www.therichnursing.com/wp-content/uploads/2024/01/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B1%E0%B8%81-%E0%B8%84%E0%B8%99%E0%B8%8A%E0%B8%A3%E0%B8%B2-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg" }}
                style={styles_pic.image}
                />
                <Image
                source={{ uri: "https://www.therichnursing.com/wp-content/uploads/2024/01/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B1%E0%B8%81-%E0%B8%84%E0%B8%99%E0%B8%8A%E0%B8%A3%E0%B8%B2-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg" }}
                style={styles_pic.image}
                />
                <Image
                source={{ uri: "https://www.therichnursing.com/wp-content/uploads/2024/01/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B1%E0%B8%81-%E0%B8%84%E0%B8%99%E0%B8%8A%E0%B8%A3%E0%B8%B2-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg" }}
                style={styles_pic.image}
                />
              </View>  
            </ScrollView>
          </View>
        </View>
        
      </ScrollView>
  </View>
  )
}

export default Main

const styles_pic = StyleSheet.create({
  image: {
    width: 170,
    height: 120,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#3498db",
    margin: 7
  },
  logo: {
    width: 70,
    height: 70,
  }
});
