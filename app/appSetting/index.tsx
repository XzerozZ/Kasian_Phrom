import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import HeadTitle from '../components/headTitle';
import  TextF  from '../components/TextF';
import Logo from '../../assets/images/logo.png';
import SelectDropdown from 'react-native-select-dropdown'
import CheckBox from '../components/checkBox';


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


    return (
        <>  
            <HeadTitle isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar} title='ตั้งค่า' route='profile'/>
            <ScrollView className='flex-1' ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                
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
                        <TextF className=' text-primary text-lg'>example@gmail.com</TextF>
                    </View>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-normalText text-lg'>รีเซ็ตรหัสผ่าน</TextF>
                        <View className='flex gap-8 w-8/12'>
                            <TextInput
                                onFocus={() => {
                                    scrollViewRef.current?.scrollTo({
                                        y: 200,
                                        animated: true,
                                    });
                                }}
                                placeholder="รหัสผ่านเก่า"
                                keyboardType='default'
                                value={lastName}
                                onChangeText={setLastName}
                                className={`text-lg border-b border-unselectInput  w-full`}/>
                            <TextInput
                                onFocus={() => {
                                    scrollViewRef.current?.scrollTo({
                                        y: 200,
                                        animated: true,
                                    });
                                }}
                                placeholder="รหัสผ่านใหม่"
                                keyboardType='default'
                                value={lastName}
                                onChangeText={setLastName}
                                className={`text-lg border-b border-unselectInput  w-full`}/>
                        </View>
                    </View>
                    <View className='flex items-end mt-5'>
                        <TouchableOpacity 
                        activeOpacity={1}
                        className='w-40 h-10 bg-unselectMenu ml-5 mt-5 rounded-lg justify-center items-center flex flex-row gap-2'>
                            <TextF className=' text-white'>เปลี่ยน</TextF>
                        </TouchableOpacity>
                    </View>
                    <View className='w-full border-b mt-8 border-unselectInput'></View>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-label'>ตั้งค่าแอป</TextF>
                    </View>
                    <View className='gap-8 mt-5'>
                        <View className='flex flex-row justify-between mt-5'>
                            <TextF className=' text-normalText text-lg'>สกุลเงินหลัก</TextF>
                            <View className='w-2/5 items-end'>
                                <SelectDropdown
                                    data={options}
                                    defaultValueByIndex={0}
                                    onSelect={(selectedItem, index) => {
                                        setSelectedOption(selectedItem.title)
                                        console.log(selectedItem, index);
                                    }}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                        <View className='flex flex-row justify-end items-center bg-neutral border border-primary rounded py-2 pl-5 pr-1 w-full'>
                                            <TextF className='text-lg pl-5'>
                                            {(selectedItem && selectedItem.title)} 
                                            </TextF>
                                            <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} size={25} color={'#2A4296'}/>
                                        </View>
                                        );
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                        <View className={`flex justify-center items-end bg-neutral h-12 ${isSelected ? ' bg-neutral2' : ''}`}>
                                            <TextF className='flex justify-center items-center px-3 py-1'>{item.title}</TextF>
                                        </View>
                                        );
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={{backgroundColor: '#FCFCFC', borderRadius: 6}}
                                    />
                            </View>
                        </View>
                        <View className='flex flex-row justify-between mt-5'>
                            <TextF className=' text-normalText text-lg'>ภาษา</TextF>
                            <View className='w-2/5 items-end'>
                                <SelectDropdown
                                    data={optionsLanguage}
                                    defaultValueByIndex={0}
                                    onSelect={(selectedItem, index) => {
                                        setSelectedLanguage(selectedItem.title)
                                        console.log(selectedItem, index);
                                    }}
                                    renderButton={(selectedItem, isOpened) => {
                                        return (
                                        <View className='flex flex-row justify-end items-center bg-neutral border border-primary rounded py-2 pl-5 pr-1 w-full'>
                                            <TextF className='text-lg pl-5'>
                                            {(selectedItem && selectedItem.title)} 
                                            </TextF>
                                            <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} size={25} color={'#2A4296'}/>
                                        </View>
                                        );
                                    }}
                                    renderItem={(item, index, isSelected) => {
                                        return (
                                        <View className={`flex justify-center items-end bg-neutral h-12 ${isSelected ? ' bg-neutral2' : ''}`}>
                                            <TextF className='flex justify-center items-center px-3 py-1'>{item.title}</TextF>
                                        </View>
                                        );
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    dropdownStyle={{backgroundColor: '#FCFCFC', borderRadius: 6}}
                                    />
                            </View>
                        </View>
                        <View className='flex flex-row justify-between mt-5'>
                            <TextF className=' text-normalText text-lg'>ธีม</TextF>
                            <View className='flex flex-row gap-5'>
                                <TextF className='text-normalText text-lg w-14 text-center'>มืด</TextF>
                                <View className='flex flex-row gap-5 justify-center items-center'>
                                    <CheckBox toggle={isDark} setToggle={setIsDark}/>
                                </View>
                                <TextF className='text-normalText text-lg w-14 text-center'>สว่าง</TextF>
                            </View>
                        </View>
                        <View className='flex flex-row justify-between mt-5'>
                            <TextF className=' text-normalText text-lg'>แจ้งเตือน</TextF>
                            <View className='flex flex-row gap-5'>
                                <TextF className='text-normalText text-lg w-14 text-center'>ปิด</TextF>
                                <View className='flex flex-row gap-5 justify-center items-center'>
                                    <CheckBox toggle={isNotification} setToggle={setIsNotification}/>
                                </View>
                                <TextF className='text-normalText text-lg w-14 text-center'>เปิด</TextF>
                            </View>
                        </View>
                    </View>
                    <View className='w-full border-b mt-8 border-unselectInput'></View>
                    <View className='flex flex-row justify-between my-10 mb-14'>
                        <TextF className='text-lg text-err'>ออกจากระบบ</TextF>
                    </View>
                </View>
                
            </ScrollView>
        </>
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