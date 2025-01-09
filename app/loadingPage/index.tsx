import { Link, useRouter } from 'expo-router';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { theme } from '../../globalStyle';
const Logo = require('../../assets/images/logo.png')

interface LoadingPageProps{
  stateLoading: boolean;
  setStateLoading: (state: boolean) => void;
  setLoading: (state: boolean) => void;
}

const LoadingPage:React.FC<LoadingPageProps> = ({stateLoading, setStateLoading, setLoading}) =>{

  const [stateLogo, setStateLogo] = useState(true);
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!stateLoading) {
      
      setTimeout(() => {
        Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setStateLogo(false)); 
      }, 500);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    setTimeout(() => {

    }, 2500);
  }, []);

  return (
    <View 
    style={outStyles.loadingPage}
    className={`flex-1 justify-center items-center h-screen gap-5 bg-bgAuth`}>
      {/* <View className={stateLogo?'w-full flex items-center gap-5 duration-1000':'w-auto flex items-center gap-5 opacity-0 duration-1000'}>
        <Image source={Logo} style={outStyles.image}/>
      </View> */}
      {stateLogo && (
        <Animated.View style={{ opacity: fadeAnim }} className="w-full flex items-center gap-5 duration-1000">
          <Image 
          source={Logo} 
          style={{objectFit: 'contain'}}
          className='w-40 h-40 '/>
        </Animated.View>
      )}
    </View>
  );
}

export default LoadingPage;

const outStyles = StyleSheet.create({
  loadingPage: {
    position: 'absolute', 
    top: 0, 
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
});