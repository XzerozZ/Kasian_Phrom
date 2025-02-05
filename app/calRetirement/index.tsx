import React, { useEffect, useState, useRef } from 'react';
import { View,Text , Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from '../components/TextF';
import Svg, { Defs, ClipPath, Path, Rect, Circle } from 'react-native-svg';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HeadTitle from '../components/headTitle';

import State1 from './state1';
import State2 from './state2';
import State3 from './state3';
import State4 from './state4';
import FutureUse from './futureUse';
import NursingHouses from '../page/nursingHouses';
import DetailNursingHouses from '../detailnursingHouses';
import FavNursingHouses from '../favnursingHouses';


  interface LayoutEvent {
    nativeEvent: {
      layout: {
        width: number;
      };
    };
  }

  interface Asset {
    Total_money: string;
    End_year: string;
    type: string;
    Name: string;
  }


interface CalRetirementProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  activeTab: string;
  setStateNavbar: (state: boolean) => void;
}
const CalRetirement: React.FC<CalRetirementProps> = ({ isDarkMode, setActiveTab, activeTab, setStateNavbar}) => {

  const formPage = 'calRetirement'
  const [box1Width, setBox1Width] = useState(0);
  const [state, setState] = useState<number | null>(1);
  const [stateFutureUse, setStateFutureUse] = useState(false);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const colorAnim2 = useRef(new Animated.Value(0)).current;
  const colorAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStateNavbar(false);
    setState(1);
  }, [])

  useEffect(() => {
    // Animate width whenever the state changes

    let targetWidth = 0;
    if (state === 2) targetWidth = box1Width * 0.33;
    else if (state === 3) targetWidth = box1Width * 0.66;
    else if (state === 4) targetWidth = box1Width;

    Animated.timing(widthAnim, {
      toValue: targetWidth,
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: false, // We cannot use native driver for width property
    }).start();

    Animated.timing(colorAnim, {
      toValue: state === 2 ? 1 : 0, // Interpolate between 0 and 1
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(colorAnim2, {
      toValue: state === 3 ? 1 : 0, // Interpolate between 0 and 1
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(colorAnim3, {
      toValue: state === 4 ? 1 : 0, // Interpolate between 0 and 1
      duration: 1000,
      useNativeDriver: false,
    }).start();

  }, [state]);



  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#DBDFEC', '#2A4296'], // Replace with your colors
  });
  const backgroundColor2 = colorAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: ['#DBDFEC', '#2A4296'], // Replace with your colors
  });
  const backgroundColor3 = colorAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: ['#DBDFEC', '#2A4296'], // Replace with your colors
  });





  const handleLayout = (event: LayoutEvent): void => {
    const { width } = event.nativeEvent.layout;
    setBox1Width(width);
  };



const [homeSelected, setHomeSelected] = useState('');

const [homePickInPlan, setHomePickInPlan] = useState('');

const [dataInput, setDataInput] = useState({
  Name: '',
  Birth_date: '',
  Retirement_age: '65',
  Exp_lifespan: '80',
  Current_savings: '',
  Current_savings_returns: '1.5',
  Monthly_income: '',
  Monthly_expenses: '',
  Current_total_investment: '',
  Investment_return: '7',
  Expected_inflation: '3',
  Expected_monthly_expenses: '',
  Annual_expense_increase: '3',
  Annual_savings_return: '1.25',
  Annual_investment_return: '5',
})


const [dataAssetInput, setDataAssetInput] = useState<Asset[]>([])
const [dataEditAsset, setDataEditAsset] = useState<number | null>(null)


const scrollViewRef = useRef<ScrollView>(null);


const handleBack = () => {
  if(state === 1){
    setActiveTab('main')
  }else{
    if (state !== null) {
      setState(state - 1);
    }
  }
}



















  return (
    <>
    {state !== 5 &&
    <>
      <HeadTitle 
      id='CalRetirementHeadTitle'
      setActiveTab={setActiveTab} 
      title='วางแผนชีวิตวัยเกษียณ' 
      onPress={handleBack}/>
      <View className='flex-1'>
        <View className='flex mt-5 items-center px-5'>
          {/* <View className='flex flex-row justify-center items-center'> */}
          <View 
          id='CalRetirementStep' 
          style={{position: 'relative'}}
          className='flex w-10/12'>
            <View 
            onLayout={handleLayout}
            className='flex flex-row justify-between items-center w-full'>
              <View 
              style={{position: 'absolute', top: '50%', left: 0, right: 0, transform: [{translateY: -0.5}]}}
              className=' h-1 bg-unselectInput'></View>
              <View className={`w-10 h-10 bg-primary rounded-full flex justify-center items-center`} ><TextF className='text-white'>1</TextF></View>
              <Animated.View 
              style={{backgroundColor}}
              className={`w-10 h-10 rounded-full flex justify-center items-center`} ><TextF className='text-white'>2</TextF></Animated.View>
              <Animated.View
              style={{backgroundColor:backgroundColor2}} 
              className={`w-10 h-10 rounded-full flex justify-center items-center`} ><TextF className='text-white'>3</TextF></Animated.View>
              <Animated.View 
              style={{backgroundColor:backgroundColor3}}
              className={`w-10 h-10 rounded-full flex justify-center items-center`} ><TextF className='text-white'>4</TextF></Animated.View>
            </View>
            <Animated.View 
            style={{overflow:'hidden', position: 'absolute', left: 0, right: 0, width: widthAnim}}
            // className={`${state === 1 ?'w-0':state === 2 ? 'w-4/12' : state === 3 ? 'w-8/12' : 'w-12/12'}`}
            >

              <View 
              style={{overflow: 'hidden', width: box1Width,}}
              className='flex flex-row justify-between items-center w-full shrink-0'>
                <View 
                style={{position: 'absolute', top: '50%', left: 0, right: 0, transform: [{translateY: -0.5}]}}
                className=' h-1 bg-primary'></View>
                <View className='w-10 h-10 bg-primary rounded-full flex justify-center items-center'><TextF className='text-white'>1</TextF></View>
                <View className='w-10 h-10 bg-primary rounded-full flex justify-center items-center'><TextF className='text-white'>2</TextF></View>
                <View className='w-10 h-10 bg-primary rounded-full flex justify-center items-center'><TextF className='text-white'>3</TextF></View>
                <View className='w-10 h-10 bg-primary rounded-full flex justify-center items-center'><TextF className='text-white'>4</TextF></View>
              </View>
            </Animated.View>
          </View>
        </View>

        <View className='flex-1 mt-10 rounded-t-3xl overflow-hidden'>
          <ScrollView
          id='CalRetirementContainer' 
          ref={scrollViewRef}
          className={`flex-1`}>
            {state === 1 && <State1 isDarkMode={isDarkMode} setState={setState} dataInput={dataInput} setDataInput={setDataInput}/>}
            {state === 2 && <State2 isDarkMode={isDarkMode} setState={setState} scrollViewRef={scrollViewRef} dataInput={dataInput} setDataInput={setDataInput}/>}
            {state === 3 && <State3 isDarkMode={isDarkMode} setState={setState} dataAssetInput={dataAssetInput} setStateFutureUse={setStateFutureUse} setDataAssetInput={setDataAssetInput} setDataEditAsset={setDataEditAsset}/>}
            {state === 4 && <State4 isDarkMode={isDarkMode} setState={setState} dataInput={dataInput} setDataInput={setDataInput} setActiveTab={setActiveTab} dataAssetInput={dataAssetInput} homeSelected={homeSelected} setHomeSelected={setHomeSelected} homePickInPlan={homePickInPlan} setHomePickInPlan={setHomePickInPlan}/>}

            

            
          </ScrollView>
        </View>
      </View>
      </>}
      {state === 5 && homeSelected === '' && <NursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setHomeSelected={setHomeSelected} formPage={formPage} setState={setState} setHomePickInPlan={setHomePickInPlan}/>}
      {state === 6 && homeSelected === '' && <FavNursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} setHomeSelected={setHomeSelected} formPage={formPage} setState={setState}/>}
      {homeSelected !== '' && <DetailNursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} homeSelected={homeSelected} setHomeSelected={setHomeSelected} formPage={formPage} state={state} homePickInPlan={homePickInPlan} setHomePickInPlan={setHomePickInPlan} setState={setState}/>}

      {stateFutureUse && <FutureUse isDarkMode={isDarkMode} setStateFutureUse={setStateFutureUse} dataAssetInput={dataAssetInput} setDataAssetInput={setDataAssetInput} dataEditAsset={dataEditAsset} setDataEditAsset={setDataEditAsset}/>}
    </>
  )
}

export default CalRetirement

