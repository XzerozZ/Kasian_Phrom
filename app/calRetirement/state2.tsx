import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../components/WideBtn';
import { useNumberFormat } from "@/app/NumberFormatContext";

interface stateProps{
  isDarkMode: boolean;
  setState: (state: number) => void
  scrollViewRef: any;
  dataInput: any;
  setDataInput: (data: any) => void;
  havePlant: boolean;
}
const state2: React.FC<stateProps> = ({ isDarkMode, setState, scrollViewRef, dataInput, setDataInput, havePlant }) => {



  const [isFully, setIsFully] = useState(false);
  const { addCommatoNumber } = useNumberFormat();

  useEffect(() => {
  
    if ( dataInput.Current_savings === '' || dataInput.Current_savings_returns === '' || dataInput.Monthly_income === '' || dataInput.Monthly_expenses === '' || dataInput.Current_total_investment === '' || dataInput.Investment_return === '' || dataInput.Expected_inflation === '') {
      setIsFully(false);
    } else {
      setIsFully(true);
    }
  }, [dataInput]);




  return (
    <View 
    id='CalRetirementState2'
    className='flex-1'>
        <View className='bg-neutral2 rounded-3xl pb-10 px-5 mb-5'>
          <View className='flex mt-5'>
            
          <TextF className='text-normalText text-lg mt-5'>ข้อมูลการเงินในปัจจุบัน</TextF>
            <View className='flex mt-5 bg-neutral rounded-xl px-3'>
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>รายรับต่อเดือน</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='Monthly_incomeInput'
                      placeholder='ใส่จำนวนเงิน'
                      placeholderTextColor={'#B0B0B0'}
                      value={addCommatoNumber(dataInput.Monthly_income)}
                      keyboardType='numeric'
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Monthly_income: text.replace(/,/g, '') });
                      }}
                      onFocus={() => {
                        scrollViewRef.current?.scrollTo({
                              y: 100,
                              animated: true,
                          });
                      }}
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>บาท</TextF>
                </View>
              </View>
            </View>
            <View className='flex mt-5 bg-neutral rounded-xl px-3'>
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>รายจ่ายต่อเดือน</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='Monthly_expensesInput'
                      placeholder='ใส่จำนวนเงิน'
                      placeholderTextColor={'#B0B0B0'}
                      value={addCommatoNumber(dataInput.Monthly_expenses)}
                      keyboardType='numeric'
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Monthly_expenses: text.replace(/,/g, '') });
                      }}
                      onFocus={() => {
                        scrollViewRef.current?.scrollTo({
                              y: 150,
                              animated: true,
                          });
                      }}
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>บาท</TextF>
                </View>
              </View>
            </View>




            <TextF className='text-normalText text-lg mt-5'>เงินออมในปัจจุบัน</TextF>
            <View className='flex mt-5 bg-neutral rounded-xl px-3'>
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>เงินออมสำหรับการเกษียณ</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='Current_savingsInput'
                      placeholder='ใส่จำนวนเงิน'
                      placeholderTextColor={'#B0B0B0'}
                      value={addCommatoNumber(dataInput.Current_savings)}
                      keyboardType="decimal-pad"
                      readOnly={havePlant}
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Current_savings: text.replace(/,/g, '') });
                      }}
                      className={`h-16 text-end text-lg  pr-2 ${havePlant ? 'text-label': 'text-primary'}`}/>
                      <TextF className={` text-lg ${havePlant ? 'text-label': 'text-primary'}`}>บาท</TextF>
                </View>
              </View>

              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>ผลตอบแทนจากการออม</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='Current_savings_returnsInput'
                      value={dataInput.Current_savings_returns}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          text = text.replace(/^0+/, '');
                        }
                        if (text.length == 0) {
                          text = '0';
                        }
                        setDataInput({ ...dataInput, Current_savings_returns: text});
                      }}
                      onFocus={() => {
                        scrollViewRef.current?.scrollTo({
                              y: 0,
                              animated: true,
                          });
                      }}
                      onBlur={() => {
                        if (!dataInput.Current_savings_returns) {
                          setDataInput({ ...dataInput, Current_savings_returns: '1.5' });
                        }}
                      }
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>%</TextF>
                </View>
              </View>
            </View>




            <TextF className='text-normalText text-lg mt-5'>เงินลงทุนทั้งหมดในปัจจุบัน</TextF>
            <View className='flex mt-5 bg-neutral rounded-xl px-3'>
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>เงินลงทุน</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='Current_total_investmentInput'
                      placeholder='ใส่จำนวนเงิน'
                      placeholderTextColor={'#B0B0B0'}
                      value={addCommatoNumber(dataInput.Current_total_investment)}
                      keyboardType='numeric'
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Current_total_investment: text.replace(/,/g, '') });
                      }}
                      onFocus={() => {
                        scrollViewRef.current?.scrollTo({
                              y: 220,
                              animated: true,
                          });
                      }}
                      className={`h-16 text-end text-lg pr-2 text-primary`}/>
                      <TextF className={` text-lg text-primary`}>บาท</TextF>
                </View>
              </View>

              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>ผลตอบแทนจากการลงทุน</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='Investment_returnInput'
                      value={dataInput.Investment_return}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          text = text.replace(/^0+/, '');
                        }
                        if (text.length == 0) {
                          text = '0';
                        }
                        setDataInput({ ...dataInput, Investment_return: text.replace(/,/g, '') });
                      }}
                      onFocus={() => {
                        scrollViewRef.current?.scrollTo({
                              y: 300,
                              animated: true,
                          });
                      }}
                      onBlur={() => {
                        if (!dataInput.Investment_return) {
                          setDataInput({ ...dataInput, Investment_return: '7' });
                        }}
                      }
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>%</TextF>
                </View>
              </View>
            </View>




            
            <TextF className='text-normalText text-lg mt-5'>อัตราเปอร์เซ็นต์ต่างๆ</TextF>
            <View className='flex mt-5 bg-neutral rounded-xl px-3'>
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>เงินเฟ้อ</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='Expected_inflationInput'
                      value={dataInput.Expected_inflation}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          text = text.replace(/^0+/, '');
                        }
                        if (text.length == 0) {
                          text = '0';
                        }
                        setDataInput({ ...dataInput, Expected_inflation: text });
                      }}
                      onFocus={() => {
                        scrollViewRef.current?.scrollTo({
                              y: 800,
                              animated: true,
                          });
                      }}
                      onBlur={() => {
                        if (!dataInput.Expected_inflation) {
                          setDataInput({ ...dataInput, Expected_inflation: '3' });
                        }}
                      }
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>%</TextF>
                </View>
              </View>
            </View>
            <View className='h-20 '></View>
          </View>
        </View>

        <WideBtn id='BtnNextToState3' activeOpacity={1} text='ถัดไป' disabled={!isFully} onPress={()=>setState(3)}/>
        <View className='h-20 '></View>
    </View>
  )
}

export default state2