import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


WebBrowser.maybeCompleteAuthSession();


// web 788619682273-er631gpvr0vg6e6q4lnreasgopbgqev3.apps.googleusercontent.com
// ios 788619682273-jih87ufg9fpk2ul960tbcnvc36sn667t.apps.googleusercontent.com
// android 788619682273-983bndch72394g38b36af4jq3gu2hj6o.apps.googleusercontent.com

const Logo = require('../../assets/images/logo.png')
const google = require('../../assets/images/googleIcon.png')
interface LogInProps{
  setStateLogin: (state: boolean) => void;
  setActiveTab: (tab: string) => void;
}
const LogIn: React.FC<LogInProps> = ({ setStateLogin, setActiveTab }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [userInformation, setUserInformation] = useState<any>(null)
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: '788619682273-er631gpvr0vg6e6q4lnreasgopbgqev3.apps.googleusercontent.com',
    androidClientId: '788619682273-983bndch72394g38b36af4jq3gu2hj6o.apps.googleusercontent.com',
    iosClientId: '788619682273-jih87ufg9fpk2ul960tbcnvc36sn667t.apps.googleusercontent.com',

  });









  return (
    <View 
    style={{position:'relative'}}
    className='flex-1 mt-14 justify-center items-center'>
      <TouchableOpacity 
        activeOpacity={1}
        onPress={()=>setActiveTab('main')}
        style={{position:'absolute', left:20, top:0}}
        className=' w-16'>

          <FontAwesome6 name="angle-left" size={28} color='#6780D6'/>
      </TouchableOpacity>
      <Image 
      source={Logo} 
      style={outStyles.imsge}
      className='w-52 h-52'/>
      <TextF className='text-2xl text-primary mt-5 mb-5'>ลงชื่อเข้าใช้</TextF>
      <View className='flex w-full items-center'>
        <View style={{position:'relative'}}>
          <TextInput
                placeholder="อีเมล"
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
                className={`h-[45] w-[310] mx-5 px-5 pl-14 mt-5 bg-neutral rounded-full text-lg`}/>
          <View
          className='w-10 h-12 items-center justify-center mt-5'
          style={{ position: 'absolute', left: 25, top: 0 }}>
            <Ionicons name='mail' size={25} color='#C9C9C9'/>
          </View>
        </View>
        <View 
        className='mt-3'
        style={{position:'relative'}}>
          <TextInput
                placeholder="รหัสผ่าน"
                secureTextEntry={!visiblePassword}
                value={password}
                onChangeText={setPassword}
                className={`h-[45] w-[310] mx-5 pr-14 pl-14 mt-5 bg-neutral rounded-full text-lg`}/>
          <View 
          className='w-10 h-12 items-center justify-center mt-5 '
          style={{ position: 'absolute', left: 25, top: 0 }}>
            <FontAwesome6 name='key' size={20} color='#C9C9C9' />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVisiblePassword(prev => !prev)}
            style={{ position: 'absolute', right: 30, top: 0 }}
            className='w-10 h-12 items-center justify-center mt-5 '
          >
            <FontAwesome6 name={visiblePassword ? 'eye-slash' : 'eye'} size={21} color='#C9C9C9' />
          </TouchableOpacity>
        </View>
        <View className='w-96  items-end px-10 mt-3'>
          <TextF className='text-primary'>ลืมรหัสผ่าน</TextF>
        </View>
        <TouchableOpacity
        activeOpacity={1}
        // onPress={handleLogin}
        className={`h-[45] w-[310] mx-5 pr-14 pl-14 mt-5 rounded-full justify-center items-center ${ email && password ?'bg-primary':'bg-unselectMenu'}  `}>
          <TextF className='text-white text-lg'>เข้าสู่ระบบ</TextF>
        </TouchableOpacity>
      </View>
      <View className='w-full items-center px-10 my-5 '>
        <TextF className='text-label'>หรือ</TextF>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={()=>promptAsync()}
        className={`h-14 px-10 mx-5 rounded-full justify-center items-center bg-neutral flex flex-row gap-3`}>
          <Image 
          source={google} 
          style={outStyles.imageGoogle}
          className='h-10 w-10'/><TextF className='text-normalText text-lg'>เข้าสู่ระบบด้วย Google</TextF>
      </TouchableOpacity>
      <View className='w-full flex flex-row justify-center items-center px-10 my-5 mb-24'>
        <TextF className='text-normalText'>ยังไม่มีบัญชี </TextF>
        <TouchableOpacity
            activeOpacity={1}
            onPress={()=>setStateLogin(false)}
          >
          <TextF className='text-primary'>สมัครสมาชิก</TextF>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LogIn

const outStyles = StyleSheet.create({
  imsge: {
    width: 200,
    height: 200,
    objectFit: 'contain',
  },
  imageGoogle: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
});
