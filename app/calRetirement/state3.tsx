import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import  TextF  from '../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../components/WideBtn';
import { useNumberFormat } from "@/app/NumberFormatContext";

interface delTo {
  asset_id: string;
  giveTo:{
    type: string;
    name: string;
    amount: number;
  }
}
interface AssetItem {
  Name: string;
  Total_money: number;
  End_year: number;
  type: string;
  Status: string;
  current_money: number;
}

interface GroupedAssets {
  [key: string]: AssetItem[];
}

interface stateProps{
  isDarkMode: boolean;
  setState: (state: number) => void
  dataAssetInput: any;
  setStateFutureUse: (state: boolean) => void;
  setDataAssetInput: (data: any) => void;
  setDataEditAsset: (data: number) => void;
  setDelToAsset: React.Dispatch<React.SetStateAction<delTo[]>>;
}
const state3: React.FC<stateProps> = ({ isDarkMode, setState, dataAssetInput, setStateFutureUse, setDataAssetInput, setDataEditAsset, setDelToAsset }) => {

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isFully, setIsFully] = useState(false);
  const { addCommatoNumber } = useNumberFormat();







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

  const handleEditAsset = (item: AssetItem) => {
    const assetIndex = dataAssetInput.findIndex((asset: AssetItem) => asset.Name === item.Name);
    console.log(assetIndex)
    if (assetIndex !== -1) {
      setStateFutureUse(true);
      setDataEditAsset(assetIndex);
    }
  };



  return (
    <View 
    id='CalRetirementState3'
    className='flex-1'>
      <View className='bg-neutral2 rounded-3xl pb-10 px-5 mb-5'>
        <View 
        style={{minHeight: 450}}
        className='flex mt-5'>
          <TextF className='text-normalText text-lg mt-5'>เลือกวางแผนสำหรับอนาคต</TextF>
          <TextF className='text-label mt-1'>วางแผนว่าในอนาคตจะใช้เงินกับอะไรเท่าไหร่?</TextF>
          <View className='gap-5 mt-5'>
              {Object.entries(
                dataAssetInput.reduce((acc: GroupedAssets, item: AssetItem) => {
                  if (!acc[item.type]) acc[item.type] = [];
                  acc[item.type].push(item);
                  return acc;
                }, {} as GroupedAssets)
              ).map(([type, items]) => (
                <View key={type} className="mb-4 gap-3">
                  <View className="flex flex-row gap-3 items-center mb-2">
                    {type === 'home' && <FontAwesome6 name="house-chimney" size={18} color="#070F2D" />}
                    {type === 'child' && <MaterialIcons name="child-friendly" size={23} color="#070F2D" />}
                    {type === 'car' && <FontAwesome6 name="car" size={18} color="#070F2D" />}
                    {type === 'travel' && <FontAwesome6 name="plane-departure" size={18} color="#070F2D" />}
                    {type === 'marry' && <Ionicons name="heart" size={22} color="#070F2D" />}
                    {type === 'emergencyMoney' && <FontAwesome5 name="hospital-alt" size={18} color="#070F2D" />}
                    <TextF className='text-xl font-bold'>
                      {type === 'home' && 'บ้าน'}
                      {type === 'child' && 'บุตร'}
                      {type === 'car' && 'รถ'}
                      {type === 'travel' && 'ท่องเที่ยว'}
                      {type === 'marry' && 'แต่งงาน'}
                      {type === 'emergencyMoney' && 'เงินฉุกเฉิน'}
                      {type !== 'home' && type !== 'child' && type !== 'car' && type !== 'travel' && type !== 'marry' && type !== 'emergencyMoney' && type}
                    </TextF>
                  </View>
                  <View className='gap-4'>
                    {(items as AssetItem[]).map((item: AssetItem) => (
                      <TouchableOpacity 
                      id='AssetItem'
                      key={item.Name} 
                      activeOpacity={1} 
                      onPress={() => handleEditAsset(item)}
                      className="flex">
                        <View className={` rounded-xl py-4 px-4 gap-2 bg-neutral`}>
                          <View className="flex flex-row gap-2 w-full justify-between items-center">
                            <TextF className="text-normalText text-lg py-1 font-bold">{item.Name}</TextF>
                            <View className="mx-1 flex flex-row gap-2 items-center">
                              <View className={ `px-3 rounded-lg ${item.Status?'bg-primary2':'bg-unselectMenu'}`}>
                                <TextF className=" text-neutral text-lg py-1">{item.Status?'ดำเนินการ':'หยุดพัก'}</TextF>
                              </View>
                              {/* <FontAwesome6 name="pen" size={12} color="#F68D2B" /> */}
                            </View>
                          </View>
                          <View className="flex flex-row gap-2 w-full justify-between items-center">
                            <TextF className="text-normalText text-lg py-1">ราคา</TextF>
                            <TextF className="text-primary text-lg py-1">{addCommatoNumber(item.Total_money)} <TextF className='text-normalText'>บาท</TextF></TextF>
                          </View>
                          <View className="flex flex-row gap-2 w-full justify-between items-center">
                            <TextF className="text-normalText text-lg py-1">ออมเงินไปแล้ว</TextF>
                            <TextF className="text-primary text-lg py-1">{addCommatoNumber(item.current_money)} <TextF className='text-normalText'>บาท</TextF></TextF>
                          </View>
                          <View className="flex flex-row gap-2 w-full justify-between items-center">
                            <TextF className="text-normalText text-lg py-1">ปีที่ต้องการใช้เงิน</TextF>
                            <TextF className="text-normalText text-lg py-1">{item.End_year}</TextF>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}

        </View>
        <TouchableWithoutFeedback
        id='AddAsset'
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

    <WideBtn id='BtnNextToState4' activeOpacity={1} text='ถัดไป' disabled={false} onPress={()=>setState(4)}/>
</View>
  )
}

export default state3


