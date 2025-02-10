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
        if(options.length > 0){ 
            Animated.timing(heightAnimation, {
            toValue: selectIsOpen ? options.length == 2 ? 86 : options.length < 5 ? options.length*43 : 4*43 : 0,
            duration: 100,
            useNativeDriver: false,
        }).start();
        }else{
            setSelectIsOpen(false);
            Animated.timing(heightAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }
       
    }, [options, selectIsOpen]);


  return (
    <View className='flex-1 relative items-end'>
    <Animated.View
        style={{height: heightAnimation}}
        className={`absolute w-full top-11 bg-neutral rounded-b-lg z-20 overflow-hidden ${selectIsOpen ?' border border-t-0 border-neutral2':''}`}>
        <ScrollView
        showsVerticalScrollIndicator={false}>
            {options.map((option, index) => (
                <View key={index}>
                <TouchableOpacity 
                activeOpacity={1}
                onPress={options.length > 0 ?()=>{setSelectedOption(option.title); setSelectIsOpen(false)}:()=>{}}
                className={`flex flex-row justify-between items-center h-12 px-5 active:bg-unselectInput`}>
                <TextF className='flex justify-center items-center'>{option.title}</TextF>
                </TouchableOpacity>
                {index !== options.length-1 &&<View className=' border-b border-neutral2 w-11/12 mx-auto'></View>}
                </View>
            ))}
        </ScrollView>
    </Animated.View>
    <TouchableOpacity
    id='BtnSelectSavingType'
    activeOpacity={1}
    onPress={options.length > 0 ?()=>setSelectIsOpen(!selectIsOpen):()=>{} }
    className={` absolute z-30 flex flex-row justify-between items-center bg-neutral border rounded py-2 pr-1 w-full ${options.length > 0 ?'border-primary':'border-label'}`}>
        <TextF className={`text-lg pl-5 pr-5 ${options.length > 0 ?' text-normalText':'text-label'}`}>
            {selectedOption}
        </TextF>
        <MaterialCommunityIcons name={selectIsOpen ? 'chevron-up' : 'chevron-down'}size={25} color={`${options.length > 0 ?'':'#979797'}`}/>
        
    </TouchableOpacity>
    
    </View>
  )
}

export default DropdownCustom