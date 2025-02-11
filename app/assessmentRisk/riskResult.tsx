import React, { useEffect, useState, useRef } from 'react';
import { Animated, View, Text } from 'react-native';
import TextF from '../components/TextF';
import HeadTitle from '../components/headTitle';
import WideBtn from '../components/WideBtn';
import assessResult from './results';
import PieChart from 'react-native-pie-chart/v3api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Port from '../../Port';

interface RiskResultProps {
  setStateAssessed: (state: boolean) => void;
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}

const RiskResult: React.FC<RiskResultProps> = ({ setActiveTab, setStateAssessed, isDarkMode, setStateNavbar }) => {
  const [riskId, setRiskId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fadeAnim = useRef(new Animated.Value(0)).current; // เริ่มต้น opacity = 0

  useEffect(() => {
    const fetchRiskId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${Port.BASE_URL}/quiz`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Network response was not ok");
        }

        const data = await response.json();
        console.log('Fetched riskId:', data.result.Risk.risk_id);
        setRiskId(data.result.Risk.risk_id);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiskId();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  const selectedRisk = assessResult.find((item) => item.id === riskId);

  const widthAndHeight = 230;

  return (
    <>
      <HeadTitle 
        id='RiskResultContainer'
        setActiveTab={setActiveTab} 
        title='ผลการประเมิน' 
        onPress={() => setActiveTab('finance')}
      />
      <View className='w-full px-5 mt-3 border-b border-unselectInput'></View>

      <Animated.ScrollView 
        className='flex-1 bg-neutral w-full pt-5'
        showsVerticalScrollIndicator={false}
        style={{ opacity: fadeAnim }} 
      >
        <TextF className='text-center text-primary2 text-lg'>คุณคือผู้ลงทุนประเภท</TextF>
        {selectedRisk ? (
          <>
            <Text className={`text-center text-2xl m-5 mt-3 h-12 pt-2`} style={{ color: selectedRisk.textColor, fontFamily: 'SarabunBold'}}>
              {selectedRisk.label}
            </Text>

            <View className='mt-2 flex justify-center items-center bg-neutral mx-5 p-4 rounded-3xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
              <View className='flex w-9/12 max-w-96 max-h-96 my-4 items-center justify-center aspect-square'>
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={selectedRisk.investPercent}
                  sliceColor={['#2C8C3A', '#9CB714', '#FFC100', '#F08417', '#D4333F']}
                />
              </View>
              <View className='flex w-full items-end '>
                <TextF className='text-label mr-5 text-sm'>กราฟแสดงสัดส่วนการลงทุนที่แนะนำ</TextF>
              </View>
            </View>

            <View className='px-5 mt-8 gap-5'>
              {selectedRisk.investPercent.map((percent, index) => {
                const colors = ['#2C8C3A', '#9CB714', '#FFC100', '#F08417', '#D4333F'];
                const labels = [
                  'กองทุนรวมตลาดเงินที่ลงทุนภายในประเทศ',
                  'กองทุนรวมพันธบัตรรัฐบาลระยะสั้น',
                  'กองทุนรวมตราสารหนี้ระยะยาว',
                  'กองทุนรวมตราสารทุน',
                  'กองทุนรวมทองคำ',
                ];
                return (
                  <View key={index} className="flex-row items-center justify-between">
                    <View className={`w-5 h-5 rounded mr-3`} style={{backgroundColor: colors[index]}} />
                    <TextF className="flex-1 text-base text-normalText">{labels[index]}</TextF>
                    <TextF className="text-base text-normalText">{percent}%</TextF>
                  </View>
                );
              })}
            </View>

            <View className='flex-1 mt-8 px-5 mb-5'>
              <TextF className='text-normalText text-lg'>ผลตอบแทนที่คาดว่าจะได้รับ (ต่อปี)</TextF>
              <View className='flex-row justify-between gap-4 mt-5'>
                {['สูงสุด', 'เฉลี่ย', 'ต่ำสุด'].map((label, index) => (
                  <View key={index} className='flex-1 py-3 border border-banner rounded-xl items-center'>
                    <TextF className={`text-base color-primary2`}>{label}</TextF>
                    <Text className="text-lg text-normalText mt-2" style={{fontFamily: 'SarabunBold'}}>
                      {selectedRisk.expectReturn[index]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <TextF className="text-center text-red-500 text-lg">ไม่พบข้อมูลผลการประเมิน</TextF>
        )}

        <WideBtn
          id='BtnRiskResult'
          text="ทำแบบประเมินความเสี่ยงอีกครั้ง"
          disabled={false} // ไม่ต้อง disable
          onPress={() => setStateAssessed(false)}
        />
      </Animated.ScrollView>
    </>
  );
}

export default RiskResult;
