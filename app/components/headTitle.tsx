import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

import  TextF  from './TextF';

interface headTitleProps{
    setActiveTab: (tab: string) => void;
    title: string;
    route: string;
}
const headTitle: React.FC<headTitleProps> = ({ setActiveTab, title, route }) => {



    return (
        <>
        <View className='flex-row mt-3 ml-5 h-14 items-center'>
            <TouchableOpacity 
                activeOpacity={1}
                onPress={()=>setActiveTab(route)}
                className=''>
                <FontAwesome6 name="angle-left" size={28} color='#070F2D'/>
            </TouchableOpacity>
            <Text 
            style={{ fontFamily: 'SarabunBold'}}
            className=' text-normalText text-2xl ml-3 h-12 pt-2'>{title}</Text>
        </View>
        
        </>
    )
}

export default headTitle