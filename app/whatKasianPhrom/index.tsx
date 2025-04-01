import React,{ useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import HeadTitle from '../components/headTitle';
import TextF from '../components/TextF';
import Mascot from '../components/mascot';

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
        <ScrollView style={{ backgroundColor: '#f9f9fb' }}>

      
      {/* Mascot and Main info */}
      <View className="px-5 py-6 flex-row items-center">
      <View style={{position:'absolute', top: 0, left:-10}} className='' ><Mascot fromP={'main'} type={'normal'} isPress={true} className='w-44 h-40 overflow-hidden'/></View>
        <View className="flex-1 ml-32">
          <Text className="text-xl font-semibold text-primary mb-2">เกษียณพร้อม</Text>
          <Text className="text-base text-gray-700 leading-5">
            แอปพลิเคชันที่จะช่วยให้คุณวางแผนการเกษียณอย่างเป็นระบบ พร้อมมาสคอตน่ารักที่จะคอยให้กำลังใจคุณตลอดเส้นทาง
          </Text>
        </View>
      </View>

      {/* Feature cards */}
      <View className="px-5 mb-6">
        <Text className="text-xl font-semibold text-primary mb-4">ฟีเจอร์หลักของเรา</Text>
        
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-full bg-primary2 items-center justify-center">
              <Text className="text-white font-bold">1</Text>
            </View>
            <Text className="text-lg font-semibold ml-3 text-primary2">คำนวณและวางแผนการเกษียณ</Text>
          </View>
          <Text className="text-gray-700 pl-12">ระบบคำนวณที่ช่วยให้คุณวางแผนการเกษียณอย่างเป็นระบบ เห็นภาพชัดเจน</Text>
        </View>
        
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-full bg-primary2 items-center justify-center">
              <Text className="text-white font-bold">2</Text>
            </View>
            <Text className="text-lg font-semibold ml-3 text-primary2">ติดตามเป้าหมายการออม</Text>
          </View>
          <Text className="text-gray-700 pl-12">ระบบติดตามเป้าหมายและบันทึกการเก็บเงิน ให้คุณเห็นความก้าวหน้าของตัวเอง</Text>
        </View>
        
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-full bg-primary2 items-center justify-center">
              <Text className="text-white font-bold">3</Text>
            </View>
            <Text className="text-lg font-semibold ml-3 text-primary2">ระบบวัดความเสี่ยงการลงทุน</Text>
          </View>
          <Text className="text-gray-700 pl-12">ประเมินความเสี่ยงและแนะนำกลยุทธ์การลงทุนที่เหมาะกับคุณ</Text>
        </View>
        
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-full bg-primary2 items-center justify-center">
              <Text className="text-white font-bold">4</Text>
            </View>
            <Text className="text-lg font-semibold ml-3 text-primary2">แนะนำบ้านพักคนชรา</Text>
          </View>
          <Text className="text-gray-700 pl-12">ข้อมูลและตัวเลือกบ้านพักคนชราที่น่าสนใจเพื่อการวางแผนในอนาคต</Text>
        </View>
        
        <View className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-full bg-primary2 items-center justify-center">
              <Text className="text-white font-bold">5</Text>
            </View>
            <Text className="text-lg font-semibold ml-3 text-primary2">บทความความรู้การเงิน</Text>
          </View>
          <Text className="text-gray-700 pl-12">บทความการเงินที่ให้ความรู้และเทคนิคในการบริหารเงินเพื่อการเกษียณ</Text>
        </View>
        
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="flex-row items-center mb-2">
            <View className="w-10 h-10 rounded-full bg-primary2 items-center justify-center">
              <Text className="text-white font-bold">6</Text>
            </View>
            <Text className="text-lg font-semibold ml-3 text-primary2">ระบบจัดการหนี้สิน</Text>
          </View>
          <Text className="text-gray-700 pl-12">ช่วยให้คุณจัดการหนี้สินที่มีอยู่ และวางแผนการชำระหนี้อย่างมีประสิทธิภาพ</Text>
        </View>
      </View>
      
      {/* Divider */}
      <View className="border-t border-banner w-11/12 mx-auto"></View>
      
      <View className="px-5 mt-5 mb-6">
        <Text className="text-xl font-semibold text-primary mb-4 text-center">อาจารย์ที่ปรึกษา</Text>
        
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="flex-row items-center">
            <Image 
              source={require('../../assets/picTeamDev/DS_Gas.jpg')}
              className="w-20 h-20 rounded-lg"
              alt="รูปอาจารย์ที่ปรึกษา"
            />
            <View className="ml-6">
              <Text className="text-lg font-semibold text-primary">ดร.วิธวินท์ สุสุทธิ</Text>
              <Text className="text-gray-600">อาจารย์ที่ปรึกษาโครงการ</Text>
            </View>
          </View>
        </View>
      </View>
      
      {/* Team Section - Updated with photo space */}
      <View className="px-5 mb-8">
        <Text className="text-xl font-semibold text-primary mb-4 text-center">ผู้จัดทำ</Text>
        
        <View className="bg-white rounded-xl p-4 shadow-sm mb-3">
          <View className="flex-row items-center">
            <Image 
              source={require('../../assets/picTeamDev/Champ.jpg')}
              className="w-20 h-20 rounded-lg"
              alt="รูปผู้จัดทำ 1"
            />
            <View className="ml-6">
              <Text className="text-lg font-semibold text-primary">นาย มณฑล สุขจินดา</Text>
              <Text className="text-gray-600">ผู้พัฒนาโครงการ</Text>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-xl p-4 shadow-sm mb-3">
          <View className="flex-row items-center">
            <Image 
              source={require('../../assets/picTeamDev/Nai.jpg')}
              className="w-20 h-20 rounded-lg"
              alt="รูปผู้จัดทำ 2"
            />
            <View className="ml-6">
              <Text className="text-lg font-semibold text-primary">นาย ชิณภัทร สุขทอง</Text>
              <Text className="text-gray-600">ผู้พัฒนาโครงการ</Text>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-xl p-4 shadow-sm mb-3">
          <View className="flex-row items-center">
            <Image 
              source={require('../../assets/picTeamDev/Jane.jpg')}
              className="w-20 h-20 rounded-lg"
              alt="รูปผู้จัดทำ 3"
            />
            <View className="ml-6">
              <Text className="text-lg font-semibold text-primary">นาย พศิน เลาห์ภูติ</Text>
              <Text className="text-gray-600">ผู้พัฒนาโครงการ</Text>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-xl p-4 shadow-sm mb-3">
          <View className="flex-row items-center">
            <Image 
              source={require('../../assets/picTeamDev/Deaw.jpg')}
              className="w-20 h-20 rounded-lg"
              alt="รูปผู้จัดทำ 4"
            />
            <View className="ml-6">
              <Text className="text-lg font-semibold text-primary">นาย ภัทรชนน อุไรวิชัยกุล</Text>
              <Text className="text-gray-600">ผู้พัฒนาโครงการ</Text>
            </View>
          </View>
        </View>
        
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <View className="flex-row items-center">
            <Image 
              source={require('../../assets/picTeamDev/Belle.jpg')}
              className="w-20 h-20 rounded-lg"
              alt="รูปผู้จัดทำ 5"
            />
            <View className="ml-6">
              <Text className="text-lg font-semibold text-primary">นางสาว อาทิมา โรจนกมลสันต์</Text>
              <Text className="text-gray-600">ผู้พัฒนาโครงการ</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
        </>
    );
  };

export default WhatKasianPhrom;