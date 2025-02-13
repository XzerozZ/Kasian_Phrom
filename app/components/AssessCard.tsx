import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Port from '../../Port';
import assessResult from '../assessmentRisk/results';
import TextF from './TextF';

interface AssessCardProps {
  setActiveTab: (tab: string) => void;
  setGoAuth: (state: boolean) => void;
};

const AssessCard: React.FC<AssessCardProps> = ({ setActiveTab, setGoAuth }) => {
  const [riskId, setRiskId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fadeAnim = useRef(new Animated.Value(0)).current; // สร้างค่าเริ่มต้น opacity = 0
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const fetchRiskId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setIsAuth(false);
          return;
        }
        setIsAuth(true)
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

  if (isLoading) {
    return <View className="h-32" />;
  }

  return (
    <Animated.View 
      id='AssessCardContainer'
      style={{ opacity: fadeAnim }}
      className='bg-neutral pb-0 rounded-2xl border border-banner mt-5 overflow-hidden'
    >
      {selectedRisk ? (
        <TouchableOpacity 
          id='BtnCardSelectedRisk'
          activeOpacity={1}
          onPress={() => setActiveTab('assessmentRisk')}
        >
          <View className='flex h-32 justify-center gap-1'>
            <TextF className='text-center text-primary2 text-lg mt-2 py-2'>คุณคือผู้ลงทุนประเภท</TextF>
            <View id='AssessCardSelectedRisk' className='h-14 justify-center items-center'>
              <Text 
                className={`text-2xl h-14 flex justify-center items-center pt-2`} 
                style={{ color: selectedRisk.textColor, fontFamily: 'SarabunBold' }}
              >
                {selectedRisk.label}
              </Text>
            </View>
          </View>
          <View className='flex-row items-center bg-neutral2 pr-4'> 
            <Text className='text-end text-primary py-3 pr-3 ml-auto' style={{ fontFamily: 'SarabunBold' }}>ดูรายละเอียด</Text>
            <FontAwesome6 name="play" size={15} color={'#2A4296'} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity  
          id='BtnCardNoRisk'
          activeOpacity={1}
          onPress={() => isAuth?setActiveTab('assessmentRisk'):setGoAuth(true)}

        >
          <View className='flex h-32 justify-center gap-1 px-5'>
            <Text className={`text-center text-2xl py-2`} style={{ color:'#2A4296', fontFamily: 'SarabunBold' }}>
              คุณยังไม่ได้ทำการประเมินความเสี่ยงที่รับได้ในการลงทุน
            </Text>
          </View>
          <View className='flex-row items-center bg-neutral2 pr-4'> 
            <Text className='text-end text-primary py-3 pr-3 ml-auto' style={{ fontFamily: 'SarabunBold' }}>{isAuth?'ทำแบบประเมินความเสี่ยง':'เข้าสู่ระบบเพื่อทำแบบประเมินความเสี่ยง'}</Text>
            <FontAwesome6 name="play" size={15} color={'#2A4296'} />
          </View>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default AssessCard;
