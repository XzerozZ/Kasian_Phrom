import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated } from 'react-native';



interface ProfileProps{
  isDarkMode: boolean;
}
const Profile: React.FC<ProfileProps> = ({ isDarkMode }) => {
  return (
    <View className='flex-1'>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile