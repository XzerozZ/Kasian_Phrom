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
const Auth: React.FC<AuthProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  useEffect(() => {
    setStateNavbar(false)
  }, [])

  const [stateLogin, setStateLogin] = useState(true)

  return (
    <View 
    style={outStyles.authPage}
    className='flex-1 bg-bgAuth w-full pt-10'>
      {stateLogin?<LogIn setStateLogin={setStateLogin} setActiveTab={setActiveTab}/>:<SignUp setStateLogin={setStateLogin} setActiveTab={setActiveTab}/>}
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