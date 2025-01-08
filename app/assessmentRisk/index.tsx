import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../components/TextF';
import RiskForm from './riskForm';
import RiskResult from './riskResult';
import RiskForm from './riskForm';
import RiskResult from './riskResult';


interface AssessmentRiskProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const AssessmentRisk: React.FC<AssessmentRiskProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  useEffect(() => {
      setStateNavbar(false)
    }, [])

    const [stateAssessed, setStateAssessed] = useState(false);

  useEffect(() => {
      setStateNavbar(false)
    }, [])

    const [stateAssessed, setStateAssessed] = useState(false);

  return (
    <View className='flex-1 bg-neutral w-full mt-5'>
      {stateAssessed?<RiskResult isDarkMode={isDarkMode} setStateNavbar={setStateNavbar} setStateAssessed={setStateAssessed} setActiveTab={setActiveTab}/>:<RiskForm isDarkMode={isDarkMode} setStateNavbar={setStateNavbar} setStateAssessed={setStateAssessed} setActiveTab={setActiveTab}/>}
    </View>
  )
}

export default AssessmentRisk