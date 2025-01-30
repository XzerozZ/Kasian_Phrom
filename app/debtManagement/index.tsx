import React, { useEffect, useState, useRef } from 'react';
import { View,Text , Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from '../components/TextF';
import Svg, { Defs, ClipPath, Path, Rect, Circle } from 'react-native-svg';

import HeadTitle from '../components/headTitle';



  interface LayoutEvent {
    nativeEvent: {
      layout: {
        width: number;
      };
    };
  }

interface DebtManagementProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  activeTab: string;
  setStateNavbar: (state: boolean) => void;
  havePlant: boolean;
  setHavePlant: (state: boolean) => void;
}
const DebtManagement: React.FC<DebtManagementProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {

  const [box1Width, setBox1Width] = useState(0);
  const [state, setState] = useState(1);
  const [stateFutureUse, setStateFutureUse] = useState(false);
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


const [dataAssetInput, setDataAssetInput] = useState([{
  Name: 'บ้านแสนสุข',
  Total_money: '4,500,000',
  Monthly_expenses: '',
  End_year: '2045',
  type: 'home',
},{
  Name: 'รถแสนสุข2',
  Total_money: '8,500,000',
  Monthly_expenses: '',
  End_year: '2055',
  type: 'car',
}
])


const scrollViewRef = useRef<ScrollView>(null);


const handleBack = () => {
  if(state === 1){
    setActiveTab('main')
  }else{
    setState(state-1)
  }
}

  return (
    <>
      <HeadTitle 
      id='CalRetirementHeadTitle'
      setActiveTab={setActiveTab} 
      title='หนี้สิน' 
      onPress={handleBack}/>
      <View className='flex-1'>
        <View className='flex mt-5 items-center px-5'>
          {/* <View className='flex flex-row justify-center items-center'> */}
          
        </View>

        <View className='flex-1 mt-10 rounded-t-3xl overflow-hidden'>
          <ScrollView
          id='CalRetirementContainer' 
          ref={scrollViewRef}
          className={`flex-1`}>
            
          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default DebtManagement

