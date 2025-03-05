import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';

import  TextF  from '../../components/TextF';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Port from '@/Port';

import Saving from './Saving';
import Report from './Report';
import Record from './Record';


interface DashboardProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  setBackto: (backto: string) => void;
  setFormClick: (formClick: string) => void;
  setHomeSelected: (homeSelected: string) => void;
}
const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, setActiveTab, setStateNavbar, setBackto, setFormClick, setHomeSelected }) => {
  const [page, setPage] = useState(0) // 0 = Saving, 1 = Report, 2 = Record
  const indicators = [0, 1, 2];
  const animatedWidth = indicators.map(() => useRef(new Animated.Value(8)).current);
  const [isAuth, setIsAuth] = useState(false);
  const [textAuth, setTextAuth] = useState<string>('');

  const [statePopup, setStatePopup] = useState(false);
  const [dataPopup, setDataPopup] = useState<any>('');
  
  const [reflesh, setReflesh] = useState(false);
  const [havePlan, setHavePlan] = useState(false);
  const [textHavePlan, setTextHavePlan] = useState<string>('');
  
  


  useEffect(() =>{
    setStateNavbar(true)
    setBackto('dashboard')
    setFormClick('default')
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token !== undefined && token !== null ) {
        setIsAuth(true);
        setTextAuth('')
      }else{
        setIsAuth(false);
        setTextAuth('คุณยังไม่ได้เข้าสู่ระบบ')
      }
      const response = await fetch(`${Port.BASE_URL}/user/plan`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('--------------------------+++',data)
      if (data.result === null) {
        setHavePlan(false)
        setTextHavePlan('คุณยังไม่ได้สร้างแผน')
      }else{
        setHavePlan(true)
        setTextHavePlan('')
      }
      
    };
    getToken();
  },[]);


  useEffect(() => {
    indicators.forEach((_, index) => {
      Animated.timing(animatedWidth[index], {
        toValue: page === index ? 40 : 8,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [page]);


  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get('window').width;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / screenWidth);
    setPage(pageIndex);
  };

  const scrollToPage = (pageIndex: any) => {
    scrollViewRef.current?.scrollTo({ x: pageIndex * screenWidth, animated: true });
  };

  const handleChangePageL = () => {
    if (page > 0) {
      scrollToPage(page - 1);
    }
  };
  const handleChangePageR = () => {
    if (page < 2) {
      scrollToPage(page + 1);
    }
  }

  
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (dataPopup !== '') {
      // แสดง Popup (fade-in + scale-up)
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // ซ่อน Popup หลัง 2 วินาที (fade-out + scale-down)
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setDataPopup("");
        });
      }, 2000);
    }
  }, [dataPopup]);


  return (
    <>
      {isAuth ?
      !havePlan ?
      <>
        <View className='flex-1 justify-center content-center'>
        {textHavePlan !== '' &&
        <> 
          <TextF className='text-center text-3xl text-label py-2'>คุณยังไม่ได้สร้างแผน</TextF>
          <TextF className='text-center text-lg text-label py-2'>มาเริ่มสร้างแผนการเกษียณของคุณกันเลย</TextF>
        </>}
        </View>
      </>
      : <View 
      id='DashboardContainer'
      className='flex-1'>
        <View className="w-full flex flex-row justify-between items-center h-24 px-6 border-b border-neutral2">
          <TouchableOpacity 
          id='BtnLeftDashboard'
          onPress={handleChangePageL}
          activeOpacity={1}
          className=' w-20'>

            <FontAwesome6 name="angle-left" size={25} color={page== 0 ?'#C8D4FF':'#6780D6'}/>
          </TouchableOpacity>
          <View 
          id='DashboardTitle'
          className='gap-2'>
            <TextF  className="text-xl font-bold">
              {page == 0 ? 'รายงานความคืบหน้า' : page == 1 ? 'บันทึกการออม' : 'ประวัติการออม'}
            </TextF>
            <View className='flex flex-row items-center justify-center gap-1'>
                {indicators.map((_, index) => (
                <Animated.View
                  key={index}
                  style={{
                    width: animatedWidth[index],
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: page === index ? '#6780D6' : '#C8D4FF',
                  }}
                />
              ))}
            </View>
          </View>
          <TouchableOpacity
          id='BtnRightDashboard'
          onPress={handleChangePageR}
          activeOpacity={1}
          className=' w-20 flex items-end'>
            <View className='w-4'>
              <FontAwesome6 name="angle-right" size={25} color={page== 2 ?'#C8D4FF':'#6780D6'}/>
            </View>
          </TouchableOpacity>
        </View>
        

        <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className='flex flex-row gap-5'>
        {/* หน้า Report */}
        <View className='shrink-0 w-screen'>
          <Report isDarkMode={isDarkMode} reflesh={reflesh} setActiveTab={setActiveTab} setHomeSelected={setHomeSelected}/>
        </View>
        {/* หน้า Saving */}
        <View className='shrink-0 w-screen'>
          <Saving isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStatePopup={setStatePopup} setDataPopup={setDataPopup} reflesh={reflesh} setReflesh={setReflesh} />
        </View>
        {/* หน้า Record */}
        <View className='shrink-0 w-screen'>
          <Record isDarkMode={isDarkMode} reflesh={reflesh}/>
        </View>
      </ScrollView>
        

      </View>
    :<>
      <View className='flex-1 justify-center content-center'>
          {textAuth !== '' &&<>
            <TextF className='text-center text-3xl text-label py-2'>คุณยังไม่ได้เข้าสู่ระบบ</TextF>
            <TextF className='text-center text-lg text-label py-2'>โปรดเข้าสู่ระบบเพื่อการใช้งานฟีเจอร์นี้</TextF>
          </>}
      </View>
    </>}
    {statePopup && <>
    {dataPopup !==  ''&&
    <TouchableOpacity 
    activeOpacity={1}
    onPress={() => setDataPopup('')}
    className=' absolute flex-1 h-full w-full justify-center items-center' style={{ flex: 1, top: 0, left:0}}>
    <BlurView
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      intensity={40}
      tint="prominent" // หรือใช้ "dark", "extraLight"
    />
    <Animated.View 
    style={[
      { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }
    ]}
    className='w-10/12 h-80 bg-neutral rounded-2xl shadow-lg flex justify-center items-center gap-3'>
      {dataPopup === 'Insufficient_savings' || dataPopup === 'Insufficient_investment' 
      ?<FontAwesome6 
        name="circle-xmark" 
        size={34} 
        color="#FF5449"/>
      :<FontAwesome6 
        name="circle-check" 
        size={34} 
        color={dataPopup === 'Successfully_deposited_money_into_savings_account' || dataPopup === 'Successfully_deposited_money_into_investment_account' ?"#38b62d":'#F68D2B'} />}
      {dataPopup === 'Successfully_deposited_money_into_savings_account' && <TextF className='text-3xl text-primary'>ออมเงินสำเร็จ</TextF>}
      {dataPopup === 'Successfully_deposited_money_into_investment_account' && <TextF className='text-3xl text-primary'>ออมเงินลงทุนสำเร็จ</TextF>}
      {dataPopup === 'Successfully_withdraw_money_from_savings_account' && <TextF className='text-3xl text-accent'>ถอนเงินออมสำเร็จ</TextF>}
      {dataPopup === 'Successfully_withdraw_money_from_investment_account' && <TextF className='text-3xl text-accent'>ถอนเงินลงทุนสำเร็จ</TextF>}
      {dataPopup === 'Insufficient_savings' && <TextF className='text-2xl text-err'>เงินออมของคุณไม่เพียงพอในการถอน</TextF>}
      {dataPopup === 'Insufficient_investment' && <TextF className='text-2xl text-err'>เงินลงทุนของคุณไม่เพียงพอในการถอน</TextF>}

    </Animated.View>
  </TouchableOpacity>}
    </>
    }
  </>
  )
}

export default Dashboard

