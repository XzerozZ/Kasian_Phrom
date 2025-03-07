import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Mascot from '../components/mascot';
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";

const Logo = require('../../assets/images/logo.png')
const google = require('../../assets/images/googleIcon.png')


interface LogInProps{
  setStateLogin: (state: boolean) => void;
  setActiveTab: (tab: string) => void;
  setTypePopup: (type: string) => void;
  setStatePageForgotPass: (state: boolean) => void;
}
const LogIn: React.FC<LogInProps> = ({ setStateLogin, setActiveTab, setTypePopup, setStatePageForgotPass }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [visiblePassword, setVisiblePassword] = useState(false)
  const [userInformation, setUserInformation] = useState<any>(null)
  

  // GoogleSignin.configure();


  // const googleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     setUserInformation(userInfo);

  //     const formData = new FormData();

  //     formData.append("email", userInfo?.data?.user?.email || '');
  //     formData.append("imagelink", userInfo?.data?.user?.photo || '');
  //     formData.append("firstname", userInfo?.data?.user?.givenName || '');
  //     formData.append("lastname", userInfo?.data?.user?.familyName || '');
  //     formData.append("username", userInfo?.data?.user?.name || '');
      
  //     console.log('formData:', formData);
  //     console.log(Port.BASE_URL)
  //     const response = await fetch(`${Port.BASE_URL}/auth/google/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //       body: formData,
  //     });
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Network response was not ok");
  //     }
  
  //     const data = await response.json();
  //     await AsyncStorage.setItem('token', data.result.token);
  //     console.log("Login Success:", data);
  //     console.log("token:", data.result.token);
      
  //     setActiveTab('main');



  //   } catch (error) {
  //     if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //       console.log("cancelled");
  //     } else if ((error as any).code === statusCodes.IN_PROGRESS) {
  //       console.log("in progress");
  //     } else if ((error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log("play services not available or outdated");
  //     } else {
  //       console.log("Something went wrong", error);
  //     }
  //   }
  // };

console.log(JSON.stringify(userInformation, null, 2));



const handleLogin = async () => {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    console.log('formData:', formData);
    console.log(Port.BASE_URL)
    const response = await fetch(`${Port.BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    const data = await response.json();
    await AsyncStorage.setItem('token', data.result.token);
    console.log("Login Success:", data);

    setActiveTab('main');
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
    if (error instanceof Error && error.message === "invalid email") {
      setTypePopup("emailIsInvalid");
    }else if (error instanceof Error && error.message === "invalid email format") {
      setTypePopup("emailFormatIsInvalid");
    }else if (error instanceof Error && error.message === "invalid password") {
      setTypePopup("passIsInvalid");
    }else{
      throw new Error( error as string);
    }
  }
};









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
          placeholderTextColor={'#B0B0B0'}
          keyboardType='email-address'
          value={email.trim()}
          onChangeText={(text) => setEmail(text.trim())}
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
                placeholderTextColor={'#B0B0B0'}
                secureTextEntry={!visiblePassword}
                value={password.trim()}
                onChangeText={(text) => setPassword(text.trim())}
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
        <TouchableOpacity 
        activeOpacity={1}
        onPress={()=>setStatePageForgotPass(true)}
        className='w-96  items-end px-10 mt-3'>
          <TextF className='text-primary'>ลืมรหัสผ่าน</TextF>
        </TouchableOpacity>
        
        <TouchableOpacity
        activeOpacity={1}
        onPress={handleLogin}
        className={`h-[45] w-[310] mx-5 pr-14 pl-14 mt-5 rounded-full justify-center items-center relative ${ email && password ?'bg-primary':'bg-unselectMenu'} `}>
          <TextF className='text-white text-lg'>เข้าสู่ระบบ</TextF>
          <View style={{position:'absolute', bottom: 40, left:20}} className=' w-20 h-12'><Mascot fromP={'login'} type={'normal'} isPress={false} className='w-32 h-32'/></View>
        </TouchableOpacity>
      </View>
      <View className='w-full items-center px-10 my-5 '>
        <TextF className='text-label'>หรือ</TextF>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        // onPress={googleSignIn}
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
            onPress={()=>setStateLogin(false)}>
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
