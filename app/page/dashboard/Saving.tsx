import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import  TextF  from '../../components/TextF';


interface SavingProps{
  isDarkMode: boolean;
}


const Saving: React.FC<SavingProps> = ({ isDarkMode }) => {



    const [selectedOption, setSelectedOption] = useState('เงินออม');
    const [isDiposit, setIsDiposit] = useState(true)
    const [amount, setAmount] = useState('')
    const scrollViewRef = useRef<ScrollView>(null);

    const options = [
        {title:'เงินออม'},
        {title:'ลงทุน'}
    ];

    const handleConfirm = () => {
        console.log('Selected Option:', selectedOption);
        console.log('Amount:', amount);
      };






  return (
    <ScrollView ref={scrollViewRef} >
    <View className=' flex'>
      <View className='mt-5 flex justify-center items-center'>
        <TextF className='text-2xl font-bold'>ชื่อแผน</TextF>
      </View>
      <View className='mt-5 flex justify-center items-center bg-bgAuth mx-8 p-3 pt-4 pb-5 rounded-3xl shadow-sm'>
        <View className='flex w-full items-center gap-5'>
          <TextF className='text-lg'>จำนวนเงินที่ต้องเก็บตามแผนในเดือนนี้</TextF>
          <TextF className='text-3xl scale-125'>19,000</TextF>
          <TextF>บาท</TextF>
        </View>
        <View className='mt-5 w-11/12 h-[2] bg-primary'></View>
        <View className='flex flex-row w-full gap-3 '>
            <View className='flex-1 items-center gap-3 pt-5'>
            <TextF className='text-lg'>จำนวนเงินสุทธิ</TextF>
            <TextF className='text-xl'>152,600</TextF>
            <TextF>บาท</TextF>
          </View>
          <View className=' w-[2] bg-primary'></View>
          <View className='flex-1 items-center gap-3 pt-5'>
            <TextF className='text-lg'>จำนวนเงินที่ต้องเก็บ</TextF>
            <TextF className='text-xl '>49,847,400</TextF>
            <TextF>บาท</TextF>
          </View>
        </View>
      </View>
    </View>
    <View className='flex flex-row justify-center items-center mt-3 w-full px-5'>
      <TouchableOpacity 
      activeOpacity={1}
      onPress={() => setIsDiposit(true)}
      className={`flex-1 justify-center items-center mt-5 p-3 rounded-l-xl shadow-sm ${isDiposit?'bg-primary':'bg-unselectInput'}`}>
        <TextF className={`text-lg ${isDiposit?'text-white':'text-primary'}`}>ฝากเงิน</TextF>
      </TouchableOpacity>
      <TouchableOpacity 
      activeOpacity={1}
      onPress={() => setIsDiposit(false)}
      className={`flex-1 justify-center items-center mt-5 p-3 rounded-r-xl shadow-sm ${!isDiposit?'bg-err':' bg-unselectInput'}`}>
        <TextF className={`text-lg ${!isDiposit?'text-white':'text-primary'}`}>ถอนเงิน</TextF>
      </TouchableOpacity>
    </View>
    <View className='flex flex-row justify-center items-s mt-10'>
        <View className='flex-1 items-center'>
          <TextF className='text-lg'>เลือกประเภทการออม</TextF>
        </View>
        <View className='flex-1 '>
        <SelectDropdown
          data={options}
          defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            setSelectedOption(selectedItem.title)
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View className='flex flex-row justify-between items-center bg-neutral border border-primary rounded py-2 pl-5 pr-1 w-10/12'>
                <TextF className='text-lg pr-5'>
                  {(selectedItem && selectedItem.title)} 
                </TextF>
                <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} size={25}/>
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View className={`flex flex-row justify-between items-center bg-neutral h-10 px-5 ${isSelected ? ' bg-neutral2' : ''}`}>
                <TextF className='flex justify-center items-center'>{item.title}</TextF>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={{backgroundColor: '#FCFCFC', borderRadius: 6}}
        />
        </View>
    </View>
    <View>
        <TextInput
            onFocus={() => {
              scrollViewRef.current?.scrollTo({
                  y: 300,
                  animated: true,
              });
          }}
            placeholder="ใส่จำนวนเงิน"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            className={`h-10 mx-5 px-3 mt-5 bg-neutral border-b  ${amount == '' ?'border-unselectInput' :'border-primary'}`}/>


        <TouchableOpacity 
        activeOpacity={1}
        className={`mt-5 mx-5 p-3 rounded-xl shadow-sm flex justify-center items-center h-14 ${amount == '' ?' bg-unselectMenu' :' bg-primary'}`}
        onPress={handleConfirm} >
            <TextF className='text-white'>ยืนยัน</TextF>
        </TouchableOpacity>

    </View>
    <View className='flex justify-center my-10 px-5'>
        <TextF className=' text-label'>ปรับแผน</TextF>
        <View className='flex flex-row justify-between items-center bg-neutral h-20 p-3 mt-5 border border-unselectMenu rounded-xl shadow-sm'>
            <TextF className='text-lg'>ปรับแผนการเกษียณ</TextF>
            <View className='flex flex-row gap-1'>
                <TextF className='text-accent'>แก้ไขข้อมูล</TextF>
                <FontAwesome6 name="caret-right" size={20} color='#F68D2B'/>
            </View>
        </View>
    </View>







    

  </ScrollView>
  )
}

export default Saving