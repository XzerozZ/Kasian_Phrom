import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome6, Entypo, FontAwesome, Fontisto, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from '../../components/TextF';
import { BlurView } from 'expo-blur';
import Port from '@/Port';

interface ForgotPassProps {
  isDarkMode: boolean;
  setStatePageForgotPass: (state: boolean) => void;
  setTypePopup: (type: string) => void;
}
const ForgotPass: React.FC<ForgotPassProps> = ({ isDarkMode, setStatePageForgotPass, setTypePopup }) => {

  const [stateForgotPage, setStateForgotPage] = useState(0)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(Array(6).fill(''));
  const otpRefs = Array(6).fill(null).map(() => useRef<TextInput>(null));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [passIsNotMatch, setPassIsNotMatch] = useState(false);
  const [otpInCorrect, setOtpInCorrect] = useState(false);
  const [sameOldPassword, setSameOldPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);


  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
      // แสดง Popup (fade-in + scale-up)
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

  }, []);

  const handleSentOTP = () => {
    console.log('Sent OTP to email:', email);
    
    const sendOTP = async () => {
      const formData = new FormData();
      formData.append("email", email);
      const response = await fetch(`${Port.BASE_URL}/auth/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        setInvalidEmail(true)
        throw new Error(errorData.message || "Network response was not ok");
      }
      setInvalidEmail(false)
      setStateForgotPage(1)
    }
    sendOTP()
  }

  const handleCheckOTP = () => {
    const verifyOTP = async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp.join(''));
      console.log(formData)
      const response = await fetch(`${Port.BASE_URL}/auth/forgotpassword/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        setOtpInCorrect(true)
        throw new Error(errorData.message || "Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
      if(data.message === 'OTP is correct'){
        setStateForgotPage(2)
        setOtpInCorrect(false)
      }
      
    }
    verifyOTP()
  }

  const handleSentNewPassword = () => {
    const sendNewPassword = async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("newpassword", password);
      const response = await fetch(`${Port.BASE_URL}/auth/forgotpassword/changepassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message && errorData.message.includes('new password cannot be the same as the old password')) {
          setSameOldPassword(true)
        }
        console.log(errorData)
        throw new Error(errorData.message || "Network response was not ok");
      }
      const data = await response.json();
      console.log(data)
      setSameOldPassword(false)
      setTypePopup('changePasswordSuccess')
      setStatePageForgotPass(false)
    }
    sendNewPassword()
  }

  
  return (
      <View 
      className=' absolute flex-1 h-screen w-full justify-center items-center' style={{ flex: 1, top: 0, left:0}}>
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        intensity={40}
        tint="prominent" // หรือใช้ "dark", "extraLight"
      />
      <Animated.View 
      style={[
        { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }
      ]}
      onStartShouldSetResponder={() => true}
      onTouchEnd={(event) => event.stopPropagation()}
      className='w-10/12 h-96 bg-white rounded-2xl shadow-lg flex justify-center items-center relative'>
        <TouchableOpacity 
        style={{ top:5, left:5}}
        onPress={()=>setStatePageForgotPass(false)}
        className='absolute'><Entypo name="cross" size={35} color='#FFB36C'/></TouchableOpacity>
        {stateForgotPage === 0 &&
        <View className='flex-1 justify-between items-center py-8'>
          <TextF className='text-normalText text-2xl'>ลืมรหัสผ่าน</TextF>
          <View>
            <TextF className='text-normalText ml-8 text-lg'>กรุณากรอกอีเมลของคุณ</TextF>
            <View style={{position:'relative'}}>
              <TextInput
                placeholder="อีเมล"
                placeholderTextColor={'#B0B0B0'}
                keyboardType='email-address'
                value={email.trim()}
                onChangeText={(text) => setEmail(text.trim())}
                className={`h-[45] w-[310] mx-5 px-5 pl-14 mt-5 bg-neutral border border-primary2 rounded-full text-lg`}/>
              <View
              className='w-10 h-12 items-center justify-center mt-5'
              style={{ position: 'absolute', left: 25, top: 0 }}>
                <Ionicons name='mail' size={25} color='#6780D6'/>
              </View>
            </View>
            {invalidEmail &&<View className='flex justify-end items-end mr-5 py-2'><TextF className='text-err '>อีเมลของคุณไม่ถูกต้อง</TextF></View>}
          </View>
          

          <View className='flex flex-col gap-2 justify-center items-center'>
            <TextF className='text-label text-sm '>รหัส OTP จะถูกส่งไปยังอีเมลของคุณ</TextF>
            <TouchableOpacity
                activeOpacity={1}
                onPress={()=> email !== '' ? handleSentOTP() : null} 
                className='flex justify-center items-center bg-primary rounded-full w-52 h-12'
              >
              <TextF className='text-white'>รับรหัส OTP</TextF>
            </TouchableOpacity>
          </View>
          
        </View>}
        {stateForgotPage === 1 &&
        <>
        <View className='flex-1 justify-between items-center py-8'>
            <TextF className='text-normalText text-2xl'>รับรหัส OTP</TextF>
            <TextF className='text-label'>รหัส OTP ถูกส่งไปที่อีเมลของคุณแล้ว</TextF>
            <View className='flex flex-row gap-2'>
              {Array(6).fill(null).map((_, index) => (
                <TextInput
                  key={index}
                  ref={otpRefs[index]}
                  placeholder=""
                  placeholderTextColor={'#B0B0B0'}
                  keyboardType='numeric'
                  value={otp[index]}
                  maxLength={1}
                  onChangeText={(text) => {
                    const newOtp = [...otp];
                    newOtp[index] = text;
                    setOtp(newOtp);

                    // ไปช่องถัดไปถ้ายังมีช่องเหลือ และใส่ค่ามาเป็น 1 ตัวอักษร
                    if (text && index < 5) {
                      otpRefs[index + 1]?.current?.focus();
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    // กลับไปช่องก่อนหน้าถ้ากดลบและช่องปัจจุบันว่าง
                    if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
                      otpRefs[index - 1].current?.focus();
                    }
                  }}
                  className={`h-12 w-10 bg-neutral rounded-xl text-lg border border-primary2 text-center`}
                />
              ))}
            </View>
            {otpInCorrect && <TextF className='text-err text-sm '>รหัส OTP ของคุณไม่ถูกต้อง</TextF>}
            <TextF className='text-primary text-sm '>ไม่ได้รับรหัสยืนยัน?</TextF>
          <View className='flex flex-col gap-2 justify-center items-center'>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => otp.every(digit => digit) ? handleCheckOTP() : null} 
            className={`flex justify-center items-center rounded-full w-52 h-12 ${
              otp.every(digit => digit) ? 'bg-primary' : 'bg-unselectMenu'
            }`}
          >
            <TextF className='text-white'>ยืนยัน</TextF>
          </TouchableOpacity>

          </View>
        </View>
        </>}
        {stateForgotPage === 2 &&
        <View className='flex-1 justify-between items-center py-8'>
          <TextF className='text-normalText text-2xl'>ใส่รหัสผ่านใหม่ของคุณ</TextF>
          <View>
            {sameOldPassword &&<View className=' flex justify-end items-end pr-5'>
              <TextF className='text-err'>รหัสของคุณไม่สามารถซ้ำกับรหัสเดิมได้</TextF>
            </View>}
            <View style={{position:'relative'}}>
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
                      className={`h-[45] w-[310] mx-5 pr-14 pl-14 mt-5 bg-neutral border border-primary2 rounded-full text-lg`}/>
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
                  <TextF className='text-sm text-err'>*รหัสผ่านไม่ตรงกัน</TextF>
                </View>}
                
                <TextInput
                      placeholder="ยืนยันรหัสผ่าน"
                      placeholderTextColor={'#B0B0B0'}
                      secureTextEntry={!visibleConfirmPassword}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      onBlur={()=>setPassIsNotMatch(password !== confirmPassword)}
                      className={`h-[45] w-[310] mx-5 pr-14 pl-14 mt-5 bg-neutral rounded-full border border-primary2 text-lg`}/>
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
            </View>
          </View>
          <View className='flex flex-col gap-2 justify-center items-center'>
            <TouchableOpacity
                activeOpacity={1}
                onPress={()=> password !== '' && confirmPassword !== '' && password == confirmPassword ? handleSentNewPassword() : null} 
                className={`flex justify-center items-center rounded-full w-52 h-12 ${password !== '' && confirmPassword !== '' && password == confirmPassword ?'bg-primary':'bg-unselectMenu'}`}
              >
              <TextF className='text-white'>เปลี่ยนรหัสผ่าน</TextF>
            </TouchableOpacity>
          </View>
          
        </View>}

      </Animated.View>
    </View>
    
  )
}

export default ForgotPass
