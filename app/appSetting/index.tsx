import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import HeadTitle from '../components/headTitle';
import  TextF  from '../components/TextF';
import CheckBox from '../components/checkBox';
import DropdownCustom from '../components/DropdownCustom';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Logo = require('../../assets/images/logo.png')
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
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);

    const [selectedOption, setSelectedOption] = useState('ไทย (บาท ฿)');
    const [selectedLanguage, setSelectedLanguage] = useState('ไทย');
    const options = [
        {title:'ไทย (บาท ฿)'},
        {title:'USA (ดอลล่าร์ $)'}
    ];
    const optionsLanguage = [
        {title:'ไทย'},
        {title:'English'}
    ];

    
    const [isDark, setIsDark] = useState(false);
    const [isNotification, setIsNotification] = useState(true);


    const handleLogout = async () => {
        try {
            // await AsyncStorage.removeItem('token');

            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${Port.BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            });
            if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Network response was not ok");
            }
            await AsyncStorage.removeItem('token');
            setActiveTab('main');
        } catch (error) {
            throw new Error( error as string);
        }
    };

    

    return (
        <> 
            <HeadTitle 
            id='HeadTitleSetting'
            setActiveTab={setActiveTab} 
            onPress={() => setActiveTab('profile')}
            title='ตั้งค่า'/>
            <View className='w-full px-5 mt-3 border-b border-unselectInput'></View>
            <ScrollView 
            id='ProfileContainer'
            className='flex-1' ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                
                <View className='px-5'>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-label pt-2'>ตั้งค่าโปรไฟล์</TextF>
                    </View>
                    <View className='flex flex-row mt-8 items-center gap-8'>
                        <View 
                        id=' BtnSettingChangeImg'
                        style={{position:'relative', borderWidth: 3}}
                        className='w-32 h-32 rounded-full border-primary'>
                            <Image 
                            source={Logo}
                            style={{objectFit: 'contain'}}
                            className='w-full h-full rounded-full'/>
                        </View>
                        <View className=' justify-between pr-5 w-1/2'>
                            <View className='flex flex-row items-end'>
                                <TextInput
                                id=' EditInputUserName'
                                placeholder="ชื่อผู้ใช้"
                                placeholderTextColor={'#B0B0B0'}
                                keyboardType='default'
                                value={userName}
                                onChangeText={setUserName}
                                className={`text-lg border-b border-unselectInput w-full`}/>
                                <View className='w-10 h-10 items-center justify-center border-b border-unselectInput'>
                                    <FontAwesome6 name='pen' size={12} color={userName ? '#2A4296' : '#C9C9C9' }/>
                                </View>
                            </View>
                            <View className='flex flex-row items-end'>
                                <TextInput
                                id=' EditInputFristName'
                                placeholder="ชื่อจริง"
                                placeholderTextColor={'#B0B0B0'}
                                keyboardType='default'
                                value={fristName}
                                onChangeText={setFristName}
                                className={`text-lg border-b border-unselectInput  w-full`}/>
                                <View className='w-10 h-10 items-center justify-center border-b border-unselectInput'>
                                    <FontAwesome6 name='pen' size={12} color={fristName ? '#2A4296' : '#C9C9C9' }/>
                                </View>
                            </View>
                            <View className='flex flex-row items-end'>
                                <TextInput
                                id=' EditInputLastName'
                                placeholder="สกุล"
                                placeholderTextColor={'#B0B0B0'}
                                keyboardType='default'
                                value={lastName}
                                onChangeText={setLastName}
                                className={`text-lg border-b border-unselectInput  w-full`}/>
                                <View className='w-10 h-10 items-center justify-center border-b border-unselectInput'>
                                    <FontAwesome6 name='pen' size={12} color={lastName ? '#2A4296' : '#C9C9C9' }/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='flex items-end mt-5'>
                        <TouchableOpacity 
                        id=' BtnSaveProfile'
                        activeOpacity={1}
                        className={`w-40 h-10  ml-5 mt-5 rounded-lg justify-center items-center flex flex-row gap-2 ${userName || fristName || lastName ?'bg-primary':'bg-unselectMenu'}`}>
                            {/* ต้องเช็คว่าต่างจากเดิมไหมด้วย */}
                            <TextF className=' text-white'>บันทึก</TextF>
                            <MaterialIcons name="save-alt" size={22} color='#fff'/>
                        </TouchableOpacity>
                    </View>
                    <View className='w-full border-b mt-8 border-unselectInput'></View>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-label pt-2'>ตั้งค่าบัญชี</TextF>
                    </View>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-normalText text-lg'>อีเมล</TextF>
                        <TextF className=' text-primary text-lg'>example@gmail.com</TextF>
                    </View>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-normalText text-lg'>รีเซ็ตรหัสผ่าน</TextF>
                        <View className='flex gap-8 w-8/12'>
                            <TextInput
                                id=' EditInputOldPassword'
                                onFocus={() => {
                                    scrollViewRef.current?.scrollTo({
                                        y: 200,
                                        animated: true,
                                    });
                                }}
                                placeholder="รหัสผ่านเก่า"
                                placeholderTextColor={'#B0B0B0'}
                                keyboardType='default'
                                value={oldPassword}
                                onChangeText={setOldPassword}
                                className={`text-lg border-b border-unselectInput  w-full`}/>
                            <TextInput
                                id=' EditInputNewPassword'
                                onFocus={() => {
                                    scrollViewRef.current?.scrollTo({
                                        y: 200,
                                        animated: true,
                                    });
                                }}
                                placeholder="รหัสผ่านใหม่"
                                placeholderTextColor={'#B0B0B0'}
                                keyboardType='default'
                                value={newPassword}
                                onChangeText={setNewPassword}
                                className={`text-lg border-b border-unselectInput  w-full`}/>
                        </View>
                    </View>
                    <View className='flex items-end mt-5'>
                        <TouchableOpacity 
                        id=' BtnChangePassword'
                        activeOpacity={1}
                        className={`w-40 h-10 ml-5 mt-5 rounded-lg justify-center items-center flex flex-row gap-2 ${newPassword && oldPassword ?'bg-primary':'bg-unselectMenu'}`}>
                            <TextF className=' text-white'>เปลี่ยน</TextF>
                        </TouchableOpacity>
                    </View>
                    <View className='w-full border-b mt-8 border-unselectInput'></View>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-label pt-2'>ตั้งค่าแอป</TextF>
                    </View>
                    <View className='gap-5 mt-5'>
                        <View className='flex flex-row justify-between mt-5'>
                            <TextF className=' text-normalText text-lg'>สกุลเงินหลัก</TextF>
                            <View className='w-1/2'>
                                <DropdownCustom options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                            </View>
                        </View>
                        <View className='flex flex-row justify-between mt-5'>
                            <TextF className=' text-normalText text-lg'>ภาษา</TextF>
                            <View 
                            style={{right: 0, zIndex: 10}}
                            className=' absolute w-1/2'>
                                <DropdownCustom options={optionsLanguage} selectedOption={selectedLanguage} setSelectedOption={setSelectedLanguage}/>
                            </View>
                        </View>
                        <View className='flex flex-row justify-between mt-5'>
                            <TextF className=' text-normalText text-lg'>ธีม</TextF>
                            <View className='flex flex-row gap-5'>
                                <TextF className='text-normalText text-lg w-14 text-center'>มืด</TextF>
                                <View 
                                id='BtnChangeTheme'
                                className='flex flex-row gap-5 justify-center items-center'>
                                    <CheckBox toggle={isDark} setToggle={setIsDark}/>
                                </View>
                                <TextF className='text-normalText text-lg w-14 text-center'>สว่าง</TextF>
                            </View>
                        </View>
                        <View className='flex flex-row justify-between mt-5'>
                            <TextF className=' text-normalText text-lg'>แจ้งเตือน</TextF>
                            <View className='flex flex-row gap-5'>
                                <TextF className='text-normalText text-lg w-14 text-center'>ปิด</TextF>
                                <View 
                                id='BtnChangeNotification'
                                className='flex flex-row gap-5 justify-center items-center'>
                                    <CheckBox toggle={isNotification} setToggle={setIsNotification}/>
                                </View>
                                <TextF className='text-normalText text-lg w-14 text-center'>เปิด</TextF>
                            </View>
                        </View>
                    </View>
                    <View className='w-full border-b mt-8 border-unselectInput'></View>
                    <TouchableOpacity 
                    id='BtnLogout'
                    activeOpacity={1}
                    onPress={()=>handleLogout()}
                    className='flex flex-row justify-between my-10 mb-14'>
                        <TextF className='text-lg text-err'>ออกจากระบบ</TextF>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </>
    )
}

export default appSetting
