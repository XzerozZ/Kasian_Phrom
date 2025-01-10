import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import  TextF  from './TextF';

interface FinanceCardProps{
  id: number;
  imgUrl: string;
  title: string;
  date: string;
  onPress: () => void;
}

const FinanceCard: React.FC<FinanceCardProps> = ({ id, imgUrl, title, date, onPress }) => {
  
  return (
  <>
    <TouchableOpacity
    activeOpacity={1}
    className="flex-row bg-neutral py-5"
    onPress={onPress}>
      <Image
        source={{ uri: imgUrl }}
        className="max-w-52 w-1/2 aspect-video rounded-md"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3">
        <TextF className="text-lg text-normalText">{title}</TextF>
        <TextF className="text-sm self-end ml-auto text-label mt-auto">{date}</TextF>
      </View>
    </TouchableOpacity>
    <View className="flex px-4 h-[1] bg-unselectInput" />
  </>
  );
};

export default FinanceCard;