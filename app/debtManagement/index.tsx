import React, { useEffect, useState, useRef } from 'react';
import { View,Text , Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6, FontAwesome, Fontisto, Octicons, MaterialCommunityIcons, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from '../components/TextF';
import Svg, { Defs, ClipPath, Path, Rect, Circle } from 'react-native-svg';

import HeadTitle from '../components/headTitle';
import AddDebt from './addDebt';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';



interface DebtManagementProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  backto: string;
}
interface infoDebtProp {
  total_amount: number;
  total_loan: number;
  total_transaction_amount: number;
}


interface DebtItem {
  id:number,
  created_at: string,
  loan: {
      installment: true,
      loan_id: string,
      monthly_expenses: number,
      name: string,
      remaining_months: number,
      status: string,
      type: string
  },
  status: string,
  total_amount: number,
  transaction_id: string,
  moreInfo: boolean;
}


const DebtManagement: React.FC<DebtManagementProps> = ({ isDarkMode, setActiveTab, setStateNavbar, backto }) => {

  const [statePage, setStatePage] = useState('debtManagement');
  const [infoDebt, setInfoDebt] = useState<infoDebtProp>();
  const [stateConfirm, setStateConfirm] = useState<any | null>(null);
  const [stateDelete, setStateDelete] = useState<any | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [dataDebt, setDataDebt] = useState<DebtItem[]>([]);
  const [debtSelect, setDebtSelect] = useState('');

  useEffect(() => {
    setStateNavbar(false);
    const fetchDebt = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${Port.BASE_URL}/loan`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const responseTransaction = await fetch(`${Port.BASE_URL}/transaction`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const dataTransaction = await responseTransaction.json();
    setInfoDebt(data.result);
    // console.log('Fetched debt:', JSON.stringify(data.result, null, 2));

    setDataDebt(dataTransaction.result.map((item: DebtItem, index:number) => ({
      ...item,
      id:index,
      moreInfo: false,
    })));
    
  
    



  }
  fetchDebt();

  }, [refresh])

// console.log('Fetched dataDebt:', JSON.stringify(dataDebt, null, 2));


  const [animatedHeights, setAnimatedHeights] = useState<{ [key: number]: Animated.Value }>({});

  useEffect(() => {
    const newAnimatedHeights = dataDebt.reduce((acc: { [key: number]: Animated.Value }, item) => {
      acc[item.id] = animatedHeights[item.id] || new Animated.Value(115);
      return acc;
    }, {});
  
    setAnimatedHeights(newAnimatedHeights);
  }, [dataDebt]);

  useEffect(() => {
    dataDebt.forEach((item) => {
      if (animatedHeights[item.id] === undefined) {
        setAnimatedHeights((prev) => ({ ...prev, [item.id]: new Animated.Value(115) }));
      }
    });
    Object.keys(animatedHeights).forEach((id) => {
      Animated.timing(animatedHeights[parseInt(id)], {
        toValue: dataDebt.find((item) => item.id === parseInt(id))?.moreInfo ? 245 : 115,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [dataDebt, animatedHeights]);
  
  
  


  const toggleMoreInfo = (id : number): void => {
    setDataDebt((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, moreInfo: !item.moreInfo } : item
      )
    );

    Animated.timing(animatedHeights[id], {
      toValue: dataDebt.find((item) => item.id === id)?.moreInfo ? 110 : 235,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };



  
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (stateConfirm !== null) {
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
    }
    if (stateDelete !== null) {
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
    }

  }, [stateConfirm, stateDelete]);


  const onClose =() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStateConfirm(null);
      setStateDelete(null);
    });
  }


  const getShotMonthYear = (date: string) => {
    const d = new Date(date);
    const monthNamesThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const month = monthNamesThai[d.getMonth()];
    const year = d.getFullYear() + 543; // Convert to Buddhist year
    return `${month} ${year.toString().slice(-2)}`;
  }

  const onPay = async (transaction_id: string) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${Port.BASE_URL}/transaction/${transaction_id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log('Paid:', JSON.stringify(data, null, 2));
    setRefresh(!refresh);
    onClose();
    
  }

  const handleDelete = async (id: number) => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`${Port.BASE_URL}/loan/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log('Deleted:', JSON.stringify(data, null, 2));
    if (data.status === 'success') {
      setDataDebt((prevData) => prevData.filter((item) => item.id !== id));
    }
    setRefresh(!refresh);
    onClose();
  }


  return (
    <>
    {statePage === 'debtManagement' && 
    <>
        <View 
          id=' headTitleContainer'
          className='flex-row mt-3 ml-5 h-14 items-center justify-between'>
          <View className='flex-row items-center'>
            <TouchableOpacity
              id='BtnBack'
              activeOpacity={1}
              onPress={() => setActiveTab(backto)}
              className=''>
              <FontAwesome6 name="angle-left" size={28} color='#070F2D'/>
            </TouchableOpacity>
            <Text 
            style={{ fontFamily: 'SarabunBold'}}
            className=' text-normalText text-2xl ml-3 h-12 pt-2'>หนี้สิน</Text>
          </View>
          
          <TouchableOpacity 
          activeOpacity={1}
          onPress={() => setStatePage('addDebt')}
          className='flex-row gap-2 items-center'>
            <FontAwesome6 name="plus" size={20} color='#2A4296'/>
            <TextF className='mr-8 text-lg py-2 text-primary'>เพิ่มหนี้สิน</TextF>
          </TouchableOpacity>
      </View>
      {dataDebt.length === 0 
      ?<>
      <View className='flex-1 items-center mt-20'>
        <TextF className='text-label text-lg p-2'>ไม่มีข้อมูลหนี้สิน</TextF>
      </View>
      </>
      :<ScrollView className='flex-1'>
        <View className=' flex'>
          <View className='mt-2 flex justify-center items-center bg-bg_debt mx-8 p-3 pt-4 pb-5 rounded-3xl shadow'>
            <View className='flex w-full items-center gap-5'>
              <TextF className='text-lg'>ต้องชำระอีกในเดือนนี้</TextF>
              <TextF className='text-3xl scale-125'>{infoDebt?.total_transaction_amount}</TextF>
              <TextF>บาท</TextF>
            </View>
            <View className='mt-5 w-11/12 h-[2] bg-err'></View>
            <TextF className='text-lg my-3 py-3'>หนี้สินทั้งหมด</TextF>
            <View className='flex flex-row w-full gap-3 '>
                <View className='flex-1 items-center gap-3 pt-5'>
                <TextF className='text-3xl scale-125'>{infoDebt?.total_loan}</TextF>
                <TextF>รายการ</TextF>
              </View>
              <View className=' w-[2] bg-err'></View>
              <View className='flex-1 items-center gap-3 pt-5'>
                <TextF className='text-3xl scale-125'>{infoDebt?.total_amount}</TextF>
                <TextF>บาท</TextF>
              </View>
            </View>
          </View>
        </View>
        <View className='flex flex-col gap-2 mt-5'>
          <View className="flex flex-col gap-3 px-5 mb-10">
            {Object.entries(
              dataDebt.reduce((acc: { [key: string]: typeof dataDebt }, item) => {
                if (!acc[item.loan.type]) acc[item.loan.type] = [];
                acc[item.loan.type].push(item);
                return acc;
              }, {})
            ).map(([type, items]) => (
              <View key={type} className=" pb-2 gap-5">
                {type === 'home' && <View className='flex flex-row gap-2'><FontAwesome6 name="house-chimney" size={18} color="#070F2D" /><Text className="font-bold text-lg">บ้าน</Text></View>}
                {type === 'land' && <View className='flex flex-row gap-2'><Fontisto name="map-marker-alt" size={18} color="#070F2D" /><Text className="font-bold text-lg">ที่ดิน</Text></View>}
                {type === 'car' && <View className='flex flex-row gap-2'><FontAwesome6 name="car" size={18} color="#070F2D" /><Text className="font-bold text-lg">รถ</Text></View>}
                {type === 'card' && <View className='flex flex-row gap-2'><FontAwesome6 name="credit-card" size={18} color="#070F2D" /><Text className="font-bold text-lg">ค่างวด</Text></View>}
                {type !== 'home' && type !== 'land' && type !== 'car' && type !== 'card' && <View className='flex flex-row gap-2'><Text className="font-bold text-lg">{type}</Text></View>}
                {items.map((item) => (
                  <Animated.View 
                  key={item.id} 
                  style={{height: animatedHeights[item.id] }}
                  className={`border rounded-xl px-3 pt-2  overflow-hidden ${item.status === 'ชำระ'? 'border-primary':item.status === 'ค้างชำระ'?'border-err':item.status === 'หยุดพัก'?' border-neutral2':'border-neutral2'}`}>
                    <View className="flex flex-row gap-2 items-center justify-between">
                      <TextF className="text-lg">{item.loan.name}</TextF>
                      <View className="flex flex-row gap-2 items-center">
                        <TextF className="text text-label">{getShotMonthYear(item.created_at)}</TextF>
                        <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => toggleMoreInfo(item.id)}
                        className="flex items-center justify-center w-6 h-6">
                          {item.moreInfo?
                          <FontAwesome6 name="angle-up" size={18} color="#2A4296" />
                          :<FontAwesome6 name="angle-down" size={18} color="#2A4296" />}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View className="flex flex-row gap-2 mt-4">
                      <TextF className="text text-label">ยอดชำระต่อเดือน</TextF>
                    </View>
                    <View className="flex flex-row gap-2 items-center justify-between"> 
                      <View className="flex flex-row gap-2 items-end">
                        <TextF className={`text-2xl font-bold ${item.status === 'pending' || item.status === 'success' ? 'text-primary':item.status === 'late'?'text-err':item.status === 'rest'?'text-label':''}`}>{item.loan.monthly_expenses}</TextF>
                        <TextF className="text-lg ">บาท</TextF>
                      </View>
                      <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {item.status === 'ชำระ' || item.status === 'ค้างชำระ' ? setStateConfirm(item): null}}
                      >
                        {item.status === 'ชำระ' && <View className='border border-primary bg-primary rounded-lg w-28 h-10 flex justify-center items-center'><TextF className="text-lg text-white">ชำระ</TextF></View>}
                        {item.status === 'ค้างชำระ' && <View className='border border-err bg-err rounded-lg w-28 h-10 flex justify-center items-center'><TextF className="text-lg text-white">ค้างชำระ</TextF></View>}
                        {item.status === 'ชำระแล้ว' && <View className='border border-oktext rounded-lg w-28 h-10 flex justify-center items-center flex-row gap-1'><TextF className="text-lg text-oktext">ชำระแล้ว</TextF><Ionicons name="checkmark-circle" size={20} color="#30CC30" /></View>}
                        {item.status === 'หยุดพัก' && <View className='border border-label rounded-lg w-28 h-10 flex justify-center items-center'><TextF className="text-lg text-label">หยุดพัก</TextF></View>}
                      </TouchableOpacity>
                    </View>
                    <View className="flex flex-row justify-between gap-2 mt-5">
                      <TextF className="text-lg">เหลือ</TextF>
                      <View className="flex flex-row gap-2 items-end">
                        <TextF className="text-lg">{item.loan.remaining_months}</TextF>
                        <TextF className="text-lg">เดือน</TextF>
                      </View>
                    </View>
                    <View className="flex flex-row justify-between">
                      <TextF className="text-lg">คิดเป็นเงินที่ต้องชำระอีก</TextF>
                      <View className="flex flex-row gap-3 items-end">
                        <TextF className="text-lg">{item.total_amount}</TextF>
                        <TextF className="text-lg">บาท</TextF>
                      </View>
                    </View>
                    <View className="flex flex-row gap-2 w-full mt-5">
                      <TouchableOpacity 
                      activeOpacity={1}
                      onPress={() => {setStatePage('addDebt'), setDebtSelect(item.loan.loan_id)}}
                      className="flex-1 items-center justify-center bg-primary rounded-lg h-12">
                        <TextF className="text-lg py-2 text-white">แก้ไขข้อมูลหนี้สิน</TextF>
                      </TouchableOpacity>
                      <TouchableOpacity 
                      activeOpacity={1}
                      onPress={() => setStateDelete(item)}
                      className="flex-1 items-center justify-center bg-err rounded-lg h-12">
                        <TextF className="text-lg py-2 text-white">ลบข้อมูลหนี้สิน</TextF>
                      </TouchableOpacity>
                    </View>

                  </Animated.View>
                ))}
              </View>
            ))}
            {/* <TouchableOpacity
              activeOpacity={1}
              onPress={() => setStatePage('addDebt')}
              className="flex-1 flex-row gap-3 items-center justify-center bg-neutral rounded-lg border-dashed border-2 h-24 border-primary">
              <Text style={{ fontFamily: "SarabunBold" }} className="text-xl py-2 text-primary">เพิ่มข้อมูลหนี้สิน</Text>
            </TouchableOpacity> */}
          </View>
        </View>







      </ScrollView>}
      {stateConfirm !== null && 
      <TouchableOpacity 
      activeOpacity={1}
      onPress={()=>onClose()}
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
      className='w-10/12 h-80 bg-neutral rounded-2xl shadow-lg flex justify-center items-center'>
          <TextF className='text-lg text-normalText px-3 text-center'>คุณได้ชำระหนี้สินของเดือน {getShotMonthYear(stateConfirm.created_at)} จำนวน {stateConfirm.loan.monthly_expenses} แล้วใช่หรือไม่</TextF>
          <View className='w-full flex flex-row px-3 gap-3 mt-14'>
            <TouchableOpacity 
            onPress={()=>onClose()}
            className=' flex-1 h-14 border-err border justify-center items-center rounded-md'>
              <TextF className='text-lg text-err'>ยกเลิก</TextF>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => onPay(stateConfirm.transaction_id)}
            className='flex-1 h-14 bg-primary justify-center items-center rounded-md '>
              <TextF className='text-lg text-white'>ยืนยัน</TextF>
            </TouchableOpacity>
          </View>
      </Animated.View>
    </TouchableOpacity>}

    {stateDelete !== null && 
      <TouchableOpacity 
      activeOpacity={1}
      onPress={()=>onClose()}
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
      className='w-10/12 h-80 bg-neutral rounded-2xl shadow-lg flex justify-center items-center'>
          <TextF className='text-lg text-normalText px-3 text-center'>คุณต้องการลบข้อมูลหนี้สิน <TextF className='text-primary'>{stateDelete.loan.name}</TextF> ใช่หรือไม่</TextF>
          <View className='w-full flex flex-row px-3 gap-3 mt-14'>
            <TouchableOpacity 
            onPress={()=>onClose()}
            className=' flex-1 h-14 border-primary border justify-center items-center rounded-md'>
              <TextF className='text-lg text-primary'>ยกเลิก</TextF>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>handleDelete(stateDelete.loan.loan_id)}
            className='flex-1 h-14 bg-err justify-center items-center rounded-md '>
              <TextF className='text-lg text-white'>ยืนยัน</TextF>
            </TouchableOpacity>
          </View>
      </Animated.View>
    </TouchableOpacity>}
      </>
    }
    {statePage === 'addDebt' && <>
      <AddDebt isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStatePage={setStatePage} refresh={refresh} setRefresh={setRefresh} debtSelect={debtSelect} setDebtSelect={setDebtSelect}/>
    </>}

    </>
  )
}

export default DebtManagement

