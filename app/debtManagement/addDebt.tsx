import React, { useEffect, useState, useRef } from 'react';
import { View,Text , Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome6, FontAwesome5, FontAwesome, Fontisto, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from '../components/TextF';
import Svg, { Defs, ClipPath, Path, Rect, Circle } from 'react-native-svg';
import CheckBox from '../components/checkBox';

import HeadTitle from '../components/headTitle';
import { useMemo } from 'react';




interface AddDebtProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStatePage: (state: string) => void;
}
const AddDebt: React.FC<AddDebtProps> = ({ isDarkMode, setActiveTab, setStatePage }) => {

    const [newDataAssetInput, setNewDataAssetInput] = useState({
      name: '',
      isInstallment: true,
      installmentPerMonth: '',
      monthAmount: '',
      type: 'home',
    })
    const [isInstallment, setIsInstallment] = useState(true);
    const [type, setType] = useState('');
    const categories = [
        { id: 1, tag:'home', label: 'บ้าน' },
        { id: 2, tag:'land', label: 'ที่ดิน'},
        { id: 3, tag:'car', label: 'รถ' },
        { id: 4, tag:'card', label: 'บัตรเครดิต'},
        { id: 5, tag:'more', label: 'อื่นๆ'},
      ];
    const isMore = useMemo(() => !categories.some(category => category.tag === newDataAssetInput.type), [newDataAssetInput.type]);
    useEffect(() => {
        if (isMore) {
        setNewDataAssetInput({ ...newDataAssetInput, type: type });
        }
    }, [type, isMore]);

    useEffect(() => {
        setNewDataAssetInput({ ...newDataAssetInput, isInstallment: isInstallment });
    }, [isInstallment]);

    const handleSave = () => {
        console.log(newDataAssetInput);
        setStatePage('debtManagement')
    }
    const [isFully, setIsFully] = useState(false);
     useEffect(() => {
    if (newDataAssetInput.name !== '' && newDataAssetInput.installmentPerMonth !== '' && newDataAssetInput.monthAmount !== '' && newDataAssetInput.type !== '') {
      setIsFully(true);
    } else {
      setIsFully(false);
    }
     }, [newDataAssetInput]);


  return (
    <>
      <HeadTitle 
      setActiveTab={setActiveTab} 
      title='ข้อมูลหนี้สิน' 
      onPress={() => setStatePage('debtManagement')}/>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
      <ScrollView  
      id='AddDebtContainer'
      bounces={false}
      className='flex-1'>
        <View className='flex px-5'>
          <View className='w-18 flex flex-row items-center'>
              <TextInput
                placeholder="ชื่อหนี้สิน"
                placeholderTextColor={'#B0B0B0'}
                value={newDataAssetInput.name}
                onChangeText={(text)=>setNewDataAssetInput({...newDataAssetInput, name: text})}
                keyboardType='default'
                className={`h-14 text-lg text-normalText px-2 border-b border-label w-4/5`}/>
                <View className=" border-b border-label h-14 w-10 flex items-center justify-center">
                  <FontAwesome6 name="pen" size={12} color="#979797" />
                </View>
          </View>


          <TextF className='text-lg text-normalText mt-5'>ประเภท</TextF>
          <View 
          style={{position:'relative'}}
          className="flex mt-5 bg-neutral rounded-xl shadow-sm pb-3 border-[1px] border-neutral2">
            <View 
            style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
              <View className='w-full border-b h-[60] border-neutral2'></View>
              <View className='w-full border-b h-[60] border-neutral2'></View>
            </View>
            <View 
            style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
              <View className='h-[120] w-1/2 border-r border-neutral2'></View>
            </View>

            <View className="flex-wrap flex-row">

              {categories.slice(0, 4).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  activeOpacity={1}
                  onPress={() => setNewDataAssetInput({ ...newDataAssetInput, type: category.tag })}
                  className="flex-row items-center p-2 w-1/2 h-[60] pl-5"
                >
                  <View className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    {category.tag == newDataAssetInput.type && <View className="w-[10] h-[10] rounded-full bg-accent" />}
                  </View>
                  <View className='w-12 justify-center items-center'>
                    {category.tag == 'home' && <FontAwesome6 name="house-chimney" size={18} color="#070F2D" /> }
                    {category.tag == 'land' && <Fontisto name="map-marker-alt" size={23} color="#070F2D" /> }
                    {category.tag == 'car' && <FontAwesome6 name="car" size={18} color="#070F2D" /> }
                    {category.tag == 'card' && <FontAwesome6 name="credit-card" size={18} color="#070F2D" /> }
                  </View>
                  <TextF className=" text-normalText">{category.label}</TextF>
                </TouchableOpacity>
              ))}
              <TouchableOpacity 
                activeOpacity={1}
                onPress={() => setNewDataAssetInput({ ...newDataAssetInput, type: type})}
                className="flex-row items-center p-2 w-full h-[60] pl-5">
                <View className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                  {isMore && <View className="w-[10] h-[10] rounded-full bg-accent" />}
                </View>
                <TextInput
                  id='InputCategoryMore'
                  placeholder="อื่นๆ"
                  placeholderTextColor={'#B0B0B0'}
                  className="ml-2 border-b-[1px] border-neutral2 flex-1 h-10 mr-5 py-2"
                  value={type}
                  onChangeText={(text) => setType(text)}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View className='px-5'>
        <TextF className='text-lg text-normalText mt-5'>รายละเอียด</TextF>
          <View className='flex mt-5 bg-neutral rounded-xl px-3 shadow-sm border-[1px] border-neutral2'>
            <View className='flex flex-row  justify-between items-center h-16'>
              <View> 
                <TextF className='text-lg text-normalText'>อยู่ระหว่างผ่อนชำระ</TextF>
              </View>
              <View className='w-18 flex flex-row justify-center items-center'>
                <CheckBox toggle={isInstallment} setToggle={setIsInstallment}/>
              </View>
            </View>
            <View className='w-full h-[1] bg-neutral2'></View>
            <View className='flex flex-row  justify-between items-center h-16'>
              <View> 
                <TextF className='text-lg text-normalText'>จำนวนเงินที่ต้องผ่อน/เดือน</TextF>
              </View>
              <View className='w-18 flex flex-row justify-center items-center'>
                  <TextInput
                    id='InputTotalMoneyFutureUse'
                    placeholder='จำนวนเงิน'
                    placeholderTextColor={'#B0B0B0'}
                    keyboardType='numeric'
                    value={newDataAssetInput.installmentPerMonth}
                    onChangeText={(text)=>setNewDataAssetInput({...newDataAssetInput, installmentPerMonth: text})}
                    onBlur={() => {
                      const numericText = newDataAssetInput.installmentPerMonth.replace(/[^0-9]/g, '');
                      setNewDataAssetInput({ ...newDataAssetInput, installmentPerMonth: numericText });
                    }}
                    className={`h-16 text-end text-lg text-primary pr-2`}/>
                    <TextF className={` text-lg text-primary`}>บาท</TextF>
              </View>
            </View>
            <View className='w-full h-[1] bg-neutral2'></View>
            <View className='flex flex-row  justify-between items-center h-16'>
              <View> 
                <TextF className='text-lg text-normalText'>จำนวนเดือนที่เหลือที่ต้องผ่อน</TextF>
              </View>
              <View className='w-18 flex flex-row justify-center items-center'>
                <TextInput
                  id='InputEndYearFutureUse'
                  placeholder="จำนวนเดือน"
                  placeholderTextColor={'#B0B0B0'}
                  maxLength={4}
                  keyboardType="numeric"
                  value={newDataAssetInput.monthAmount}
                  onChangeText={(text) => {
                    setNewDataAssetInput({ ...newDataAssetInput, monthAmount: text });
                  }}
                  onBlur={() => {
                    const numericText = newDataAssetInput.monthAmount.replace(/[^0-9]/g, '');
                    setNewDataAssetInput({ ...newDataAssetInput, monthAmount: numericText });
                    }}
                    className="h-16 text-end text-lg text-primary pr-2"
                  />
                    <TextF className={` text-lg text-primary`}>เดือน</TextF>
              </View>
            </View>
          </View>
        </View>
        <View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <View
        className=' h-14 flex flex-row justify-center items-center mb-20 px-5 gap-2 bg-none'>
          <TouchableOpacity
          id='BtnCancelFutureUse'
          onPress={()=>setStatePage('debtManagement')}
          className='flex-1 h-14 rounded-lg border border-err justify-center items-center'>
            <TextF className='text-err text-lg'>ยกเลิก</TextF>
          </TouchableOpacity>
          <TouchableOpacity 
          id='BtnSaveFutureUse'
          onPress={ isFully ? handleSave : () => {}}
          className={`flex-1 h-14 rounded-lg justify-center items-center ${isFully ? 'bg-primary':'bg-unselectMenu'}`}>
            <TextF className='text-neutral text-lg'>บันทึก</TextF>
          </TouchableOpacity>
        </View>
    </>
  )
}

export default AddDebt

