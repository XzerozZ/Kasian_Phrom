import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import  TextF  from './TextF';
import assessResult from '../assessmentRisk/results';

interface AssessCardProps {
    riskId?: number;
    setActiveTab: (tab: string) => void;
};

const AssessCard: React.FC<AssessCardProps> = ({ riskId, setActiveTab }) => {
    const selectedRisk = assessResult.find((item) => item.id === riskId);
    
    return (
        <>
        <View className='bg-neutral pt-5 pb-0 rounded-2xl border border-banner mt-5 mx-8 overflow-hidden'>
            {selectedRisk ? (
                <>  
                    <TextF className='text-center mt-3 text-primary2 text-lg'>คุณคือผู้ลงทุนประเภท</TextF>
                    <Text className={`text-center text-2xl mt-2 mb-8 h-10`} style={{ color: selectedRisk.textColor, fontFamily: 'SarabunBold' }}>
                        {selectedRisk.label}
                    </Text>
                    <Pressable className='flex-row items-center bg-neutral2 pr-4' onPress={() => setActiveTab('assessmentRisk')}> 
                        <Text className='text-end text-lg text-primary p-2 pr-3 ml-auto' style={{ fontFamily: 'SarabunBold' }}>ดูรายละเอียด</Text>
                        <FontAwesome6 name="play" size={16} color={'#2A4296'} />
                    </Pressable>
                 </>):(<>
                    <Text className={`text-center text-2xl mt-5 mb-8 px-10`} style={{ color:'#2A4296', fontFamily: 'SarabunBold' }} >
                        คุณยังไม่ได้ทำการประเมินความเสี่ยงที่รับได้ในการลงทุน
                    </Text>
                    <Pressable className='flex-row items-center bg-neutral2 pr-4' onPress={() => setActiveTab('assessmentRisk')}> 
                        <Text className='text-end text-lg text-primary p-2 pr-3 ml-auto' style={{ fontFamily: 'SarabunBold' }}>ทำแบบประเมินความเสี่ยง</Text>
                        <FontAwesome6 name="play" size={16} color={'#2A4296'} />
                    </Pressable>
                 </>)}
        </View>
        </>
    );

};

export default AssessCard;