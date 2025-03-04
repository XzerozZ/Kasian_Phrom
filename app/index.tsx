import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, ScrollView, StatusBar } from 'react-native';
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
import CalRetirement from './calRetirement';

import NotificationScreen from './notification';
import DetailNursingHouses from './detailnursingHouses';
import FavNursingHouses from './favnursingHouses';
import DebtManagement from './debtManagement';
import WhatKasianPhrom from './whatKasianPhrom';




import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import FinanceDetail from './financeDetail';
import NumberFormatProvider from "./NumberFormatContext";

SplashScreen.preventAutoHideAsync();


function index() {

  const formPage = 'index'
  const [stateNavbar, setStateNavbar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const styles = isDarkMode ? theme.dark : theme.light;
  const [activeTab, setActiveTab] = useState('main');
  const [homeSelected, setHomeSelected] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [stateLoading, setStateLoading] = useState(false); // true = loading, false = loaded ใช้ setStateLoading ตอนที่หน้าแอปโหลดข้อมูลเสร็จ (Default = true)
  const [loading, setLoading] = useState(true);
  const [backto, setBackto] = useState('main');
  const [goAuth, setGoAuth] = useState(false);
  const [homePickInPlan, setHomePickInPlan] = useState('');
  const [formClick, setFormClick] = useState('default');

  const [selectedId, setSelectedId] = useState(0);
  const newsId = selectedId;

  const [isAuth, setIsAuth] = useState(false);
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

    <>
      <NumberFormatProvider>

          <View 
          id='MixContainer'
          style={{position:'relative'}}
          className='w-full pt-10 flex-1 bg-neutral'>
            {loading && <LoadingPage stateLoading={stateLoading} setStateLoading={setStateLoading} setLoading={setLoading}/>}
            {activeTab =='auth' && <Auth isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            {activeTab =='main' && <Main isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setBackto={setBackto} setFormClick={setFormClick}/>}
            {activeTab =='nursingHouses' && <NursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setHomeSelected={setHomeSelected} formPage={formPage} setState={() => {}} setHomePickInPlan={() => {}}/>}
            {activeTab =='dashboard' && <Dashboard isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setBackto={setBackto} setFormClick={setFormClick}/>}
            {activeTab =='finance' && <Finance isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setGoAuth={setGoAuth}/>}
            {activeTab =='profile' && <Profile isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            {activeTab =='appSetting' && <Setting isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            {activeTab =='calRetirement' && <CalRetirement isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} homePickInPlan={homePickInPlan} setHomePickInPlan={setHomePickInPlan} formClick={formClick} setFormClick={setFormClick}/>}
            {activeTab =='assessmentRisk' && <AssessmentRisk isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            {activeTab =='financeDetail' && <FinanceDetail isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setSelectedId={setSelectedId} newsId={newsId} refreshing={refreshing} setRefreshing={setRefreshing}/>}
            {activeTab =='notification' && <NotificationScreen isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            {activeTab =='detailnursingHouses' && <DetailNursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} homeSelected={homeSelected} setHomeSelected={setHomeSelected} formPage={formPage} state={null} setState={()=>{}} homePickInPlan={homePickInPlan} setHomePickInPlan={setHomePickInPlan} setFormClick={setFormClick}/>}
            {activeTab =='favnursingHouses' && <FavNursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setHomeSelected={setHomeSelected} formPage={formPage} setState={() => {}}/>}
            {activeTab =='debtManagement' && <DebtManagement isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} backto={backto}/>}
            {activeTab =='whatKasianPhrom' && <WhatKasianPhrom isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            
          </View>
          {stateNavbar && !loading &&
          <View className='w-full'>
            <Navbar isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab}/>
          </View>}
      </NumberFormatProvider>
    </>
  )
}

export default index
