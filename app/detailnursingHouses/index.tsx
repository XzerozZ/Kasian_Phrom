import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface DetailNursingHousesProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  selectedHome: string
}

const DetailNursingHouses: React.FC<DetailNursingHousesProps> = ({ isDarkMode, setActiveTab, setStateNavbar, selectedHome}) => {
    useEffect(() =>{
            setStateNavbar(false)
          },[]);
  return (
    <>
      <View className='flex-row mt-3 ml-5 h-14 items-center'>
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={() => setActiveTab('nursingHouses')} // ใช้ detailnursingHouses
          className=''
        >
          <FontAwesome6 name="angle-left" size={28} color='#070F2D' />
        </TouchableOpacity>
        <Text 
          style={{ fontFamily: 'SarabunBold' }}
          className='text-normalText text-2xl ml-3 h-12 pt-2'
        >
          บ้านพักคนชรา
        </Text>
      </View>
      <ScrollView>
        
      </ScrollView>
      
    </>
  );
};

export default DetailNursingHouses;
