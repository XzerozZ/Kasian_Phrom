import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import  TextF  from './TextF';


import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { theme } from '../../globalStyle';


interface NavbarProps {
  isDarkMode: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}


  
const Navbar: React.FC<NavbarProps> = ({ isDarkMode, activeTab, setActiveTab }) => {

  const styles = isDarkMode ? theme.dark : theme.light;

  const getIconColor = (tab: string) => {
    if (activeTab === tab) return '#2A4296'; // สีเขียวเมื่อ active
    return isDarkMode ? '#979797' : '#979797'; // เปลี่ยนสีตาม dark mode หรือ light mode
  };
  const getTextColor = (tab: string) => {
    if (activeTab === tab) return 'text-primary'; // สีเขียวเมื่อ active
    return styles.textNav; // เปลี่ยนสีตาม dark mode หรือ light mode
  }


  return (
    <View 
    style={{ position: 'absolute', bottom: 0, zIndex: 1000 }}
    className={`w-full h-28 rounded-t-3xl flex flex-row justify-around items-end shadow pb-8 ${styles.container}`}>

        <TouchableOpacity  
        onPress={() => setActiveTab('main')}
        activeOpacity={1}
        className="flex-1 flex flex-col justify-center items-center gap-1 active:none">
          <FontAwesome6 name="house" size={23} color={getIconColor('main')} />
          <TextF className={`text-sm ${getTextColor('main')}`}>หน้าหลัก</TextF>
        </TouchableOpacity>

        <TouchableOpacity  
        onPress={() => setActiveTab('nursingHouses')}
        activeOpacity={1}
        className="flex-1 flex flex-col justify-center items-center gap-1">
          <FontAwesome6 name="person-cane" size={25} color={getIconColor('nursingHouses')} />
          <TextF className={`text-sm ${getTextColor('nursingHouses')}`}>บ้านพัก</TextF>
        </TouchableOpacity>

        <TouchableOpacity  
        onPress={() => setActiveTab('dashboard')}
        activeOpacity={1}
        className="flex-1 flex flex-col justify-center items-center gap-1">
          <MaterialIcons name="dashboard" size={35} color={getIconColor('dashboard')} />
          <TextF className={`text-sm ${getTextColor('dashboard')}`}>แผนของฉัน</TextF>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={() => setActiveTab('finance')} 
        activeOpacity={1}
        className="flex-1 flex flex-col justify-center items-center gap-1">
          <FontAwesome6 name="chart-line" size={23} color={getIconColor('finance')} />
          <TextF className={`text-sm ${getTextColor('finance')}`}>คู่มือการเงิน</TextF>
        </TouchableOpacity>

        <TouchableOpacity  
        onPress={() => setActiveTab('profile')}
        activeOpacity={1}
        className="flex-1 flex flex-col justify-center items-center gap-1">
          <FontAwesome6 name="user-large" size={23} color={getIconColor('profile')} />
          <TextF className={`text-sm ${getTextColor('profile')}`}>โปรไฟล์</TextF>
        </TouchableOpacity>

    </View>
  )
}

export default Navbar
