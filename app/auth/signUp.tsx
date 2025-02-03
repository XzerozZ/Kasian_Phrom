import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import Port from '../../Port';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Logo = require('../../assets/images/logo.png')
const google = require('../../assets/images/googleIcon.png')
interface SignUpProps{
  setStateLogin: (state: boolean) => void;
  setActiveTab: (tab: string) => void;
  setTypePopup: (type: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setStateLogin, setActiveTab, setTypePopup }) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)
  const [passIsNotMatch, setPassIsNotMatch] = useState(false)




  const handleSigup = async () => {
    try {
      const response = await fetch(`${Port.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uname: username,
          email: email,
          password: password,
          role: "User"
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message && errorData.message.includes('uni_users_email')) {
            setTypePopup("emailIsRegister");
        }else{
            throw new Error('Network response was not ok');
        }
      }
  
      const data = await response.json();
      console.log(data,'+++++++++')

      setStateLogin(true)
    } catch (error) {
      throw new Error( error as string);
      
      
    }
  };
  

  return (
    <View 
    style={{position:'relative'}}
    className='flex-1 mt-14 justify-center items-center'>
      <TouchableOpacity 
        activeOpacity={1}

        style={{position:'absolute', left:20, top:0}}
        className=' w-16'>

          <FontAwesome6 name="angle-left" size={28} color='#6780D6'/>
      </TouchableOpacity>
      <Image 
      source={Logo} 
      style={outStyles.image}
      className='w-52 h-52'/>
      <TextF className='text-2xl text-primary mb-5'>สมัครสมาชิก</TextF>
      <View className='flex w-full items-center gap-2'>
        <View style={{position:'relative'}}>
          <TextInput
                placeholder="ชื่อผู้ใช้"
                placeholderTextColor={'#B0B0B0'}
                keyboardType='default'
                value={username}
                onChangeText={setUsername}
                className={`h-[45] w-[310] mx-5 px-5 pl-14 mt-5 bg-neutral rounded-full text-lg`}/>
          <View
          className='w-10 h-12 items-center justify-center mt-5'
          style={{ position: 'absolute', left: 25, top: 0 }}>
            <FontAwesome6 name='user-large' size={20} color='#C9C9C9'/>
          </View>
        </View>
        <View style={{position:'relative'}}>
          <TextInput
                placeholder="อีเมล"
                placeholderTextColor={'#B0B0B0'}
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
        className=''
        style={{position:'relative'}}>
          <TextInput
                placeholder="รหัสผ่าน"
                placeholderTextColor={'#B0B0B0'}
                secureTextEntry={!visiblePassword}
                value={password}
                onChangeText={setPassword}
                onBlur={()=>confirmPassword !== '' ?setPassIsNotMatch(password !== confirmPassword):null}
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
        <View 
        className=''
        style={{position:'relative'}}>
          {passIsNotMatch &&
          <View
          style={{position: 'absolute', right: 30, top: -3 }}>
            <TextF className='text-sm text-err'>*หรัสผ่านไม่ตรงกัน</TextF>
          </View>}
          
          <TextInput
                placeholder="ยืนยันรหัสผ่าน"
                placeholderTextColor={'#B0B0B0'}
                secureTextEntry={!visibleConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onBlur={()=>setPassIsNotMatch(password !== confirmPassword)}
                className={`h-[45] w-[310] mx-5 pr-14 pl-14 mt-5 bg-neutral rounded-full text-lg`}/>
          <View 
          className='w-10 h-12 items-center justify-center mt-5 '
          style={{ position: 'absolute', left: 25, top: 0 }}>
            <FontAwesome6 name='key' size={20} color='#C9C9C9' />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setVisibleConfirmPassword(prev => !prev)}
            style={{ position: 'absolute', right: 30, top: 0 }}
            className='w-10 h-12 items-center justify-center mt-5 '
          >
            <FontAwesome6 name={visibleConfirmPassword ? 'eye-slash' : 'eye'} size={21} color='#C9C9C9' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        activeOpacity={1}
        onPress={()=>{ username&& email && password && confirmPassword && !passIsNotMatch ? handleSigup() : null }}
        className={`h-[45] w-[310] mx-5 pr-14 pl-14 mt-5 rounded-full justify-center items-center ${ username&& email && password && confirmPassword && !passIsNotMatch ?'bg-primary':'bg-unselectMenu'}`}>
          <TextF className='text-white text-lg'>สมัครสมาชิก</TextF>
        </TouchableOpacity>
      </View>
      <View className='w-full items-center px-10 my-5 '>
        <TextF className='text-label'>หรือ</TextF>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        className={`h-14 px-10 mx-5 rounded-full justify-center items-center bg-neutral flex flex-row gap-3`}>
          <Image 
          source={google} 
          style={outStyles.imageGoogle}
          className='h-10 w-10'/>
          <TextF className='text-normalText text-lg'>เข้าสู่ระบบด้วย Google</TextF>
      </TouchableOpacity>
      <View className='w-full flex flex-row justify-center items-center px-10 my-5 mb-24'>
        <TextF className='text-normalText'>มีบัญชีอยู่แล้ว </TextF>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=>setStateLogin(true)}
        >
          <TextF className='text-primary'>ลงชื่อเข้าใช้</TextF>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp

const outStyles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  imageGoogle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});