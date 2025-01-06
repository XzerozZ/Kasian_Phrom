import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, ScrollView } from 'react-native';
import { theme } from '../../globalStyle';

import Navbar from '../components/Navbar';
import Main from '../page/main';
import NursingHouses from '../page/nursingHouses';
import Dashboard from '../page/dashboard';
import Finance from '../page/finance';
import Profile from '../page/profile';





function index() {

  const [stateNavbar, setStateNavbar] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const styles = isDarkMode ? theme.dark : theme.light;
  const [activeTab, setActiveTab] = useState('dashboard');






  return (
    <View className={`flex-1 justify-between items-center ${styles.container}`}>
      <View className='w-full pt-10 flex-1 h-40'>
        
        {activeTab =='main' && <Main isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='nursingHouses' && <NursingHouses isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='dashboard' && <Dashboard isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='finance' && <Finance isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
        {activeTab =='profile' && <Profile isDarkMode={isDarkMode} setActiveTab={setActiveTab} setStateNavbar={setStateNavbar}/>}
      </View>
      {stateNavbar &&
      <View className='w-full'>
        <Navbar isDarkMode={isDarkMode} activeTab={activeTab} setActiveTab={setActiveTab}/>
      </View>}
    </View>
  )
}

export default index