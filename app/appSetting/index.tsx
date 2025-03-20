import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import HeadTitle from '../components/headTitle';
import  TextF  from '../components/TextF';
import CheckBox from '../components/checkBox';
import DropdownCustom from '../components/DropdownCustom';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';

// import ImagePicker from 'react-native-image-crop-picker';
import Mascot from '../components/mascot';
// import {
//     GoogleSignin,
//     statusCodes,
//   } from "@react-native-google-signin/google-signin";

const Logo = require('../../assets/images/logo.png')

interface Profile {
    data: {
      u_id: string,
      fname: string,
      lname: string,
      uname: string,
      email: string,
      provider: string,
      image_link: string,
      role: {
        r_id: number,
        role: string,
      };
    };
}
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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [oldName, setOldUserName] = useState('');
    const [oldFirstName, setOldFirstName] = useState('');
    const [oldLastName, setOldLastName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [imgProfile, setImgProfile] = useState('');
    const [imgInput, setImgInput] = useState<any | null>(null);
    const [refresh, setRefresh] = useState(false);
    const [isGoogleAccount, setIsGoogleAccount] = useState(false);
    const [oldPassWrong, setOldPassWrong] = useState(false);
    const [changePassSuccess, setChangePassSuccess] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);

    const [selectedOption, setSelectedOption] = useState('ไทย (บาท ฿)');
    const [selectedLanguage, setSelectedLanguage] = useState('ไทย');
    const [nameProfile,setNameProfile] = useState<Profile>()
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
            // AsyncStorage.removeItem('u_id');
            // setActiveTab('main');

            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${Port.BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            });
            
            // GoogleSignin.signOut();
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('u_id');
            setActiveTab('main');
        } catch (error) {
            // GoogleSignin.signOut();
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('u_id');
            setActiveTab('main');
            throw new Error( error as string);
        }
    };
    
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) return;
    
                const response = await fetch(`${Port.BASE_URL}/user`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                });
                // if (!response.ok) {
                //     const errorData = await response.json();
                //     console.log('errorData', errorData);
                //     throw new Error(errorData.message || "Network response was not ok");
                // }
    
                const dataname = await response.json();
                console.log('dataname', dataname);
                if(dataname !== null){
                    console.log(JSON.stringify(dataname.result , null , 2))
                    setIsGoogleAccount(dataname.result.provider !== 'Credentials');
                    setUserName(dataname.result.uname); 
                    setOldUserName(dataname.result.uname); 
                    setFirstName(dataname.result.fname); 
                    setOldFirstName(dataname.result.fname); 
                    setLastName(dataname.result.lname); 
                    setOldLastName(dataname.result.lname); 
                    setEmail(dataname.result.email); 
                    setImgProfile(dataname.result.image_link); 
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
    
        fetchUserDetails();
    }, [refresh]);


    const handleUpdateProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error("Token not found");
                return;
            }
    
            const formData = new FormData();
            formData.append('username', userName);
            formData.append('firstname', firstName);
            formData.append('lastname', lastName);
    
            const response = await fetch(`${Port.BASE_URL}/user`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                body: formData
            });
    
            // ตรวจสอบ Content-Type ก่อนพาร์ส JSON
            const contentType = response.headers.get("content-type");
            let result;
    
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                result = await response.text(); // ถ้าไม่ใช่ JSON ให้อ่านเป็น text
            }
    
            console.log("Raw response:", result);
    
            if (response.ok) {
                // หากอัปเดตสำเร็จ ให้ตั้งค่า oldName, oldFirstName, และ oldLastName ใหม่
                setOldUserName(userName);
                setOldFirstName(firstName);
                setOldLastName(lastName);
                console.log('Profile updated successfully');
            } else {
                console.log('Failed to update profile');
            }
    
            console.log("Profile updated successfully:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    
    
    
    const handleChangePass = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error("Token not found");
                return;
            }
    
            const formData = new FormData();
            formData.append('oldpassword', oldPassword);
            formData.append('newpassword', newPassword);
    
            const response = await fetch(`${Port.BASE_URL}/auth/resetpassword`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                body: formData
            });
    
            const result = await response.json();  
            console.log("Raw response:", result);
    
            if (!response.ok && result.message === 'invalid old password') {
                setOldPassWrong(true);
                throw new Error(result.message || "Failed to update password");
            }
            setOldPassword('');
            setNewPassword('');
            setChangePassSuccess(true);
            console.log("Password updated successfully:", result);
        } catch (error) {
            throw new Error(error as string);
        }
    };

    // const handleChangeImg = async () => {
    //     try {
    //         const token = await AsyncStorage.getItem('token');
    //         if (!token) {
    //             console.error("Token not found");
    //             return;
    //         }
    //         ImagePicker.openPicker({
    //             width: 300,
    //             height: 300,
    //             cropping: true
    //         }).then(async image => {
                
    //             const formData = new FormData();
    //             console.log('image:', JSON.stringify(image, null, 2));

    //             const photo = {
    //                 uri: image.path,
    //                 type: image.mime,
    //                 name: image.filename || `photo.${image.mime.split('/')[1]}`
    //             };
    //             formData.append('images', photo as any);
    //             console.log(formData)
            
    //             const response = await fetch(`${Port.BASE_URL}/user`, {
    //                 method: "PUT",
    //                 headers: {
    //                     "Authorization": `Bearer ${token}`,
    //                     "Content-Type": "multipart/form-data"
    //                 },
    //                 body: formData
    //             });
    //             if (!response.ok) {
    //                 const errorData = await response.json();
    //                 console.log('errorDataAsset', errorData);
    //                 throw new Error(errorData.message || "Network response was not ok");
    //             }
    //             const data = await response.json();
    //             console.log('data', data);
    //             setImgProfile(data.result.image_link); 
    //             setRefresh(!refresh);
    //         });
            
            
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }

console.log('imgInput', JSON.stringify(imgInput, null, 2));
    
      const opacityAnim = useRef(new Animated.Value(0)).current;
      const scaleAnim = useRef(new Animated.Value(0.8)).current;
    
      useEffect(() => {
        if (changePassSuccess) {
          // แสดง Popup (fade-in + scale-up)
          Animated.parallel([
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start();
    
          // ซ่อน Popup หลัง 2 วินาที (fade-out + scale-down)
          setTimeout(() => {
            Animated.parallel([
              Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 500,
                useNativeDriver: true,
              }),
            ]).start(() => {
                setChangePassSuccess(false)
            });
          }, 4000);
        }
      }, [changePassSuccess]);
    

    return (
        <> 
            
            <View className='w-full flex flex-row items-center justify-between h-16 pr-20 relative'>
                <HeadTitle 
                id='HeadTitleSetting'
                setActiveTab={setActiveTab} 
                onPress={() => setActiveTab('profile')}
                title='ตั้งค่า'/>
                <View style={{position:'absolute', top: -35, right:20}} ><Mascot fromP={'setting'} type={'normal'} isPress={true} className='w-32 h-44 z-50'/></View>
            </View>
            <View className='w-full px-5 mt-3 border-b border-unselectInput'></View>
            <ScrollView 
            id='ProfileContainer'
            className='flex-1' ref={scrollViewRef} showsVerticalScrollIndicator={false}>
                <View className='px-5'>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-label pt-2'>ตั้งค่าโปรไฟล์</TextF>
                    </View>
                    <View className='flex flex-row mt-8 items-center gap-8'>
                        <TouchableOpacity 
                        id=' BtnSettingChangeImg'
                        // activeOpacity={1}
                        // onPress={handleChangeImg}
                        style={{position:'relative', borderWidth: 3}}
                        className='w-32 h-32 rounded-full border-primary'>
                            {imgProfile ? <Image 
                            source={{uri: imgProfile}}
                            style={{objectFit: 'cover'}}
                            className='w-full h-full rounded-full'/>
                            :<View className='w-full h-full rounded-full'></View>}
                            <View
                            style={{right: 0, bottom: 0}}
                            className='w-8 h-8 shrink-0 bg-primary absolute rounded-full justify-center items-center'>
                                <FontAwesome6 name='pen' size={12} color='#C9C9C9'/>
                            </View>
                        </TouchableOpacity>
                        <View className=' justify-between pr-5 w-1/2'>
                            <View className='flex flex-row items-end'>
                                <TextInput
                                id=' EditInputUserName'
                                placeholder= "ชื่อผู้ใช้"                               
                                placeholderTextColor={'#B0B0B0'}
                                keyboardType='default'
                                value={userName}
                                onChangeText={setUserName}
                                className={`text-lg border-b pb-1 border-unselectInput w-full`}/>
                                <View className='w-10 h-10 items-center justify-center border-b border-unselectInput'>
                                    <FontAwesome6 name='pen' size={12} color={userName === oldName || userName === '' ? '#C9C9C9' : '#2A4296'} />
                                </View>
                            </View>
                            <View className='flex flex-row items-end'>
                                <TextInput
                                id=' EditInputFristName'
                                placeholder="ชื่อจริง"
                                placeholderTextColor={'#B0B0B0'}
                                keyboardType='default'
                                value={firstName}
                                onChangeText={setFirstName}
                                className={`text-lg border-b pb-1 border-unselectInput  w-full`}/>
                                <View className='w-10 h-10 items-center justify-center border-b border-unselectInput'>
                                    <FontAwesome6 name='pen' size={12} color={firstName === oldFirstName ? '#C9C9C9' : '#2A4296'}/>
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
                                className={`text-lg border-b pb-1 border-unselectInput  w-full`}/>
                                <View className='w-10 h-10 items-center justify-center border-b border-unselectInput'>
                                    <FontAwesome6 name='pen' size={12} color={lastName === oldLastName ? '#C9C9C9' : '#2A4296'}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='flex items-end mt-5'>
                    <TouchableOpacity 
                        id='BtnSaveProfile'
                        onPress={handleUpdateProfile}
                        activeOpacity={1}
                        className={`w-40 h-10 ml-5 mt-5 rounded-lg justify-center items-center flex flex-row gap-2 
                            ${(userName !== oldName || firstName !== oldFirstName || lastName !== oldLastName) && userName !== ''
                                ? 'bg-primary' : 'bg-unselectMenu'}`}
                    >
                        <TextF className='text-white'>บันทึก</TextF>
                        <MaterialIcons name="save-alt" size={22} color='#fff'/>
                    </TouchableOpacity>
                    </View>
                    <View className='w-full border-b mt-8 border-unselectInput'></View>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-label pt-2'>{!isGoogleAccount ?'ตั้งค่าบัญชี': 'บัญชี'}</TextF>
                    </View>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-normalText text-lg'>อีเมล</TextF>
                        <TextF className=' text-primary text-lg'>{email}</TextF>
                    </View>
                    {!isGoogleAccount && <>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-normalText text-lg'>รีเซ็ตรหัสผ่าน</TextF>
                        <View className='flex gap-1 w-8/12'>
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
                                onChangeText={(text) => { setOldPassword(text); setOldPassWrong(false); }}
                                className={`text-lg border-b w-full ${oldPassWrong ? 'border-err':'border-unselectInput'}`}/>
                            <View className='w-full items-end'><TextF  className='text-err'>{oldPassWrong && 'รหัสผ่านเก่าไม่ถูกต้อง'}</TextF></View>
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
                        onPress={newPassword && oldPassword && (newPassword !== oldPassword) ? handleChangePass : () => {}}
                        className={`w-40 h-10 ml-5 mt-5 rounded-lg justify-center items-center flex flex-row gap-2 ${newPassword && oldPassword && (newPassword !== oldPassword) ?'bg-primary':'bg-unselectMenu'}`}>
                            <TextF className=' text-white'>เปลี่ยน</TextF>
                        </TouchableOpacity>
                    </View>
                    </>}
                    <View className='w-full border-b mt-8 border-unselectInput'></View>
                    <View className='flex flex-row justify-between mt-5'>
                        <TextF className=' text-label pt-2'>ตั้งค่าแอป</TextF>
                    </View>
                    <View className='gap-5 mt-5'>
                        {/* <View className='flex flex-row justify-between mt-5'>
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
                        </View> */}
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
            {changePassSuccess &&
                <TouchableOpacity 
                activeOpacity={1}
                onPress={() => setChangePassSuccess(false)}
                className=' absolute flex-1 h-full w-full justify-center items-center' style={{ flex: 1, top: 0, left:0}}>
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
                className='w-10/12 h-52 bg-neutral rounded-2xl shadow-lg flex justify-center items-center gap-3'>
                    <TextF className='text-xl text-primary py-2'>เปลี่ยนรหัสผ่านสำเร็จ</TextF>
                </Animated.View>
              </TouchableOpacity>}
        </>
    )
}

export default appSetting
