import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import  TextF  from '../../components/TextF';

import Saving from './Saving';
import Report from './Report';
import Record from './Record';


interface DashboardProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  const [page, setPage] = useState(0) // 0 = Saving, 1 = Report, 2 = Record
  const indicators = [0, 1, 2];
  const animatedWidth = indicators.map(() => useRef(new Animated.Value(8)).current);


  useEffect(() =>{
    setStateNavbar(true)
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


  return (
    <View 
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
            {page == 0 ? 'บันทึกการออม' : page == 1 ? 'รายงานความคืบหน้า' : 'ประวัติการออม'}
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
      {/* หน้า Saving */}
      <View className='shrink-0 w-screen'>
        <Saving isDarkMode={isDarkMode} setActiveTab={setActiveTab}/>
      </View>
      {/* หน้า Report */}
      <View className='shrink-0 w-screen'>
        <Report isDarkMode={isDarkMode} />
      </View>
      {/* หน้า Record */}
      <View className='shrink-0 w-screen'>
        <Record isDarkMode={isDarkMode} />
      </View>
    </ScrollView>
      

    </View>
  )
}

export default Dashboard