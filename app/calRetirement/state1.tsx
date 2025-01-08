import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';


interface stateProps{
  isDarkMode: boolean;
  dataInput: any;
  setDataInput: (data: any) => void;
}
const state1: React.FC<stateProps> = ({ isDarkMode, dataInput, setDataInput }) => {

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [subDate, setSubDate] = useState({
    day: '',
    month: '',
    year: '',
  });


  const handleConfirm = (selectedDate: Date) => {

    const thaiYear = selectedDate.getFullYear() + 543;
    setSubDate({
      day: selectedDate.getDate().toString().padStart(2, '0'),
      month: (selectedDate.getMonth() + 1).toString().padStart(2, '0'),
      year: thaiYear.toString(),
    });

    const formattedDate = selectedDate.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setDataInput({ ...dataInput, BirthDate: formattedDate });
    setPickerVisible(false);
  };

  useEffect(() => {
    if (subDate.day && subDate.month && subDate.year) {
      // สร้างวันที่จากข้อมูล subDate และแปลงปีไทย (พ.ศ.) เป็นปีสากล (ค.ศ.)
      const selectedDate = new Date(
        parseInt(subDate.year, 10) - 543, // แปลงปีไทยเป็นปีสากล
        parseInt(subDate.month, 10) - 1, // เดือนใน JavaScript เริ่มต้นที่ 0
        parseInt(subDate.day, 10) // วัน
      );
  
      // ฟอร์แมตวันที่เป็น วัน/เดือน/ปี ค.ศ.
      const formattedDate = selectedDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
  
      // อัปเดต state ของ BirthDate
      setDataInput({ ...dataInput, BirthDate: formattedDate });
    }
  }, [subDate]);
  


console.log(dataInput)







  return (
    <View className='flex-1 mt-10'>
        <View className='bg-neutral2 rounded-3xl pb-10 px-5'>
          <View className='flex mt-5'>
            <TextF className='text-normalText text-lg mt-5'>ชื่อแผน</TextF>
            <View className='h-16 px-3 mt-5 bg-neutral rounded-xl flex justify-center'>
              <TextInput
              placeholder="ชื่อแผน"
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
                      placeholder="วัน"
                      value={subDate.day}
                      keyboardType='numeric'
                      maxLength={2}
                      onChangeText={(text) => {
                        // กรองเฉพาะตัวเลข
                        const numericText = text.replace(/[^0-9]/g, ''); 
                      
                        // ตรวจสอบค่าที่ใส่ หากเกิน 31 ให้ปัดเป็น 31
                        const validatedValue = parseInt(numericText, 10);
                        const finalValue = !isNaN(validatedValue) && validatedValue > 31 ? '31' : numericText;
                      
                        // อัปเดต state
                        setSubDate({ ...subDate, day: finalValue });
                      }}
                      className={` w-8 text-center`}/>
                      <TextF className='text-lg text-normalText'>/</TextF>
                      <TextInput
                        placeholder="เดือน"
                        value={subDate.month}
                        keyboardType="numeric"
                        maxLength={2} // จำกัดให้ป้อนได้แค่ 2 ตัวอักษร
                        onChangeText={(text) => {
                          // กรองเฉพาะตัวเลข
                          const numericText = text.replace(/[^0-9]/g, ''); 
                        
                          // ตรวจสอบค่าที่ใส่ หากเกิน 31 ให้ปัดเป็น 31
                          const validatedValue = parseInt(numericText, 10);
                          const finalValue = !isNaN(validatedValue) && validatedValue > 12 ? '12' : numericText;
                        
                          // อัปเดต state
                          setSubDate({ ...subDate, month: finalValue });
                        }}
                        className={` w-10 text-center`}/>
                      <TextF className='text-lg text-normalText'>/</TextF>
                      <TextInput
                      placeholder="ปี"
                      value={subDate.year}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        // กรองเฉพาะตัวเลข
                        const numericText = text.replace(/[^0-9]/g, ''); 
                      
                        // ตรวจสอบค่าที่ใส่ หากเกิน 31 ให้ปัดเป็น 31
                        const fullYear = new Date().getFullYear() +543;
                        const validatedValue = parseInt(numericText, 10);
                        const finalValue = !isNaN(validatedValue) && validatedValue > fullYear ? String(fullYear) : numericText;
                      
                        // อัปเดต state
                        setSubDate({ ...subDate, year: finalValue });
                      }}
                      className={` w-12 text-center`}/>

                  <TouchableOpacity 
                  
                  onPress={() => setPickerVisible(true)} className='ml-2 flex justify-center items-center'>
                    <FontAwesome6 name="calendar-days" size={22} color={`${subDate.day && subDate.month && subDate.year ?'#070F2D':'#B0B0B0'}`}/>
                  </TouchableOpacity>
                  <DateTimePickerModal
                    isVisible={isPickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setPickerVisible(false)}
                    locale="th-TH" // ตั้งค่าภาษาไทย
                    maximumDate={new Date()} // กำหนดวันที่สูงสุดให้เป็นวันปัจจุบัน
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
                      placeholder="จำนวน"
                      value={dataInput.Retirement_age}
                      keyboardType='numeric'
                      maxLength={2}
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Retirement_age: text });
                      }}
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
                      placeholder="จำนวน"
                      value={dataInput.Exp_lifespan}
                      keyboardType='numeric'
                      maxLength={2}
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Exp_lifespan: text });
                      }}
                      className={` text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>ปี</TextF>
                </View>
              </View>
            </View>
            <View className='h-32'></View>
          </View>
        </View>
    </View>
  )
}

export default state1