import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../components/WideBtn';
import { useNumberFormat } from "@/app/NumberFormatContext";



interface stateProps{
  isDarkMode: boolean;
  setState: (state: number) => void;
  dataInput: any;
  setDataInput: (data: any) => void;
}
const state1: React.FC<stateProps> = ({ isDarkMode, setState, dataInput, setDataInput }) => {

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isFully, setIsFully] = useState(false);
  const [subDate, setSubDate] = useState({
    day: '',
    month: '',
    year: '',
  });
  const { addCommatoNumber } = useNumberFormat();


  const handleConfirm = (selectedDate: Date) => {

    const thaiYear = selectedDate.getFullYear() + 543;
    setSubDate({
      day: selectedDate.getDate().toString().padStart(2, '0'),
      month: (selectedDate.getMonth() + 1).toString().padStart(2, '0'),
      year: thaiYear.toString(),
    });
    setPickerVisible(false);
  };

  useEffect(() => {
    if (subDate.day && subDate.month && subDate.year) {
      const christYear = Number(subDate.year) - 543
      const formattedDate = (subDate.day+'-'+subDate.month+'-'+christYear)
      setDataInput({ ...dataInput, Birth_date: formattedDate });
    }
  }, [subDate]);
  

  useEffect(() => {
    if (dataInput.Birth_date) {
      const dateParts = dataInput.Birth_date.split('-');
      setSubDate({
        day: dateParts[0],
        month: dateParts[1],
        year: String(Number(dateParts[2])+543),
      });
    }

  }, [dataInput.Birth_date]);

  useEffect(() => {
    if (dataInput.Name === '' || dataInput.Birth_date === '' || dataInput.Retirement_age === '' || dataInput.Exp_lifespan === '') {
      setIsFully(false);
    } else {
      setIsFully(true);
    }
  }, [dataInput]);


  return (
    <View 
    id='CalRetirementState1'
    className='flex-1'>
        <View className='bg-neutral2 rounded-3xl pb-10 px-5 mb-5'>
          <View className='flex mt-5'>
            <TextF className='text-normalText text-lg mt-5'>ชื่อแผน</TextF>
            <View className='h-16 px-3 mt-5 bg-neutral rounded-xl flex justify-center'>
              <TextInput
              id='NameInput' 
              placeholder="ชื่อแผน"
              placeholderTextColor={'#B0B0B0'}
              value={dataInput.Name}
              onChangeText={(text) => setDataInput({ ...dataInput, Name: text })}
              className={`text-lg`}/>
            </View>
          </View>
          <View className='flex mt-2'>
            <TextF className='text-normalText text-lg mt-5'>ข้อมูลอายุของคุณ</TextF>
            <View className='flex mt-5 bg-neutral rounded-xl px-3'>
              <View className='flex flex-row  justify-between items-center h-16'>
                <TextF className='text-lg text-normalText'>วัน/เดือน/ปีเกิดของคุณ</TextF>
                <View className=' flex flex-row justify-center items-center'>
                    <TextInput
                      id='BirthDateInput' 
                      placeholder="วัน"
                      placeholderTextColor={'#B0B0B0'}
                      value={subDate.day}
                      keyboardType='numeric'
                      maxLength={2}
                      onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, '');
                        const validatedValue = parseInt(numericText, 10);
                        const finalValue = !isNaN(validatedValue) && validatedValue > 31 ? '31' : validatedValue < 1 ? '1' : numericText;
                        setSubDate({ ...subDate, day: finalValue });
                      }}
                      className={` w-8 text-center text-primary`}/>
                      <TextF className='text-lg text-primary'>/</TextF>
                      <TextInput
                        id='BirthMonthInput' 
                        placeholder="เดือน"
                        placeholderTextColor={'#B0B0B0'}
                        value={subDate.month}
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={(text) => {
                          const numericText = text.replace(/[^0-9]/g, ''); 
                        
                          const validatedValue = parseInt(numericText, 10);
                          const finalValue = !isNaN(validatedValue) && validatedValue > 12 ? '12' : validatedValue < 1 ? '1' : numericText;
                        
                          setSubDate({ ...subDate, month: finalValue });
                        }}
                        className={` w-10 text-center text-primary`}/>
                      <TextF className='text-lg text-primary'>/</TextF>
                      <TextInput
                      id='BirthYearInput'
                      placeholder="ปี"
                      placeholderTextColor={'#B0B0B0'}
                      value={subDate.year}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, ''); 
                      
                        const fullYear = new Date().getFullYear() +543;
                        const validatedValue = parseInt(numericText, 10);
                        const finalValue = !isNaN(validatedValue) && validatedValue > fullYear ? String(fullYear) : numericText;
                      
                        setSubDate({ ...subDate, year: finalValue });
                      }}
                      className={` w-12 text-center text-primary`}/>
                  <TouchableOpacity 
                    id='BtnDatePicker'
                  onPress={() => setPickerVisible(true)} className='ml-2 flex justify-center items-center'>
                    <FontAwesome6 name="calendar-days" size={22} color={`${subDate.day && subDate.month && subDate.year ?'#2A4296':'#B0B0B0'}`}/>
                  </TouchableOpacity>
                  <DateTimePickerModal
                      id='DatePicker' 
                      isVisible={isPickerVisible}
                      display='spinner'
                      mode="date"
                      onConfirm={handleConfirm}
                      onCancel={() => setPickerVisible(false)}
                      locale='th_TH'
                      maximumDate={new Date()}
                    />
                </View>

              </View>

              <View className='w-full h-[1] bg-neutral2'></View>

              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>อายุที่ต้องการเกษียณ</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='RetirementAgeInput'
                      value={dataInput.Retirement_age}
                      keyboardType='numeric'
                      maxLength={2}
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Retirement_age: text });
                      }}
                      onBlur={() => {
                        if (!dataInput.Retirement_age) {
                          setDataInput({ ...dataInput, Retirement_age: '65' });
                        }}
                      }
                      className={` text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>ปี</TextF>
                </View>
              </View>

              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>อายุที่คาดว่าจะเสียชีวิต</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='ExpLifespanInput'
                      value={dataInput.Exp_lifespan}
                      keyboardType='numeric'
                      maxLength={3}
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Exp_lifespan: text });
                      }}
                      onBlur={() => {
                        if (!dataInput.Exp_lifespan) {
                          setDataInput({ ...dataInput, Exp_lifespan: '80' });
                        }
                      }}
                      className={` text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>ปี</TextF>
                </View>
              </View>
            </View>
            <View className='h-20 '></View>
          </View>
        </View>

        <WideBtn id='BtnNextToState2' activeOpacity={1} text='ถัดไป' disabled={!isFully} onPress={()=>setState(2)}/>
    </View>
  )
}

export default state1



