import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import  TextF  from './TextF';


interface DropdownYearCustomProps{
    options: {item: string}[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
    }
const DropdownYearCustom: React.FC<DropdownYearCustomProps> = ({options, selectedOption, setSelectedOption}) => {

    const [selectIsOpen, setSelectIsOpen] = useState(false)
    const heightAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(heightAnimation, {
          toValue: selectIsOpen ? options.length < 5 ? options.length*36 : 36*4 : 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
    }, [selectIsOpen]);
  return (
    <View className='flex-1 relative items-end '>
    <Animated.View
        style={{height: heightAnimation, top: 30}}
        className={`absolute w-20 bg-neutral rounded-lg z-20 overflow-hidden ${selectIsOpen ?' border border-neutral2':''}`}>
        <ScrollView 
        showsVerticalScrollIndicator={false}>
            {options.map((option, index) => (
                <View key={index}>
                    <TouchableOpacity 
                    activeOpacity={1}
                    onPress={()=>{setSelectedOption(option.item); setSelectIsOpen(false)}}
                    className='flex flex-row justify-between items-center h-10 px-5 active:bg-unselectInput'>
                    <TextF className='flex justify-center items-center'>{option.item}</TextF>
                    </TouchableOpacity>
                    {index !== options.length-1 &&<View className=' border-b border-neutral2 w-11/12 mx-auto'></View>}
                </View>
            ))}
        </ScrollView>
    </Animated.View>
    <TouchableOpacity 
    id='BtnSelectSavingType'
    activeOpacity={1}
    onPress={()=>setSelectIsOpen(!selectIsOpen)}
    className=' absolute z-30 flex flex-row justify-end gap-1 items-center w-20'>
        <TextF className=''>
            {selectedOption} 
        </TextF>
        <MaterialCommunityIcons name={selectIsOpen ? 'chevron-up' : 'chevron-down'}size={20}/> 
        
    </TouchableOpacity>
    
    </View>
  )
}

export default DropdownYearCustom