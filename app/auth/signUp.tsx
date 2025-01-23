import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';


const Logo = require('../../assets/images/logo.png')
const google = require('../../assets/images/googleIcon.png')
interface SignUpProps{
  setStateLogin: (state: boolean) => void;
  setActiveTab: (tab: string) => void;
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setStateLogin, setActiveTab, isAuth, setIsAuth  }) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)


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
      style={{objectFit: 'contain'}}
      className='w-52 h-52'/>
      <TextF className='text-2xl text-primary mb-5'>สมัครสมาชิก</TextF>
      <View className='flex w-full items-center gap-2'>
        <View style={{position:'relative'}}>
          <TextInput
                placeholder="ชื่อผู้ใช้"
                keyboardType='default'
                value={username}
                onChangeText={setUsername}
                // placeholderTextColor='#C9C9C9'
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
        <View 
        className=''
        style={{position:'relative'}}>
          <TextInput
                placeholder="ยืนยันรหัสผ่าน"
                secureTextEntry={!visibleConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
        onPress={()=>setStateLogin(true)}
        className={`h-[45] w-[310] mx-5 pr-14 pl-14 mt-5 rounded-full justify-center items-center ${ username&& email && password && confirmPassword ?'bg-primary':'bg-unselectMenu'}  `}>
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
          style={{objectFit: 'contain'}}
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