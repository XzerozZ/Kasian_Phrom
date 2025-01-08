import React, { useEffect, useState, useRef } from 'react';
import { View,Text , Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from '../components/TextF';
import Svg, { Defs, ClipPath, Path, Rect, Circle } from 'react-native-svg';

import HeadTitle from '../components/headTitle';

import State1 from './state1';
import State2 from './state2';
import State3 from './state3';
import State4 from './state4';
import FutureUse from './futureUse';


  interface LayoutEvent {
    nativeEvent: {
      layout: {
        width: number;
      };
    };
  }

interface CalRetirementProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const CalRetirement: React.FC<CalRetirementProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {

  const [box1Width, setBox1Width] = useState(0);
  const [state, setState] = useState(1);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const colorAnim2 = useRef(new Animated.Value(0)).current;
  const colorAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStateNavbar(false);
  }, [])

  useEffect(() => {
    // Animate width whenever the state changes

    let targetWidth = 0;
    if (state === 2) targetWidth = box1Width * 0.33;
    else if (state === 3) targetWidth = box1Width * 0.66;
    else if (state === 4) targetWidth = box1Width;

    Animated.timing(widthAnim, {
      toValue: targetWidth,
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: false, // We cannot use native driver for width property
    }).start();

    Animated.timing(colorAnim, {
      toValue: state === 2 ? 1 : 0, // Interpolate between 0 and 1
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(colorAnim2, {
      toValue: state === 3 ? 1 : 0, // Interpolate between 0 and 1
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(colorAnim3, {
      toValue: state === 4 ? 1 : 0, // Interpolate between 0 and 1
      duration: 500,
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



const [dataInput, setDataInput] = useState({
  Name: '',
  Birth_date: '',
  Retirement_age: '',
  Exp_lifespan: '',
  Current_savings: '',
  Current_savings_returns: '',
  Monthly_income: '',
  Monthly_expenses: '',
  Current_total_investment: '',
  Investment_return: '',
  Expected_inflation: '',
  Expected_monthly_expenses: '',
  Annual_expense_increase: '',
  Annual_savings_return: '',
})


const [dataAssetInput, setDataAssetInput] = useState({
  Name: '',
  Total_money: '',
  Monthly_expenses: '',
  End_year: '',

})







  return (
    <>
      {state === 1?<HeadTitle setActiveTab={setActiveTab} title='วางแผนชีวิตวัยเกษียณ' route='main'/>
      :<View className='flex-row mt-3 ml-5 h-14 items-center'>
          <TouchableOpacity 
              activeOpacity={1}
              onPress={()=>setState(state-1)}
              className=''>
              <FontAwesome6 name="angle-left" size={28} color='#070F2D'/>
          </TouchableOpacity>
          <Text 
          style={{ fontFamily: 'SarabunBold'}}
          className=' text-normalText text-2xl ml-3 h-12 pt-2'>วางแผนชีวิตวัยเกษียณ</Text>
      </View>}
      <View className='flex-1'>
        <View className='flex mt-5 items-center px-5'>
          {/* <View className='flex flex-row justify-center items-center'> */}
          <View 
          style={{position: 'relative'}}
          className='flex w-10/12'>
            <View 
            id='box1' 
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

              <View id='box2' 
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
        {state === 1 ? <State1 isDarkMode={isDarkMode} dataInput={dataInput} setDataInput={setDataInput}/>
        :<ScrollView className='flex-1 mt-10 rounded-t-3xl pt-5'>
          {state === 2 && <State2 isDarkMode={isDarkMode} dataInput={dataInput} setDataInput={setDataInput}/>}
          {state === 3 && <State3 isDarkMode={isDarkMode} dataAssetInput={dataAssetInput} setDataAssetInput={setDataAssetInput}/>}
          {state === 4 && <State4 isDarkMode={isDarkMode} dataInput={dataInput} setDataInput={setDataInput}/>}
        </ScrollView>}

      </View>
    </>
  )
}

export default CalRetirement

