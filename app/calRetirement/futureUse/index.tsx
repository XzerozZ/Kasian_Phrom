import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import  TextF  from '../../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../../components/WideBtn';
import { useMemo } from 'react';

interface futureUseProps{
  isDarkMode: boolean;
  setStateFutureUse: (state: boolean) => void
  dataAssetInput: any;
  setDataAssetInput: (data: any) => void;
}
const futureUse: React.FC<futureUseProps> = ({ isDarkMode, setStateFutureUse, dataAssetInput, setDataAssetInput }) => {

  const scrollViewRef = useRef<ScrollView>(null);

  const [newDataAssetInput, setNewDataAssetInput] = useState({
    Name: '',
    Total_money: '',
    Monthly_expenses: '',
    End_year: '',
    type: 'home',
  })

  const categories = [
    { id: 1, tag:'home', label: 'บ้าน' },
    { id: 2, tag:'child', label: 'บุตร'},
    { id: 3, tag:'car', label: 'รถ' },
    { id: 4, tag:'travel', label: 'ท่องเที่ยว'},
    { id: 5, tag:'marry', label: 'แต่งงาน' },
    { id: 6, tag:'emergencyMoney', label: 'เงินฉุกเฉิน' },
    { id: 7, tag:'more', label: 'อื่นๆ'},
  ];
  const [isFully, setIsFully] = useState(false);
  const [type, setType] = useState('');
  const isMore = useMemo(() => !categories.some(category => category.tag === newDataAssetInput.type), [newDataAssetInput.type]);


  useEffect(() => {
    if (newDataAssetInput.Name !== '' && newDataAssetInput.Total_money !== '' && newDataAssetInput.End_year !== '' && newDataAssetInput.type !== '' ) {
      setIsFully(true);
    } else {
      setIsFully(false);
    }
  }, [newDataAssetInput]);


  useEffect(() => {
    if (isMore) {
      setNewDataAssetInput({ ...newDataAssetInput, type: type });
    }
  }, [type, isMore]);
  


  const handleSave = () => {
    setDataAssetInput((prevData: any[]) => [...prevData, newDataAssetInput]);
    setNewDataAssetInput({
      Name: '',
      Total_money: '',
      Monthly_expenses: '',
      End_year: '',
      type: 'home',
    });
    setType(''); 
    setStateFutureUse(false);
  };

  return (
    <View 
    id='CalRetirementFutureUse'
    style={{ position : 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, backgroundColor: 'white' }}
    className='flex-1 pt-10'>
      <View className='flex-row mt-3 ml-5 h-14 items-center'>
          <TouchableOpacity
              id='BtnBackToCalRetirementState3'
              activeOpacity={1}
              onPress={()=>setStateFutureUse(false)}
              className=''>
              <FontAwesome6 name="angle-left" size={28} color='#070F2D'/>
          </TouchableOpacity>
          <Text
          style={{ fontFamily: 'SarabunBold'}}
          className=' text-normalText text-2xl ml-3 h-12 pt-2'>เงินที่คาดว่าจะใช้ในอนาคต</Text>
      </View>
      <View className='w-full px-5 mt-3 border-b border-primary'></View>



      <ScrollView 
      id='ScrollViewFutureUse'
      ref={scrollViewRef} >
        <View className='flex px-5 mt-8 items-center'>
          <TextF className='text-primary'>วางแผนว่าในอนาคตจะใช้เงินกับอะไรเท่าไหร่?</TextF>
        </View>
        <View className='flex px-8 mt-5'>
          <View className='w-18 flex flex-row items-center'>
              <TextInput
                id='InputNameFutureUse'
                placeholder="ชื่อทรัพย์สิน"
                value={newDataAssetInput.Name}
                onChangeText={(text)=>setNewDataAssetInput({...newDataAssetInput, Name: text})}
                keyboardType='default'
                className={`h-14 text-lg text-normalText px-2 border-b border-label w-4/5`}/>
                <View className=" border-b border-label h-14 w-10 flex items-center justify-center">
                  <FontAwesome6 name="pen" size={12} color="#979797" />
                </View>
          </View>

        </View>
        <View className='px-5'>
          <View className='flex mt-5 bg-neutral rounded-xl px-3 shadow-sm border-[1px] border-neutral2'>
            <View className='flex flex-row  justify-between items-center h-16'>
              <View> 
                <TextF className='text-lg text-normalText'>ราคา</TextF>
              </View>
              <View className='w-18 flex flex-row justify-center items-center'>
                  <TextInput
                    id='InputTotalMoneyFutureUse'
                    placeholder='จำนวนเงิน'
                    keyboardType='numeric'
                    value={newDataAssetInput.Total_money}
                    onChangeText={(text)=>setNewDataAssetInput({...newDataAssetInput, Total_money: text})}
                    onBlur={() => {
                      const numericText = newDataAssetInput.Total_money.replace(/[^0-9]/g, '');
                      setNewDataAssetInput({ ...newDataAssetInput, Total_money: numericText });
                    }}
                    className={`h-16 text-end text-lg text-primary pr-2`}/>
                    <TextF className={` text-lg text-primary`}>บาท</TextF>
              </View>
            </View>

            <View className='w-full h-[1] bg-neutral2'></View>
            
            <View className='flex flex-row  justify-between items-center h-16'>
              <View> 
                <TextF className='text-lg text-normalText'>ปีที่จะใช้เงิน</TextF>
              </View>
              <View className='w-18 flex flex-row justify-center items-center'>
                <TextInput
                  id='InputEndYearFutureUse'
                  placeholder="ใส่ปีที่จะใช้"
                  maxLength={4}
                  keyboardType="numeric"
                  value={newDataAssetInput.End_year} // แสดงค่าปัจจุบัน
                  onChangeText={(text) => {
                    setNewDataAssetInput({ ...newDataAssetInput, End_year: text });
                  }}
                  onBlur={() => {
                    const numericText = newDataAssetInput.End_year.replace(/[^0-9]/g, ''); // กรองเฉพาะตัวเลข
                    const currentYear = new Date().getFullYear() + 543; // ปี พ.ศ.
                    const validatedValue = parseInt(numericText, 10);
                    const finalValue =
                      !isNaN(validatedValue) && validatedValue < currentYear
                        ? String(currentYear)
                        : numericText;
                    setNewDataAssetInput({ ...newDataAssetInput, End_year: finalValue });
                  }}
                  className="h-16 text-end text-lg text-primary pr-2"
                />
              </View>
            </View>
          </View>
        </View>
        
        <View className='px-5'>
          <TextF className='text-lg text-normalText mt-8'>ประเภท</TextF>
          <View 
          style={{position:'relative'}}
          className="flex mt-5 bg-neutral rounded-xl shadow-sm h-72 border-[1px] border-neutral2">
            <View 
            style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
              <View className='w-full border-b h-[60] border-neutral2'></View>
              <View className='w-full border-b h-[60] border-neutral2'></View>
              <View className='w-full border-b h-[60] border-neutral2'></View>
            </View>
            <View 
            style={{position:'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
              <View className='h-[180] w-1/2 border-r border-neutral2'></View>
            </View>

            <View className="flex-wrap flex-row">

              {categories.slice(0, 6).map((category) => (
                <TouchableOpacity
                  id={'BtnCategory'+category.tag}
                  key={category.id}
                  activeOpacity={1}
                  onPress={() => setNewDataAssetInput({ ...newDataAssetInput, type: category.tag })}
                  className="flex-row items-center p-2 w-1/2 h-[60] pl-5"
                >
                  <View className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    {category.tag == newDataAssetInput.type && <View className="w-[10] h-[10] rounded-full bg-accent" />}
                  </View>
                  <View className='w-12 justify-center items-center'>
                    {category.tag == 'home' && <FontAwesome6 name="house-chimney" size={18} color="#070F2D" /> }
                    {category.tag == 'child' && <MaterialIcons name="child-friendly" size={23} color="#070F2D" /> }
                    {category.tag == 'car' && <FontAwesome6 name="car" size={18} color="#070F2D" /> }
                    {category.tag == 'travel' && <FontAwesome6 name="plane-departure" size={18} color="#070F2D" /> }
                    {category.tag == 'marry' && <Ionicons name="heart" size={22} color="#070F2D" /> }
                    {category.tag == 'emergencyMoney' && <FontAwesome5 name="hospital-alt" size={18} color="#070F2D" /> }
                  </View>
                  <TextF className=" text-normalText">{category.label}</TextF>
                </TouchableOpacity>
              ))}

              <TouchableOpacity 
                id='BtnCategoryMore'
                activeOpacity={1}
                onPress={() => setNewDataAssetInput({ ...newDataAssetInput, type: type})}
                className="flex-row items-center p-2 w-full h-[60]  pl-5">
                <View className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                  {isMore && <View className="w-[10] h-[10] rounded-full bg-accent" />}
                </View>
                <TextInput
                  id='InputCategoryMore'
                  placeholder="อื่นๆ"
                  className="ml-2 border-b-[1px] border-neutral2 flex-1 h-10 mr-5"
                  value={type}
                  onChangeText={(text) => setType(text)}
                  onFocus={() => {
                    scrollViewRef.current?.scrollTo({
                          y: 260,
                          animated: true,
                      });
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className='h-96'></View>

        </ScrollView>
        <View
        className=' h-14 flex flex-row justify-center items-center mb-20 px-5 gap-2 bg-none'>
          <TouchableOpacity
          id='BtnCancelFutureUse'
          onPress={()=>setStateFutureUse(false)}
          className='flex-1 h-14 rounded-lg border border-err justify-center items-center'>
            <TextF className='text-err text-lg'>ยกเลิก</TextF>
          </TouchableOpacity>
          <TouchableOpacity 
          id='BtnSaveFutureUse'
          onPress={ isFully ? handleSave : () => {}}
          className={`flex-1 h-14 rounded-lg justify-center items-center ${isFully ? 'bg-primary':'bg-unselectMenu'}`}>
            <TextF className='text-neutral text-lg'>บันทึก</TextF>
          </TouchableOpacity>
        </View>
      </View>
     
  )
}

export default futureUse


// Removed local useMemo function to resolve conflict with imported useMemo from 'react'
