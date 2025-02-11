import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import LogIn from './logIn'
import SignUp from './signUp'

interface AuthProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Auth: React.FC<AuthProps> = ({ isDarkMode, setActiveTab, setStateNavbar}) => {
  useEffect(() => {
    setStateNavbar(false)
  }, [])

  const [stateLogin, setStateLogin] = useState(true)

  const [typePopup, setTypePopup] = useState('')
  
  const translateYEmailRegister = useRef(new Animated.Value(-130)).current;
  const translateYEmailInvalid = useRef(new Animated.Value(-130)).current;
  const translateYPasswordInvalid = useRef(new Animated.Value(-130)).current;
  const translateYRegisterSuccess = useRef(new Animated.Value(-130)).current;

  useEffect(() => {
    // สำหรับ 'emailIsRegister'
    if (typePopup === 'emailIsRegister') {
      Animated.timing(translateYEmailRegister, {
        toValue: 64,
        duration: 400,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(translateYEmailRegister, {
          toValue: -130,
          duration: 400,
          useNativeDriver: true,
        }).start();

        setTypePopup(""); // ตั้งค่า typePopup เป็นค่าว่าง
      }, 2000);
    }
    
    // สำหรับ 'emailIsInvalid'
    if (typePopup === 'emailIsInvalid') {
      Animated.timing(translateYEmailInvalid, {
        toValue: 64,
        duration: 400,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(translateYEmailInvalid, {
          toValue: -130,
          duration: 400,
          useNativeDriver: true,
        }).start();

        setTypePopup(""); // ตั้งค่า typePopup เป็นค่าว่าง
      }, 2000);
    }

    // สำหรับ 'passwordIsInvalid'
    if (typePopup === 'passIsInvalid') {
      Animated.timing(translateYPasswordInvalid, {
        toValue: 64,
        duration: 400,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(translateYPasswordInvalid, {
          toValue: -130,
          duration: 400,
          useNativeDriver: true,
        }).start();

        setTypePopup(""); // ตั้งค่า typePopup เป็นค่าว่าง
      }, 2000);
    }

    if (typePopup === 'registerSuccess') {
      Animated.timing(translateYRegisterSuccess, {
        toValue: 64,
        duration: 400,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(translateYRegisterSuccess, {
          toValue: -130,
          duration: 400,
          useNativeDriver: true,
        }).start();

        setTypePopup(""); // ตั้งค่า typePopup เป็นค่าว่าง
      }, 2000);
    }
  }, [typePopup]);

  return (
    <View 
    style={outStyles.authPage}
    className='flex-1 bg-bgAuth w-full pt-10'>
      {stateLogin?<LogIn setStateLogin={setStateLogin} setActiveTab={setActiveTab} setTypePopup={setTypePopup}/>:<SignUp setStateLogin={setStateLogin} setActiveTab={setActiveTab} setTypePopup={setTypePopup}/>}
      
      <Animated.View
      style={{
        transform: [{ translateY: translateYEmailRegister }],
      }}
      className="absolute flex justify-center items-center w-full "
    >
      <View className='flex justify-center items-center w-96 h-20 bg-neutral shadow-sm rounded-2xl'><TextF className="text-lg py-2 text-err">อีเมลนี้ถูกลงทะเบียนแล้ว</TextF></View>
    </Animated.View>

      <Animated.View
      style={{
        transform: [{ translateY: translateYEmailInvalid }],
      }}
      className="absolute flex justify-center items-center w-full "
    >
      <View className='flex justify-center items-center w-96 h-20 bg-neutral shadow-sm rounded-2xl'><TextF className="text-lg py-2 text-err">อีเมลไม่ถูกต้อง</TextF></View>
    </Animated.View>

      <Animated.View
      style={{
        transform: [{ translateY: translateYPasswordInvalid }],
      }}
      className="absolute flex justify-center items-center w-full "
    >
      <View className='flex justify-center items-center w-96 h-20 bg-neutral shadow-sm rounded-2xl'><TextF className="text-lg py-2 text-err">รหัสผ่านไม่ถูกต้อง</TextF></View>
    </Animated.View>
    
    <Animated.View
      style={{
        transform: [{ translateY: translateYRegisterSuccess }],
      }}
      className="absolute flex justify-center items-center w-full "
    >
      <View className='flex justify-center items-center w-96 h-20 bg-neutral shadow-sm rounded-2xl'><TextF className="text-lg py-2 text-primary">ลงทะเบียนสำเร็จ</TextF></View>
    </Animated.View>
    </View>
    
  )
}

export default Auth

const outStyles = StyleSheet.create({
  authPage: {
    position: 'absolute', 
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
});