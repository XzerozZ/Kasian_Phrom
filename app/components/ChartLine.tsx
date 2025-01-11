import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Line } from 'react-native-svg'; // เพิ่ม Svg และ Line
import { Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome6, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from './TextF';


const screenWidth = Dimensions.get('window').width;










const CustomGraph = () => {


    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], // เดือน
        datasets: [
          {
            data: [21000, 21000, 21500, 22000, 21500, 21000, 20800, 21000, 21200, 21000, 20500, 20500], // จำนวนเงิน
            color: (opacity = 1) => `rgba(103, 128, 214, ${opacity})`, // สีเส้นโยงจุด
            strokeWidth: 2, // ความหนาของเส้น
          },
        ],
      };
      
      const chartConfig = {
        backgroundGradientFrom: '#FCFCFC',
        backgroundGradientTo: '#FCFCFC',
        color: (opacity = 1) => `rgba(7, 15, 45, ${opacity})`, // สีแกน
        labelColor: (opacity = 1) => `rgba(7, 15, 45, ${opacity})`, // สีข้อความ
        propsForDots: {
          r: '3', // ขนาดจุด (4px)
          strokeWidth: '0',
          stroke: '#2A4296', // สีจุด
        },
        propsForBackgroundLines: {
          stroke: '#DBDFEC', // สีตาราง
        },
        decimalPlaces: 0, // จำนวนทศนิยม
      };



    const options = [
        {title:'2025'},
        {title:'2024'},
        {title:'2023'},
        {title:'2022'},
        {title:'2021'},
        {title:'2020'},
        {title:'2019'},
        {title:'2018'},
        {title:'2017'},
        {title:'2016'},
        {title:'2015'},
        {title:'2014'},
        {title:'2013'},
        {title:'2012'},
        {title:'2011'},
        {title:'2010'},
        {title:'2009'},
        {title:'2008'},
        {title:'2007'},
        {title:'2006'},
    ];
    const [selectedOption, setSelectedOption] = useState('2025');







    return (
      <View 
      id='CustomGraphContainer'
      className='flex justify-center items-center rounded-3xl' style={{position: 'relative'}}>
        <LineChart
        
          data={data}
          width={screenWidth - 64}
          height={250}
          chartConfig={chartConfig}
          withShadow={false} // เอาไฮไลท์ใต้กราฟออก
          bezier
          style={{
            marginVertical: 8, 
            borderRadius: 16,
          }}
          decorator={({ width, height }: { width: number; height: number }) => {
            const targetIndex = 100;
            return (
              <Svg>
                <Line
                  x1={64}
                  y1={targetIndex}
                  x2={screenWidth}
                  y2={targetIndex}
                  stroke="#F68D2B"
                  strokeWidth={2}
                  opacity={0.8}
                />
              </Svg>
            );
          }}
        />
        <Text style={{position:'absolute', right:0, bottom:0, fontFamily:'SarabunRegular'}} className='text-label'>เดือน</Text>
        <Text style={{position:'absolute', left:0, top:-30, fontFamily:'SarabunRegular'}} className='text-label'>เงิน(บาท)</Text>
        <View style={{position:'absolute', right:0, top:-30}}>
            <SelectDropdown
              data={options}
              defaultValueByIndex={0}
              onSelect={(selectedItem, index) => {
                setSelectedOption(selectedItem.title)
                console.log(selectedItem, index);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View 
                  id='SelectYear'
                  className='flex flex-row justify-end items-center w-20'>
                    <TextF className='pr-1'>
                      {(selectedItem && selectedItem.title)} 
                    </TextF>
                    <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'} size={20}/>
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View className={`flex flex-row justify-center items-center bg-neutral h-10 px-5 ${isSelected ? ' bg-neutral2' : ''}`}>
                    <TextF className='flex justify-center items-center'>{item.title}</TextF>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={{backgroundColor: '#FCFCFC', borderRadius: 6}}
            />
        </View>
      </View>
    );
  };

  export default CustomGraph;