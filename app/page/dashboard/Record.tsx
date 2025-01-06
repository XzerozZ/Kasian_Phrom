import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import ChartLine from '../../components/ChartLine';
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from "react-native-chart-kit";
import { LinearGradient } from 'expo-linear-gradient';
import HistoryCard from '../../components/HistoryCard';


interface RecordProps{
  isDarkMode: boolean;
}
const Record: React.FC<RecordProps> = ({ isDarkMode }) => {


  return (
    <ScrollView>
      <View className=' flex'>
        <View className='mt-5 flex justify-center items-center'>
          <Text className='text-2xl font-bold'>ชื่อแผน</Text>
        </View>
        <View className='mt-5 px-5'>
          <View className='flex justify-center items-center bg-neutral pr-4 pt-7 pl-2 rounded-3xl shadow-sm h-96'>
            <ChartLine/>
          </View>
          

        </View>
        <View className='px-5 mt-5 gap-3'>
          <View className='flex'>
            <Text className=' text-normalText text-lg'>ประวัติการออม</Text>
          </View>
          <View className='flex flex-row justify-between items-center'>
            <Text className=' text-normalText'>เดือนนี้</Text>
            <Text className=' text-normalText'>5,000 บาท</Text>
          </View>
        </View>
        <View className='px-5 mt-5'>
          <HistoryCard/>
        </View>
      </View>
    </ScrollView>
  )
}

export default Record
