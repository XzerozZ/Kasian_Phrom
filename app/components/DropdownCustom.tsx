import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import  TextF  from './TextF';


interface DropdownCustomProps{
    options: {title: string}[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
    }
const DropdownCustom: React.FC<DropdownCustomProps> = ({options, selectedOption, setSelectedOption}) => {

    const [selectIsOpen, setSelectIsOpen] = useState(false)
    const heightAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(heightAnimation, {
          toValue: selectIsOpen ? 86 : 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
    }, [selectIsOpen]);
  return (
    <View className='flex-1 relative items-end'>
    <Animated.View
        style={{height: heightAnimation}}
        className={`absolute w-full top-11 bg-neutral rounded-b-lg z-20 overflow-hidden ${selectIsOpen ?' border border-t-0 border-neutral2':''}`}>
        {options.map((option, index) => (
            <View key={index}>
                <TouchableOpacity 
                activeOpacity={1}
                onPress={()=>{setSelectedOption(option.title); setSelectIsOpen(false)}}
                className='flex flex-row justify-between items-center h-12 px-5 active:bg-unselectInput'>
                <TextF className='flex justify-center items-center'>{option.title}</TextF>
                </TouchableOpacity>
                {index !== options.length-1 &&<View className=' border-b border-neutral2 w-11/12 mx-auto'></View>}
            </View>
        ))}
    </Animated.View>
    <TouchableOpacity
    id='BtnSelectSavingType'
    activeOpacity={1}
    onPress={()=>setSelectIsOpen(!selectIsOpen)}
    className=' absolute z-30 flex flex-row justify-between items-center bg-neutral border border-primary rounded py-2 pr-1 w-full'>
        <TextF className='text-lg pl-5 pr-5'>
            {selectedOption}
        </TextF>
        <MaterialCommunityIcons name={selectIsOpen ? 'chevron-up' : 'chevron-down'}size={25}/>
        
    </TouchableOpacity>
    
    </View>
  )
}

export default DropdownCustom