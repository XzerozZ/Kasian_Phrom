import React, { useEffect, useState, useRef } from 'react'; 
import { Animated } from 'react-native';
import RiskForm from './riskForm';
import RiskResult from './riskResult';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Port from '../../Port';

interface AssessmentRiskProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}

const AssessmentRisk: React.FC<AssessmentRiskProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  const [riskId, setRiskId] = useState<number | null>(null);
  const [stateAssessed, setStateAssessed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setStateNavbar(false);
  }, []);

  useEffect(() => {
    const fetchRiskId = async () => {
      try {
        setIsLoading(true);
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
        setStateAssessed(!!data.result.Risk.risk_id);
      } catch (error) {
        console.error('Error fetching riskId:', error);
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
        duration: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      {stateAssessed ? (
        <RiskResult 
          isDarkMode={isDarkMode} 
          setStateNavbar={setStateNavbar} 
          setStateAssessed={setStateAssessed} 
          setActiveTab={setActiveTab} 
        />
      ) : (
        <RiskForm 
          isDarkMode={isDarkMode} 
          setStateNavbar={setStateNavbar} 
          setStateAssessed={setStateAssessed} 
          setActiveTab={setActiveTab} 
        />
      )}
    </Animated.View>
  );
}

export default AssessmentRisk;