import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons, AntDesign} from '@expo/vector-icons';
import  TextF  from '../components/TextF';
import Mascot from '../components/mascot';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Port from '../../Port';
import { useNumberFormat } from "@/app/NumberFormatContext";
import { BlurView } from 'expo-blur';
const T_car = require('../../assets/Mascot/T_car.png');
const T_home = require('../../assets/Mascot/T_home.png');
const T_save = require('../../assets/Mascot/T_save.png');
const T_travel = require('../../assets/Mascot/T_travel.png');
const M_bigHeart = require('../../assets/Mascot/M_bigHeart.png');
interface notiProp {
  id: string;
  message: string;
  balance: number;
  is_read: boolean;
  created_at: string;
  object_id: string;
  type: string;
}
interface NotificationScreenProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  setHomeSelected: (homeId: string) => void;
  setFormClick: (form: string) => void;
  setDataEditAsset: (asset: any) => void;
  setStateFutureUse: (state: any) => void;
}



const NotificationScreen: React.FC<NotificationScreenProps> = ({ setActiveTab, setStateNavbar, setHomeSelected, setFormClick, setDataEditAsset, setStateFutureUse }) => {
  const { addCommatoNumber } = useNumberFormat();
  const [notiInfo, setNotiInfo] = useState<notiProp[]>([]);
  const [popupNoti, setPopupNoti] = useState(false);
  const [popupNotiInfo, setPopupNotiInfo] = useState<notiProp | undefined>(undefined);
  const [assetInfo, setAssetInfo] = useState<any>(undefined);
  const [loanInfo, setLoanInfo] = useState<any>(undefined);
  const [planInfo, setPlanInfo] = useState<any>(undefined);
  const [houseInfo, setHouseInfo] = useState<any>(undefined);

  useEffect(() =>{
    setStateNavbar(false)
    const fetchNoti = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
        
          const responseNoti = await fetch(`${Port.BASE_URL}/notification`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await responseNoti.json();

            console.log(JSON.stringify(data.result, null, 2));
          if (data.result !== null) {
            setNotiInfo(data.result);
          }
        }
      } catch (error) {
        console.error('Failed to fetch token from storage', error);
      }
    }
    fetchNoti();
  },[]);


  const handleReadNoti = async (notiId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch(`${Port.BASE_URL}/notification/${notiId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          const newNoti = notiInfo.map((noti) => {
            if (noti.id === notiId) {
              return { ...noti, is_read: true };
            }
            return noti;
          });
          setNotiInfo(newNoti);
        }
      }
    } catch (error) {
      console.error('Failed to fetch token from storage', error);
    }
  }

  
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
    useEffect(() => {
      if (popupNotiInfo !== undefined) {
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

        const handleGetInfo = async () => {
          if (popupNotiInfo.type === 'asset') {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${Port.BASE_URL}/asset/${popupNotiInfo.object_id}`, {
              method: 'GET',
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
              },
            });
            const data = await response.json();
            setAssetInfo(data.result);
            console.log(data.result)
          }else if (popupNotiInfo.type === 'loan') {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${Port.BASE_URL}/loan/${popupNotiInfo.object_id}`, {
              method: 'GET',
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
              },
            });
            const data = await response.json();
            setLoanInfo(data.result);
            console.log(data.result)
          }else if (popupNotiInfo.type === 'retirementplan') {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${Port.BASE_URL}/retirement}`, {
              method: 'GET',
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
              },
            });
            const data = await response.json();
            setPlanInfo(data.result);
            console.log(data.result)
          }else if (popupNotiInfo.type === 'house') { 
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${Port.BASE_URL}/nursinghouses/${popupNotiInfo.object_id}`, {
              method: 'GET',
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
              },
            });
            const data = await response.json();
            setHouseInfo(data.result);
            console.log(data.result)
          }

        }
        handleGetInfo();




      }
    }, [popupNotiInfo]);
  
console.log('popupNoti',popupNotiInfo)

const onClose = () => {
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
  ]).start(()=>{
    setPopupNoti(false), 
    setPopupNotiInfo(undefined), 
    setAssetInfo(undefined), 
    setLoanInfo(undefined), 
    setPlanInfo(undefined), 
    setHouseInfo(undefined)});
}

const formatData = (data: any) => {
  const date = new Date(data);
  const thaiMonths = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];
  return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
}


const categories = [
  { id: 1, tag:'home', label: 'บ้าน' },
  { id: 2, tag:'child', label: 'บุตร'},
  { id: 3, tag:'car', label: 'รถ' },
  { id: 4, tag:'travel', label: 'ท่องเที่ยว'},
  { id: 5, tag:'marry', label: 'แต่งงาน' },
  { id: 6, tag:'emergencyMoney', label: 'เงินฉุกเฉิน' },
  { id: 7, tag:'more', label: 'อื่นๆ'},
];





  return (
    <View 
    id='NotificationContainer'
    className="flex-1">
      {popupNoti &&
        <>
        <TouchableOpacity 
        activeOpacity={1}
        onPress={() => onClose()}
        className=' absolute flex-1 h-full w-full justify-center items-center' style={{ flex: 1, top: 0, left:0, zIndex: 1000 }}>
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
        className='w-10/12 bg-neutral rounded-2xl shadow-lg flex justify-center items-center gap-3 border border-primary2'>

          {((popupNotiInfo?.type === 'asset' && popupNotiInfo?.balance > 0) && (assetInfo?.type === 'home' || assetInfo?.type === 'child' || assetInfo?.type === 'car' || assetInfo?.type === 'travel' || assetInfo?.type === 'marry' || assetInfo?.type === 'emergencyMoney')) &&
          <View className='w-full h-40 relative flex flex-col items-center'>
            
            {assetInfo?.type == 'home' && 
            <>
              <View style={{ position: 'absolute', top:0, transform: [{ translateY: 5 },{ translateX: 30 }]  }}><Image source={T_home} className="w-36 h-44 object-contain "/></View>
              <View style={{ transform: [{ translateY: 25 }, { translateX: -18 }] }}><Mascot fromP={'main'} type={'normal'} isPress={true} className='w-32 h-40 z-50'/></View>
            </>}
            {assetInfo?.type == 'child' && 
            <>
              <View style={{ transform: [{ translateY: 10 }] }}><Mascot fromP={'main'} type={'normal'} isPress={true} className='w-32 h-40 z-50'/></View>
              <View style={{ position: 'absolute', top:0, transform: [{ translateY: 40 }, { translateX: -50 }] }}><Mascot fromP={'babyB'} type={'normal'} isPress={true} className='w-28 h-32 z-50'/></View>
              <View style={{ position: 'absolute', top:0, transform: [{ translateY: 40 }, { translateX: 50 }] }}><Mascot fromP={'babyG'} type={'normal'} isPress={true} className='w-28 h-32 z-50'/></View>
            </> }
            {assetInfo?.type == 'car' && 
            <>
              <View style={{ position: 'absolute', top:0, transform: [{ translateY: -5 },{ translateX: -35 }]  }}><Image source={T_car} className="w-36 h-52 object-contain "/></View>
              <View style={{ transform: [{ translateY: 30 }, { translateX: 35 }] }}><Mascot fromP={'main'} type={'normal'} isPress={true} className='w-32 h-40 z-50'/></View>
            </>}
            {assetInfo?.type == 'travel' && 
            <>
              <View style={{ position: 'absolute', top:0, transform: [{ translateY:  0},{ translateX: 0 }]  }}><Image source={T_travel} className="w-52 h-72 object-contain "/></View>
              <View style={{ transform: [{ translateY: 30 }, { translateX: 0 }] }}><Mascot fromP={'travel'} type={'normal'} isPress={false} className='w-32 h-40 z-50'/></View>
            </>}
            {assetInfo?.type == 'marry' && 
            <View className='flex flex-row items-center'>
              <View style={{ transform: [{ translateY: 30 }, { translateX: 5 }] }}><Mascot fromP={'main'} type={'normal'} isPress={true} className='w-32 h-40 z-50'/></View>
              <View style={{ transform: [{ translateY: 30 }, { translateX: -5 }] }}><Mascot fromP={'lover'} type={'normal'} isPress={true} className='w-32 h-40 z-50'/></View>
              <View style={{ position: 'absolute', top:0, transform: [{ translateY: 25 },{ translateX: 75 }]  }}><Image source={M_bigHeart} className="w-20 h-20 object-contain "/></View>
            </View>}
            {assetInfo?.type == 'emergencyMoney' &&
            <>
              <View style={{ position: 'absolute', top:0, transform: [{ translateY: -15 },{ translateX: 30 }]  }}><Image source={T_save} className="w-36 h-52 object-contain "/></View>
              <View style={{ transform: [{ translateY: 30 }, { translateX: -25 }] }}><Mascot fromP={'main'} type={'normal'} isPress={true} className='w-32 h-40 z-50'/></View>
            </>}
          </View>}
          {popupNotiInfo?.type === 'asset' && (assetInfo === undefined || ( assetInfo?.type !== 'home' && assetInfo?.type !== 'child' && assetInfo?.type !== 'car' && assetInfo?.type !== 'travel' && assetInfo?.type !== 'marry' && assetInfo?.type !== 'emergencyMoney')) && <View style={{ transform: [{ translateY: 20 }] }}><Mascot fromP={'noti'} type={'normal'} isPress={true} className='w-32 h-40 z-50'/></View>}
          

          {houseInfo !== undefined && 
          <>
            <View style={{ position: 'absolute', top:0, transform: [{ translateY: 5 },{ translateX: 30 }]  }}><Image source={T_home} className="w-36 h-44 object-contain z-40"/></View>
            <View style={{ transform: [{ translateY: 25 }, { translateX: -18 }] }}><Mascot fromP={'main'} type={'normal'} isPress={true} className='w-32 h-40 z-50'/></View>
          </>}
          
          
          
          
          
          
          
          
          
          
          
          
          
          <TextF className="text-lg text-primary pl-5 pr-2 ">{popupNotiInfo?.message}</TextF>
          <View className='h-[1] w-10/12 bg-primary'/>

          {popupNotiInfo?.type === 'asset' &&
          (assetInfo !== undefined ?
          <View className='px-10 py-5 mb-5 w-full'>
            <View className='flex flex-row items-center justify-between'>
              <TextF className="text-lg text-label py-2 ">ประเภท</TextF>
              <View className='flex-row justify-center items-center'>
                <View className='w-12 justify-center items-center'>
                  {assetInfo?.type == 'home' && <FontAwesome6 name="house-chimney" size={18} color="#2A4296" /> }
                  {assetInfo?.type == 'child' && <MaterialIcons name="child-friendly" size={23} color="#2A4296" /> }
                  {assetInfo?.type == 'car' && <FontAwesome6 name="car" size={18} color="#2A4296" /> }
                  {assetInfo?.type == 'travel' && <FontAwesome6 name="plane-departure" size={18} color="#2A4296" /> }
                  {assetInfo?.type == 'marry' && <Ionicons name="heart" size={22} color="#2A4296" /> }
                  {assetInfo?.type == 'emergencyMoney' && <FontAwesome5 name="hospital-alt" size={18} color="#2A4296" /> }
                </View>
                {categories.some((category) => assetInfo?.type === category.tag) ? (
                  categories.map((category) => (
                  assetInfo?.type === category.tag && <TextF key={category.id} className=" text-primary text-lg">{category.label}</TextF>
                  ))
                ) : (
                  <TextF className=" text-primary text-lg">{assetInfo?.type}</TextF>
                )}
              </View>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <TextF className="text-lg text-label py-2 ">คุณเก็บเงินได้</TextF>
              <TextF className="text-lg text-primary py-2 ">{addCommatoNumber(popupNotiInfo?.balance)} บาท</TextF>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <TextF className="text-lg text-label py-2 ">กำหนดการสิ้นสุด ปี</TextF>
              <TextF className="text-lg text-primary py-2 ">{assetInfo?.end_year}</TextF>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <TextF className="text-lg text-label py-2 ">มูลค่าตามแผนที่วางไว้</TextF>
              <TextF className="text-lg text-primary py-2 ">{addCommatoNumber(assetInfo?.total_cost)} บาท</TextF>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <TextF className="text-lg text-label py-2 ">สินทรัพย์ถูกสร้างเมื่อ</TextF>
              <TextF className="text-lg text-primary py-2 ">{formatData(assetInfo?.CreatedAt)}</TextF>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <TextF className="text-lg text-label py-2 ">สถาณะ</TextF>
              <TextF className="text-lg text-primary py-2 ">{assetInfo?.status === 'Completed' ?'สำเร็จ':'หยุดพัก'}</TextF>
            </View>
            {assetInfo?.status !== 'Completed' && 
              <View className='w-full items-end'>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={()=>{setDataEditAsset(assetInfo?.asset_id), setStateFutureUse(true), setActiveTab('calRetirement'),setFormClick('pickasset')}}>
                  <TextF className="text text-err py-2 ">จัดการสินทรัพย์<AntDesign name="caretright" size={12} color="#FF5449"/></TextF>
                </TouchableOpacity>
              </View>
            }
          </View>
          :<TextF className="text-lg text-label p-2 my-5">สินทรัพย์นี้ถูกลบ</TextF>)}
          {popupNotiInfo?.type === 'house'  &&
          (houseInfo !== undefined ?
          <View className='px-10 py-5 w-full'>
            <View className='w-full h-44'>
            {houseInfo?.images?.length > 0 && (
              <Image
                source={{ uri: houseInfo.images[0].image_link }}
                resizeMode="cover"
                className="w-full h-44 rounded-lg"
              />
            )}
            </View>
            <View className='flex flex-row items-center justify-between mt-5'>
              <TextF className="text-lg text-label py-2 ">คุณเก็บเงินได้</TextF>
              <TextF className="text-lg text-primary py-2 ">{addCommatoNumber(popupNotiInfo?.balance)} บาท</TextF>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <TextF className="text-lg text-label py-2 ">ชื่อบ้านพัก</TextF>
              <TextF className="text text-primary py-2 ">{houseInfo?.name}</TextF>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <TextF className="text-lg text-label py-2 ">ราคต่อเดือน</TextF>
              <TextF className="text-lg text-primary py-2 ">{addCommatoNumber(houseInfo?.price)} บาท</TextF>
            </View>
            <View className='w-full items-end'>
              <TouchableOpacity
                activeOpacity={1}
                onPress={()=>{setActiveTab('detailnursingHouses'),setHomeSelected(houseInfo?.nh_id)}}>
                <TextF className="text text-accent py-2 ">ข้อมูลเพิ่มเติม<AntDesign name="caretright" size={12} color="#F68D2B"/></TextF>
              </TouchableOpacity>
            </View>
          </View>
          :<TextF className="text-lg text-label p-2 my-5">ไม่มีข้อมูล</TextF>)}
          










        </Animated.View>
      </TouchableOpacity>
      </>
      }
      <View 
      id='NotificationHeader'
      className="flex flex-row items-center px-4 py-4 mt-6 border-b border-gray-300 h-16 justify-between relative">
        <View className='flex flex-row items-center'>
          <TouchableOpacity 
            id='BtnNotiBack'
            activeOpacity={1}
            onPress={()=>setActiveTab('main')}
            className=''>
            <FontAwesome6 name="angle-left" size={28} color='#070F2D'/>
          </TouchableOpacity>
          <Text
          style={{ fontFamily: 'SarabunBold' }}
          className="text-2xl text-normalText pl-5 pr-2 ">กล่องจดหมาย</Text>
          <Ionicons name="mail" size={28} color="#070F2D" />
        </View>
        {notiInfo.length > 0 && <View style={{position:'absolute', bottom: -40, right:20}} ><Mascot fromP={'noti'} type={'normal'} isPress={true} className='w-32 h-40 z-50'/></View>}
      </View>

      {/* Notification List */}
      {notiInfo.length > 0 ?
      <ScrollView className="p-4 mb-10">
        {notiInfo.map((notiInfo) => (
          <TouchableOpacity
            activeOpacity={1}
            key={notiInfo.id}
            onPress={()=>{setPopupNoti(true), setPopupNotiInfo(notiInfo)}}
            className={`flex flex-row p-4 mb-4 rounded-lg border border-neutral2 bg-neutral shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}>
            <View
              className="w-3 h-3 rounded-full mr-4 mt-2"
              style={{
                backgroundColor:
                notiInfo?.balance > 0
                    ? '#4CAF50'
                    : notiInfo?.type === 'loan'
                    ? '#6780D6'
                    : '#FFC107',
              }}
            />
            <View className="flex-1">
              <TextF className=" text-normalText text-lg">{notiInfo.message}</TextF>
              {notiInfo.balance > 0 && (
                <TextF className="text-lg text-normalText">
                  คุณเก็บเงินได้ <TextF className="text-xl text-primary">{addCommatoNumber(notiInfo.balance)}</TextF> บาท
                </TextF>
              )}
            </View>
            {/* <View style={{top:5, right:0}} className='w-3 h-3 absolute rounded-full mr-4 mt-2 bg-accent'/> */}
          </TouchableOpacity>
        ))}
      </ScrollView>
      :<View className='w-full flex justify-center items-center'>
        <View className="mt-10"><Mascot fromP={'noti'} type={'normal'} isPress={true} className='w-52 h-48 z-50'/></View>
        <TextF className="text-xl text-label">
          คุณยังไม่มีจดหมายที่ได้รับ
        </TextF>
      </View>}
    </View>
  );
};

export default NotificationScreen;


