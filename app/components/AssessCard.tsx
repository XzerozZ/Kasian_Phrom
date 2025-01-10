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
        <View className='bg-neutral pb-0 rounded-2xl border border-banner mt-5 mx-5 overflow-hidden'>
            {selectedRisk ? (
                <>  
                    <TouchableOpacity 
                    activeOpacity={1}
                    onPress={() => setActiveTab('assessmentRisk')}>
                        <View className='flex h-32 justify-center gap-1'>
                            <TextF className='text-center text-primary2 text-lg mt-2'>คุณคือผู้ลงทุนประเภท</TextF>
                            <View className='h-14 justify-center items-center'>
                                <Text className={`text-2xl h-14 flex justify-center items-center pt-2`} style={{ color: selectedRisk.textColor, fontFamily: 'SarabunBold' }}>
                                    {selectedRisk.label}
                                </Text>
                            </View>
                        </View>
                        <View 
                        className='flex-row items-center bg-neutral2 pr-4'> 
                            <Text className='text-end text-primary py-3 pr-3 ml-auto' style={{ fontFamily: 'SarabunBold' }}>ดูรายละเอียด</Text>
                            <FontAwesome6 name="play" size={15} color={'#2A4296'} />
                        </View>
                    </TouchableOpacity>
                 </>):(<>
                    <TouchableOpacity  
                    activeOpacity={1}
                        onPress={() => setActiveTab('assessmentRisk')}>
                        <View className='flex h-32 justify-center gap-1 px-5'>
                            <Text className={`text-center text-2xl`} style={{ color:'#2A4296', fontFamily: 'SarabunBold' }} >
                                คุณยังไม่ได้ทำการประเมินความเสี่ยงที่รับได้ในการลงทุน
                            </Text>
                        </View>
                        <View 
                        className='flex-row items-center bg-neutral2 pr-4'> 
                            <Text className='text-end text-primary py-3 pr-3 ml-auto' style={{ fontFamily: 'SarabunBold' }}>ทำแบบประเมินความเสี่ยง</Text>
                            <FontAwesome6 name="play" size={15} color={'#2A4296'} />
                        </View>
                    </TouchableOpacity>
                 </>)}
        </View>
        </>
    );

};

export default AssessCard;