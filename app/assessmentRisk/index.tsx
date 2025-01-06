import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';



interface AssessmentRiskProps{
  isDarkMode: boolean;
}
const AssessmentRisk: React.FC<AssessmentRiskProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <Text>AssessmentRisk</Text>
    </View>
  )
}

export default AssessmentRisk