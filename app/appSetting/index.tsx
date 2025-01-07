import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import HeadTitle from '../components/headTitle';
import  TextF  from '../components/TextF';
import Logo from '../../assets/images/logo.png';



interface appSettingProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const appSetting: React.FC<appSettingProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
    useEffect(() =>{
        setStateNavbar(false)
    },[]);

    const [userName, setUserName] = useState('');
    const [fristName, setFristName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <ScrollView className='flex-1'>
            <HeadTitle isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} title='ตั้งค่า' route='profile'/>
            <View className='px-5'>
                <View className='flex flex-row justify-between mt-5'>
                    <TextF className=' text-label'>ตั้งค่าโปรไฟล์</TextF>
                </View>
                <View className='flex flex-row mt-8 items-center gap-8'>
                    <View 
                    style={{position:'relative', borderWidth: 3}}
                    className='w-32 h-32 rounded-full border-primary'>
                        <Image source={Logo} style={outStyles.image}/>
                    </View>
                    <View className='h-32 justify-between pr-5 max-w-56'>
                        <View className='flex flex-row w-full'>
                            <TextInput
                            placeholder="ชื่อผู้ใช้"
                            keyboardType='default'
                            value={userName}
                            onChangeText={setUserName}
                            className={`text-lg border-b border-unselectInput w-full`}/>
                            <View className='w-10 h-10 items-center justify-center border-b border-unselectInput'>
                                <FontAwesome6 name='pen' size={12} color='#C9C9C9'/>
                            </View>
                        </View>
                        <View className='flex flex-row'>
                            <TextInput
                            placeholder="ชื่อจริง"
                            keyboardType='default'
                            value={fristName}
                            onChangeText={setFristName}
                            className={`text-lg border-b border-unselectInput  w-full`}/>
                            <View className='w-10 h-10 items-center justify-center border-b border-unselectInput'>
                                <FontAwesome6 name='pen' size={12} color='#C9C9C9'/>
                            </View>
                        </View>
                        <View className='flex flex-row'>
                            <TextInput
                            placeholder="สกุล"
                            keyboardType='default'
                            value={lastName}
                            onChangeText={setLastName}
                            className={`text-lg border-b border-unselectInput  w-full`}/>
                            <View className='w-10 h-10 items-center justify-center border-b border-unselectInput'>
                                <FontAwesome6 name='pen' size={12} color='#C9C9C9'/>
                            </View>
                        </View>
                    </View>
                </View>
                <View className='flex items-end mt-5'>
                    <TouchableOpacity 
                    activeOpacity={1}
                    className='w-40 h-10 bg-primary ml-5 mt-5 rounded-lg justify-center items-center flex flex-row gap-2'>
                        <TextF className=' text-white'>บันทึก</TextF>
                        <MaterialIcons name="save-alt" size={22} color='#fff'/>
                    </TouchableOpacity>
                </View>
                <View className='w-full border-b mt-8 border-unselectInput'></View>
                <View className='flex flex-row justify-between mt-5'>
                    <TextF className=' text-label'>ตั้งค่าบัญชี</TextF>
                </View>
                <View className='flex flex-row justify-between mt-5'>
                    <TextF className=' text-normalText text-lg'>อีเมล</TextF>
                    <TextF className=' text-normalText text-lg'>example@gmail.com</TextF>
                </View>
                <View className='flex flex-row justify-between mt-5'>
                    <TextF className=' text-normalText text-lg'>รีเซ็ตรหัสผ่าน</TextF>
                    <View className='flex gap-2 w-50'>
                        <TextInput
                            placeholder="รหัสผ่านเก่า"
                            keyboardType='default'
                            value={lastName}
                            onChangeText={setLastName}
                            className={`text-lg border-b border-unselectInput  w-full`}/>
                        <TextInput
                            placeholder="รหัสผ่านใหม่"
                            keyboardType='default'
                            value={lastName}
                            onChangeText={setLastName}
                            className={`text-lg border-b border-unselectInput  w-full`}/>
                    </View>
                </View>
            </View>
            
        </ScrollView>
    )
}

export default appSetting

const outStyles = StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
      borderRadius:'100%',
      resizeMode: 'contain',
    },
  });