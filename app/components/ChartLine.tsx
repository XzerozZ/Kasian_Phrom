import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Svg, Line } from 'react-native-svg'; // เพิ่ม Svg และ Line
import { Dimensions } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import  TextF  from './TextF';
import DropdownYearCustom from './DropdownYearCustom';

const screenWidth = Dimensions.get('window').width;





interface InfoHistoryItem {
  track_at: string;
  method: string;
  money: number;
}

interface MonthlyData {
  [key: string]: number;
}


interface ChartLineProps {
  infoHistory: any;
}

const CustomGraph: React.FC<ChartLineProps> = ({ infoHistory }) => {

  const infoHistory2 = [
    // ปี 2023
    {
      history_id: "1",
      method: "deposit",
      type: "saving_money",
      name: "เงินเดือน",
      category: "income",
      money: 30000,
      track_at: "2025-01-15T08:30:00Z",
    },
    {
      history_id: "2",
      method: "withdraw",
      type: "expense",
      name: "ค่าผ่อนบ้าน",
      category: "housing",
      money: 15000,
      track_at: "2025-01-20T10:00:00Z",
    },
    {
      history_id: "3",
      method: "deposit",
      type: "saving_money",
      name: "โบนัส",
      category: "income",
      money: 5000,
      track_at: "2025-02-05T12:45:00Z",
    },
    {
      history_id: "4",
      method: "withdraw",
      type: "expense",
      name: "ค่ารถ",
      category: "transport",
      money: 7000,
      track_at: "2024-02-12T14:20:00Z",
    },
  
    // ปี 2024
    {
      history_id: "5",
      method: "deposit",
      type: "saving_money",
      name: "เงินเดือน",
      category: "income",
      money: 32000,
      track_at: "2024-03-10T09:00:00Z",
    },
    {
      history_id: "6",
      method: "withdraw",
      type: "expense",
      name: "ค่ากิน",
      category: "food",
      money: 8000,
      track_at: "2024-03-18T18:30:00Z",
    },
    {
      history_id: "7",
      method: "deposit",
      type: "saving_money",
      name: "เงินเกษียณ",
      category: "retirement",
      money: 12000,
      track_at: "2024-04-05T15:10:00Z",
    },
    {
      history_id: "8",
      method: "withdraw",
      type: "expense",
      name: "ค่ารักษาพยาบาล",
      category: "health",
      money: 5000,
      track_at: "2024-04-20T16:40:00Z",
    },
  
    // ปี 2025
    {
      history_id: "9",
      method: "deposit",
      type: "saving_money",
      name: "เงินเดือน",
      category: "income",
      money: 35000,
      track_at: "2024-02-10T16:28:04.077813Z",
    },
    {
      history_id: "10",
      method: "withdraw",
      type: "expense",
      name: "ค่าผ่อนบ้าน",
      category: "housing",
      money: 17000,
      track_at: "2024-02-20T10:30:00Z",
    },
    {
      history_id: "11",
      method: "deposit",
      type: "saving_money",
      name: "เงินเกษียณ",
      category: "retirement",
      money: 10000,
      track_at: "2024-03-15T14:00:00Z",
    },
    {
      history_id: "12",
      method: "withdraw",
      type: "expense",
      name: "ค่าท่องเที่ยว",
      category: "leisure",
      money: 8000,
      track_at: "2024-03-25T19:00:00Z",
    },
  ];
  
    const [options, setOptions] = useState<{ item: string }[]>([]);
    const [selectedOption, setSelectedOption] = useState((new Date().getFullYear() + 543).toString());

    const [monthlyTotals, setMonthlyTotals] = useState<{ [key: string]: number }>({});

    const data = {
      labels: Object.keys(monthlyTotals), // เดือน
      datasets: [
        {
        data: Object.values(monthlyTotals), // จำนวนเงิน
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




      useEffect(() => {
        const filteredData = infoHistory.filter((item: { track_at: string; method: string; money: number }) => 
            (Number(item.track_at.slice(0, 4)) + 543).toString() === selectedOption
        );
    
        const monthlyData: MonthlyData = filteredData.reduce((acc: MonthlyData, item: InfoHistoryItem) => {
            const month = (Number(item.track_at.slice(5, 7))).toString();
            const amount = item.method === "deposit" ? item.money : -item.money;
            acc[month] = (acc[month] || 0) + amount;
            return acc;
        }, {});
    
        const currentYear = (new Date().getFullYear() + 543).toString(); // ปีปัจจุบันเป็น พ.ศ.
        const currentMonth = (new Date().getMonth() + 1).toString(); // เดือนปัจจุบัน
    
        if (selectedOption === currentYear) {
            if (!monthlyData[currentMonth]) {
                monthlyData[currentMonth] = 0;
            }
        } else {
            if (!monthlyData['1']) {
                monthlyData['1'] = 0;
            }
        }
    
        console.log('monthlyData', monthlyData);
        setMonthlyTotals(monthlyData);
    
        // ดึงปีจากข้อมูลและเปลี่ยนเป็น พ.ศ.
        const years = Array.from(
            new Set(infoHistory.map((item: { track_at: string }) => 
                (Number(item.track_at.slice(0, 4)) + 543).toString()
            ))
        ).map(year => ({ item: year as string })).reverse();
    
        // ถ้ายังไม่มีปีปัจจุบัน ให้เพิ่มเข้าไป
        if (!years.some(year => year.item === currentYear)) {
            years.unshift({ item: currentYear });
        }
    
        setOptions(years);
    }, [selectedOption, infoHistory]);
    





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
          // decorator={({ width, height }: { width: number; height: number }) => {
          //   const targetIndex = 205;
          //   return (
          //     <Svg>
          //       <Line
          //         x1={64}
          //         y1={targetIndex}
          //         x2={screenWidth}
          //         y2={targetIndex}
          //         stroke="#F68D2B"
          //         strokeWidth={2}
          //         opacity={0.8}
          //       />
          //     </Svg>
          //   );
          // }}
        />
        <Text style={{position:'absolute', right:0, bottom:0, fontFamily:'SarabunRegular'}} className='text-label'>เดือน</Text>
        <Text style={{position:'absolute', left:0, top:-30, fontFamily:'SarabunRegular'}} className='text-label'>เงิน(บาท)</Text>
        <View style={{position:'absolute', right:0, top:-30}}>
          <DropdownYearCustom options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        </View>
      </View>
    );
  };

  export default CustomGraph;