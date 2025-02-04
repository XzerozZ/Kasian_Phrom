import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native';
import  TextF  from '../components/TextF';
import HeadTitle from '../components/headTitle';
import WideBtn from '../components/WideBtn';
import assessResult from './results';
import PieChart from 'react-native-pie-chart/v3api'

interface RiskResultProps {
  setStateAssessed: (state: boolean) => void;
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const RiskResult: React.FC<RiskResultProps> = ({ setActiveTab, setStateAssessed , isDarkMode, setStateNavbar}) => {
  const handleSubmit = () => {
    console.log('pop up asking if the user insist to delete an old assessment and make a new one.');
    setStateAssessed(false);
  }

  const [riskId, setRiskId] = useState<number>(4);

  const selectedRisk = assessResult.find((item) => item.id === riskId);

  const widthAndHeight = 230;
  
  return (
    <>
      <HeadTitle 
      id='RiskResultContainer'
      setActiveTab={setActiveTab} 
      title='ผลการประเมิน' 
      onPress={()=>setActiveTab('finance')}/>
      <View className='w-full px-5 mt-3 border-b border-unselectInput'></View>
      <ScrollView className='flex-1 bg-neutral w-full pt-5' showsVerticalScrollIndicator={false}>
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
            <View className="flex-row items-center justify-between">
              <View className={`w-5 h-5 rounded mr-3`} style={{backgroundColor: '#2C8C3A'}} />
              <TextF className="flex-1 text-base text-normalText">กองทุนรวมตลาดเงินที่ลงทุนภายในประเทศ</TextF>
              <TextF className="text-base text-normalText">{selectedRisk.investPercent[0]}%</TextF>
            </View>
            <View className="flex-row items-center justify-between">
              <View className={`w-5 h-5 rounded mr-3`} style={{backgroundColor: '#9CB714'}} />
              <TextF className="flex-1 text-base text-normalText">กองทุนรวมพันธบัตรรัฐบาลระยะสั้น</TextF>
              <TextF className="text-base text-normalText">{selectedRisk.investPercent[1]}%</TextF>
            </View>
            <View className="flex-row items-center justify-between">
              <View className={`w-5 h-5 rounded mr-3`} style={{backgroundColor: '#FFC100'}} />
              <TextF className="flex-1 text-base text-normalText">กองทุนรวมตราสารหนี้ระยะยาว</TextF>
              <TextF className="text-base text-normalText">{selectedRisk.investPercent[2]}%</TextF>
            </View>
            <View className="flex-row items-center justify-between">
                <View className={`w-5 h-5 rounded mr-3`} style={{backgroundColor: '#F08417'}} />
                <TextF className="flex-1 text-base text-normalText">กองทุนรวมตราสารทุน</TextF>
                <TextF className="text-base text-normalText">{selectedRisk.investPercent[3]}%</TextF>
            </View>
            <View className="flex-row items-center justify-between">
                <View className={`w-5 h-5 rounded mr-3`} style={{backgroundColor: '#D4333F'}} />
                <TextF className="flex-1 text-base text-normalText">กองทุนรวมทองคำ</TextF>
                <TextF className="text-base text-normalText">{selectedRisk.investPercent[4]}%</TextF>   
            </View>
          </View>
          
          
          <View className='flex-1 mt-8 px-5 mb-5'>
            <TextF className='text-normalText text-lg'>
                ผลตอบแทนที่คาดว่าจะได้รับ (ต่อปี)
            </TextF>
            <View className='flex-row justify-between gap-4 mt-5'>
              <View className='flex-1 py-3 border border-banner rounded-xl items-center'>
                <TextF className={`text-base color-primary2`}>สูงสุด</TextF>
                <Text className="text-lg text-normalText mt-2" style={{fontFamily: 'SarabunBold'}}>
                  {selectedRisk.expectReturn[0]}
                </Text>
              </View>
              <View className='flex-1 py-3 border border-banner rounded-xl items-center'>
                <TextF className={`text-base color-primary2`}>เฉลี่ย</TextF>
                <Text className="text-lg text-normalText mt-2" style={{fontFamily: 'SarabunBold'}}>
                  {selectedRisk.expectReturn[1]}
                </Text>
              </View>
              <View className='flex-1 py-3 border border-banner rounded-xl items-center'>
                <TextF className={`text-base color-primary2`}>ต่ำสุด</TextF>
                <Text className="text-lg text-normalText mt-2" style={{fontFamily: 'SarabunBold'}}>
                  {selectedRisk.expectReturn[2]}
                </Text>
              </View>
            </View>
          </View>
        </>
        ) : (
          <TextF className="text-center text-red-500 text-lg">
            ไม่พบข้อมูลผลการประเมิน
          </TextF>
        )}

        <WideBtn
          id='BtnRiskResult'
          text="ทำแบบประเมินความเสี่ยงอีกครั้ง"
          disabled={false} // no need to disable
          onPress={handleSubmit}
        />
      </ScrollView>
    </>
  )
}

export default RiskResult
