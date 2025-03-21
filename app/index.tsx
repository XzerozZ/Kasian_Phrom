import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, ScrollView, StatusBar } from 'react-native';
import { theme } from '../globalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Port from '../Port';

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
import Mascot from './components/mascot';
import NotiCard from './components/NotiCard';




import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import FinanceDetail from './financeDetail';
import NumberFormatProvider from "./NumberFormatContext";
import { useNumbers } from "./NumberProvider";
import { NumberProvider } from "./NumberProvider";

SplashScreen.preventAutoHideAsync();

interface messageProp{
  id: string;
  message: string;
  balance: number;
  is_read: boolean;
  created_at: string;
  type: string;
  user_id: string;
}


function index() {
  const [formPage, setFormPage] = useState('index');
  const [formPage2, setFormPage2] = useState('index');
  const [stateNavbar, setStateNavbar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const styles = isDarkMode ? theme.dark : theme.light;
  const [activeTab, setActiveTab] = useState('main');
  const [homeSelected, setHomeSelected] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [stateLoading, setStateLoading] = useState(false); // true = loading, false = loaded ใช้ setStateLoading ตอนที่หน้าแอปโหลดข้อมูลเสร็จ (Default = true)
  const [loading, setLoading] = useState(true);
  const [backto, setBackto] = useState('main');
  const [homePickInPlan, setHomePickInPlan] = useState('');
  const [formClick, setFormClick] = useState('default');
  
  const [dataEditAsset, setDataEditAsset] = useState<number | null>(null)
  const [stateFutureUse, setStateFutureUse] = useState(false);

  const [selectedId, setSelectedId] = useState(0);
  const newsId = selectedId;
  // const [messageNoti, setMessageNoti] = useState<messageProp | undefined>({"id":"93a7cef6-5454-4b8a-b9b1-50131f9c7802",
  //   "user_id":"5f4b4e3a-1aa7-41bb-a8e9-111abd5f99da",
  //   "message":"สุดยอดมาก สินทรัพย์ A9 ได้เสร็จสิ้นแล้ว",
  //   "type":"asset","balance":500,"is_read":false,
  //   "created_at":"2025-03-10T04:52:21.87691856Z"});

  const [messageNoti, setMessageNoti] = useState<messageProp | undefined>(undefined);


  const [isAuth, setIsAuth] = useState(false);
  const [loaded] = useFonts({
    KanitRegular: require('../assets/fonts/Kanit-Regular.ttf'),
    SarabunRegular: require('../assets/fonts/Sarabun-Regular.ttf'),
    SarabunBold: require('../assets/fonts/Sarabun-Bold.ttf'),
  });



  // var ws = useRef(new WebSocket(`${Port.WebSocket_URL}/ws`)).current;


  useEffect(() => {
    const connectWebSocket = async () => {
      if (isAuth) {
        const token = await AsyncStorage.getItem('token');
        const u_id = await AsyncStorage.getItem('u_id');
        console.log('Token:', token);
        console.log('u_id:', u_id);

        const ws = new WebSocket(`${Port.WebSocket_URL}/ws/${u_id}`);

        ws.onopen = () => {
          console.log('Connected to the server');
          // ws.send(JSON.stringify({ token }));
        };

        ws.onclose = (e) => {
          console.log('Disconnected. Check internet or server.', e);
        };

        ws.onerror = (e) => {
          console.log('WebSocket Error:', (e as any).message);
        };

        ws.onmessage = (e) => {
          console.log('Message received:', e.data);
          setMessageNoti(JSON.parse(e.data));
        };

        return () => {
          ws.close();
        };
      }
    };

    connectWebSocket();
    return () => {
      console.log('Cleaning up WebSocket connection...');
    };
  }, [isAuth]);



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
        <NumberProvider>
          <View 
          id='MixContainer'
          style={{position:'relative'}}
          className='w-full pt-10 flex-1 bg-neutral'>
            {loading && <LoadingPage stateLoading={stateLoading} setStateLoading={setStateLoading} setLoading={setLoading}/>}
            {activeTab =='auth' && <Auth isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            {activeTab =='main' && <Main isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setBackto={setBackto} setFormClick={setFormClick} isAuth={isAuth} setIsAuth={setIsAuth} setHomeSelected={setHomeSelected}/>}
            {activeTab =='nursingHouses' && <NursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setHomeSelected={setHomeSelected} formPage={formPage} setState={() => {}} setHomePickInPlan={() => {}}/>}
            {activeTab =='dashboard' && <Dashboard isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setBackto={setBackto} setFormClick={setFormClick} setHomeSelected={setHomeSelected}/>}
            {activeTab =='finance' && <Finance isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            {activeTab =='profile' && <Profile isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setFormPage={setFormPage}/>}
            {activeTab =='appSetting' && <Setting isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            {activeTab =='calRetirement' && <CalRetirement isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} homePickInPlan={homePickInPlan} setHomePickInPlan={setHomePickInPlan} formClick={formClick} setFormClick={setFormClick} dataEditAsset={dataEditAsset} setDataEditAsset={setDataEditAsset} stateFutureUse={stateFutureUse} setStateFutureUse={setStateFutureUse}/>}
            {activeTab =='assessmentRisk' && <AssessmentRisk isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            {activeTab =='financeDetail' && <FinanceDetail isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setSelectedId={setSelectedId} newsId={newsId} refreshing={refreshing} setRefreshing={setRefreshing}/>}
            {activeTab =='notification' && <NotificationScreen isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setHomeSelected={setHomeSelected} setFormClick={setFormClick} setDataEditAsset={setDataEditAsset} setStateFutureUse={setStateFutureUse}/>}
            {activeTab =='detailnursingHouses' && <DetailNursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} homeSelected={homeSelected} setHomeSelected={setHomeSelected} formPage={formPage} formPage2={formPage2} state={null} setState={()=>{}} homePickInPlan={homePickInPlan} setHomePickInPlan={setHomePickInPlan} setFormClick={setFormClick}/>}
            {activeTab =='favnursingHouses' && <FavNursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setHomeSelected={setHomeSelected} formPage={formPage} setFormPage2={setFormPage2} setState={() => {}}/>}
            {activeTab =='debtManagement' && <DebtManagement isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} backto={backto}/>}
            {activeTab =='whatKasianPhrom' && <WhatKasianPhrom isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
            
            {messageNoti !== undefined && <NotiCard messageNoti={messageNoti} setMessageNoti={setMessageNoti} setActiveTab={setActiveTab}/>}
          </View>
          {stateNavbar && !loading &&
          <View className='w-full'>
            <Navbar isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} setFormPage={setFormPage}/>
          </View>}
        </NumberProvider>
      </NumberFormatProvider>
    </>
  )
}

export default index
