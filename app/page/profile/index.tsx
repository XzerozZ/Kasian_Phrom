import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import  TextF  from '../../components/TextF';


interface ProfileProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Profile: React.FC<ProfileProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  return (
    <View className='flex-1'>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile