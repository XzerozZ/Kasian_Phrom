import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, ScrollView } from 'react-native';
import { theme } from '../globalStyle';

import LoadingPage from './loadingPage';

import Navbar from './components/Navbar';
import Main from './page/main';
import NursingHouses from './page/nursingHouses';
import Dashboard from './page/dashboard';
import Finance from './page/finance';
import Profile from './page/profile';

import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
SplashScreen.preventAutoHideAsync();


function index() {

  const [stateNavbar, setStateNavbar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const styles = isDarkMode ? theme.dark : theme.light;
  const [activeTab, setActiveTab] = useState('dashboard');

  const [stateLoading, setStateLoading] = useState(false); // true = loading, false = loaded ใช้ setStateLoading ตอนที่หน้าแอปโหลดข้อมูลเสร็จ (Default = true)
  const [loading, setLoading] = useState(true);

  const [loaded] = useFonts({
    KanitRegular: require('../assets/fonts/Kanit-Regular.ttf'),
    SarabunRegular: require('../assets/fonts/Sarabun-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  

  return (

    <View className={`flex-1 justify-between items-center ${styles.container}`}>
      <View className='w-full pt-10 flex-1 h-40'>
        {loading && <LoadingPage stateLoading={stateLoading} setStateLoading={setStateLoading} setLoading={setLoading}/>}
        {activeTab =='main' && <Main isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='nursingHouses' && <NursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='dashboard' && <Dashboard isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='finance' && <Finance isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='profile' && <Profile isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
      </View>
      {stateNavbar &&
      <View className='w-full'>
        <Text style={{ fontFamily: 'SarabunRegular'}}>ดก่หาด้เกหาดเกหา่ด้กดjnsfrldg;ihsgkdkgj0จจ</Text>
        <Navbar isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>}
    </View>
  )
}

export default index