import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import  TextF  from '../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../components/WideBtn';



interface stateProps{
  isDarkMode: boolean;
  setState: (state: number) => void
  dataAssetInput: any;
  setStateFutureUse: (state: boolean) => void;
  setDataAssetInput: (data: any) => void;
}
const state3: React.FC<stateProps> = ({ isDarkMode, setState, dataAssetInput, setStateFutureUse, setDataAssetInput }) => {

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isFully, setIsFully] = useState(false);







  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 200, // เวลา 0.3s
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200, // เวลา 0.3s
      useNativeDriver: true,
    }).start();
  };




  return (
    <View className='flex-1'>
      <View className='bg-neutral2 rounded-3xl pb-10 px-5 mb-5'>
        <View 
        style={{minHeight: 450}}
        className='flex mt-5'>
          <TextF className='text-normalText text-lg mt-5'>เลือกวางแผนสำหรับอนาคต</TextF>
          <TextF className='text-label mt-1'>วางแผนว่าในอนาคตจะใช้เงินกับอะไรเท่าไหร่?</TextF>
          <View className='gap-5 mt-5'>
          {dataAssetInput.map((data: any, index: number) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                key={index}
                className="flex"
              >
                <View
                  className="flex bg-neutral rounded-xl py-4 flex-row items-center justify-between px-2"
                >
                  <View className="flex flex-row gap-2">
                    <View className="mx-1 mt-[2]">
                      <FontAwesome6 name="house-chimney" size={18} color="#070F2D" />
                    </View>
                    <View className="flex gap-3">
                      <TextF className="text-normalText text-lg">{data.Name}</TextF>
                      <TextF className="text-normalText text-lg">
                        {data.Total_money} บาท
                      </TextF>
                    </View>
                  </View>

                  <View className="flex flex-row gap-2">
                    <View className="flex gap-3 items-end">
                      <TextF className="text-normalText text-lg">ปีที่จะซื้อ</TextF>
                      <TextF className="text-normalText text-lg">{data.End_year}</TextF>
                    </View>
                    <View className="mx-1">
                      <FontAwesome6 name="pen" size={12} color="#F68D2B" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

        </View>
        <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => setStateFutureUse(true)}
      >
        <Animated.View
          style={[
            { transform: [{ scale: scaleAnim }] },
          ]}
          className='flex mt-8 h-20 border border-primary rounded-xl items-center justify-center border-dashed'>
          <TextF className='text-xl text-primary'>เพิ่ม</TextF>
        </Animated.View>
      </TouchableWithoutFeedback>
        


        <View className='h-20 '></View>
      </View>
    </View>

    <WideBtn activeOpacity={1} text='ถัดไป' disabled={false} onPress={()=>setState(4)}/>
</View>
  )
}

export default state3