import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, ScrollView } from 'react-native';
import { theme } from '../globalStyle';

import LoadingPage from './loadingPage';

import Auth from './auth';

import Navbar from './components/Navbar';
import Main from './page/main';
import NursingHouses from './page/nursingHouses';
import Dashboard from './page/dashboard';
import Finance from './page/finance';
import Profile from './page/profile';
import AssessmentRisk from './assessmentRisk';

import Setting from './appSetting';


import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import FinanceDetail from './financeDetail';
SplashScreen.preventAutoHideAsync();


function index() {

  const [stateNavbar, setStateNavbar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const styles = isDarkMode ? theme.dark : theme.light;
  const [activeTab, setActiveTab] = useState('assessmentRisk');

  const [stateLoading, setStateLoading] = useState(false); // true = loading, false = loaded ใช้ setStateLoading ตอนที่หน้าแอปโหลดข้อมูลเสร็จ (Default = true)
  const [loading, setLoading] = useState(true);

  const [loaded] = useFonts({
    KanitRegular: require('../assets/fonts/Kanit-Regular.ttf'),
    SarabunRegular: require('../assets/fonts/Sarabun-Regular.ttf'),
    SarabunBold: require('../assets/fonts/Sarabun-Bold.ttf'),
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

      {/* {activeTab =='auth' ? <Auth isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>
      : */}
      <View 
      style={{position:'relative'}}
      className='w-full pt-10 flex-1'>
        {loading && <LoadingPage stateLoading={stateLoading} setStateLoading={setStateLoading} setLoading={setLoading}/>}
        {activeTab =='auth' && <Auth isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='main' && <Main isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='nursingHouses' && <NursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='dashboard' && <Dashboard isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='finance' && <Finance isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='profile' && <Profile isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='appSetting' && <Setting isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='assessmentRisk' && <AssessmentRisk isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='financeDetail' && <FinanceDetail isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
      </View>
      {stateNavbar && !loading &&
      <View className='w-full'>
        <Navbar isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>}
    </View>
  )
}

export default index