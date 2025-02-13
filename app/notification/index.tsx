import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome6, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import  TextF  from '../components/TextF';

interface Notification {
  id: number;
  status: 'success' | 'warning' | 'error';
  message: string;
  amount: number;
  unit: string;
}

interface NotificationScreenProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}

const notifications: Notification[] = [
  { id: 1, status: 'success', message: 'สุดยอด เก็บครบตามเป้าแล้ว พยายามต่อไปนะ', amount: 0, unit: '' },
  { id: 2, status: 'success', message: 'เยี่ยมมาก เดือนนี้เก็บครบตามเป้า มาพยายามกันต่อเดือนหน้านะ', amount: 25000, unit: 'บาท' },
  { id: 3, status: 'error', message: 'หมดเดือนแล้ว พยายามให้ดีมากกว่านี้ในเดือนหน้า', amount: 20000, unit: 'บาท' },
  { id: 4, status: 'warning', message: 'วันสุดท้ายแล้ว!!! อย่าลืมเก็บเงินตามแผนที่วางไว้', amount: 1500, unit: 'บาท'},
  { id: 5, status: 'warning', message: 'อีก 3 วันจะหมดเดือนแล้ว อย่าลืมเก็บเงินตามแผนที่วางไว้', amount: 1500, unit: 'บาท' },
];

const NotificationScreen: React.FC<NotificationScreenProps> = ({ setActiveTab, setStateNavbar }) => {
  useEffect(() =>{
        setStateNavbar(false)
      },[]);
  return (
    <View 
    id='NotificationContainer'
    className="flex-1">
      {/* Header */}
      <View 
      id='NotificationHeader'
      className="flex flex-row items-center px-4 py-4 mt-6 border-b border-gray-300">
        <TouchableOpacity 
          id='BtnNotiBack'
          activeOpacity={1}
          onPress={()=>setActiveTab('main')}
          className=''>
          <FontAwesome6 name="angle-left" size={28} color='#070F2D'/>
        </TouchableOpacity>
        <Text
        style={{ fontFamily: 'SarabunBold' }}
        className="text-2xl text-normalText pl-5 pr-2 ">กล่องจดหมาย</Text>
        <Ionicons name="mail" size={28} color="#070F2D" />
      </View>

      {/* Notification List */}
      <ScrollView className="p-4">
        {notifications.map((notification) => (
          <View
            key={notification.id}
            className={`flex flex-row p-4 mb-4 rounded-lg border border-neutral2 bg-neutral shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}>
            <View
              className="w-3 h-3 rounded-full mr-4 mt-2"
              style={{
                backgroundColor:
                  notification.status === 'success'
                    ? '#4CAF50'
                    : notification.status === 'warning'
                    ? '#FFC107'
                    : '#F44336',
              }}
            />
            <View className="flex-1">
              <TextF className=" text-normalText text-lg">{notification.message}</TextF>
              {notification.amount > 0 && (
                <TextF className="text-lg text-normalText">
                  เดือนนี้เก็บได้: {notification.amount.toLocaleString()} {notification.unit}
                </TextF>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;


