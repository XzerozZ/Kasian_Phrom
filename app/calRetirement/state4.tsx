import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import  TextF  from '../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../components/WideBtn';

interface stateProps{
  isDarkMode: boolean;
  setState: (state: number) => void
  dataInput: any;
  setDataInput: (data: any) => void;
}
const state4: React.FC<stateProps> = ({ isDarkMode, setState, dataInput, setDataInput  }) => {
  
  const [futureHouses, setFutureHouses] = useState('') 

  const [isFully, setIsFully] = useState(false);
  

const [selectNursingHousesId, setSelectNursingHousesId] = useState('')








  useEffect(() => {
    if (dataInput.Expected_monthly_expenses !== '' && dataInput.Annual_expense_increase !== '' && dataInput.Annual_savings_return !== '' && dataInput.Investment_return !== '' && futureHouses !== '') {
      setIsFully(true);
    } else {
      setIsFully(false);
    }
  }, [dataInput, futureHouses]);


useEffect(() => {

// fatch data from database
}, [selectNursingHousesId]);






const handelSaveData = () => {
  // Save data 
  console.log(dataInput);
}











  return (
    <View 
    id='CalRetirementState4'
    className='flex-1'>
      <View className='bg-neutral2 rounded-3xl pb-10 px-5 mb-5'>
          <View className='flex mt-5'>
            <TextF className='text-normalText text-lg mt-5'>ข้อมูลการเงินที่คาดหวังในอนาคต</TextF>
            <View className='flex mt-5 bg-neutral rounded-xl px-3'>
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>รายจ่ายหลังเกษียณ/เดือน</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='ExpectedMonthlyExpensesInput'
                      placeholder='ใส่จำนวนเงิน'
                      value={dataInput.Expected_monthly_expenses}
                      keyboardType='numeric'
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Expected_monthly_expenses: text });
                      }}
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>บาท</TextF>
                </View>
              </View>

              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>การเพิ่มขึ้นของรายจ่าย/ปี</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='AnnualExpenseIncreaseInput'
                      value={dataInput.Annual_expense_increase}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          text = text.replace(/^0+/, '');
                        }
                        if (text.length == 0) {
                          text = '0';
                        }
                        setDataInput({ ...dataInput, Annual_expense_increase: text });
                      }}
                      onBlur={() => {
                        if (!dataInput.Annual_expense_increase) {
                          setDataInput({ ...dataInput, Annual_expense_increase: '3' });
                        }}
                      }
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>%</TextF>
                </View>
              </View>

              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>ผลตอบแทนจากการออม/ปี</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='AnnualSavingsReturnInput'
                      value={dataInput.Annual_savings_return}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          text = text.replace(/^0+/, '');
                        }
                        if (text.length == 0) {
                          text = '0';
                        }
                        setDataInput({ ...dataInput, Annual_savings_return: text });
                      }}
                      onBlur={() => {
                        if (!dataInput.Annual_savings_return) {
                          setDataInput({ ...dataInput, Annual_savings_return: '1.25' });
                        }}
                      }
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>%</TextF>
                </View>
              </View>

              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>ผลตอบแทนจากการลงทุน/ปี</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='AnnualInvestmentReturnInput'
                      value={dataInput.Annual_investment_return}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          text = text.replace(/^0+/, '');
                        }
                        if (text.length == 0) {
                          text = '0';
                        }
                        setDataInput({ ...dataInput, Annual_investment_return: text });
                      }}
                      onBlur={() => {
                        if (!dataInput.Annual_investment_return) {
                          setDataInput({ ...dataInput, Annual_investment_return: '5' });
                        }}
                      }
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>%</TextF>
                </View>
              </View>
            </View>
          </View>

          <View className='flex mt-2'>
            <TextF className='text-normalText text-lg mt-5'>ที่อยู่อาศัยที่คาดหวังในอนาคต</TextF>
            <View
            className=' h-14 flex flex-row justify-center items-center mb-5 gap-5 mt-5'>
              <TouchableOpacity
              id='OwnHouseBtn'
              activeOpacity={1}
              onPress={() => setFutureHouses('ownHouse')}
              className={`flex-1 h-14 rounded-lg justify-center items-center flex-row gap-3 ${futureHouses == 'ownHouse' ? 'bg-primary':'bg-neutral'}`}>
                <FontAwesome6 name="house-chimney" size={20} color={futureHouses == 'ownHouse' ?'#FCFCFC':'#2A4296'} />
                <TextF className={`text-lg ${futureHouses  == 'ownHouse' ? 'text-neutral':'text-primary'}`}>บ้านตนเอง</TextF>
              </TouchableOpacity>
              <TouchableOpacity 
              id='NursingHousesBtn'
              activeOpacity={1}
              onPress={() => setFutureHouses('nursingHouses')}
              className={`flex-1 h-14 rounded-lg justify-center items-center flex-row gap-3 ${futureHouses == 'nursingHouses' ? 'bg-primary':'bg-neutral'}`}>
                <FontAwesome6 name="person-cane" size={22} color={futureHouses == 'nursingHouses' ?'#FCFCFC':'#2A4296'} />
                <TextF className={`text-lg ${futureHouses  == 'nursingHouses' ? 'text-neutral':'text-primary'}`}>บ้านพักคนชรา</TextF>
              </TouchableOpacity>
            </View>
          </View>
          {futureHouses == 'nursingHouses' && <View className='h-20 '></View>}
    </View>
    <View className='h-5 '></View>
    <WideBtn id='saveCalRetirementData' activeOpacity={1} text='ถัดไป' disabled={!isFully} onPress={handelSaveData}/>
  </View>
  )
}

export default state4