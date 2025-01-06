import { Link, useRouter } from 'expo-router';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { theme } from '../globalStyle';
const Logo = require('../assets/images/logo.png')


export default function LoadingPage() {

  const [stateLogo, setStateLogo] = useState(true);
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade out animation
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // 1-second fade-out
        useNativeDriver: true,
      }).start(() => setStateLogo(false)); // Hide logo after animation
    }, 2000);

    // Navigate to the main page after 3 seconds
    setTimeout(() => {
      router.replace('/mainComponent');
    }, 2500);
  }, []);

  return (
    <View 
    className={`flex-1 justify-center items-center h-screen gap-5 bg-bgAuth`}>
      {/* <View className={stateLogo?'w-full flex items-center gap-5 duration-1000':'w-auto flex items-center gap-5 opacity-0 duration-1000'}>
        <Image source={Logo} style={outStyles.image}/>
      </View> */}
      {stateLogo && (
        <Animated.View style={{ opacity: fadeAnim }} className="w-full flex items-center gap-5 duration-1000">
          <Image source={Logo} style={outStyles.image}/>
        </Animated.View>
      )}
    </View>
  );
}
const outStyles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});