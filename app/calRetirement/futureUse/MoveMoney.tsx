import React, { useEffect, useState, useRef } from 'react';
import { View,Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import Svg, { Defs, ClipPath, Path, Rect, Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Port from '@/Port';
import { BlurView } from 'expo-blur';
import TextF from '../../components/TextF';
import DropdownCustom from '../../components/DropdownCustom';
import { CheckBox } from '@rneui/themed';
import { useNumberFormat } from "@/app/NumberFormatContext";

interface delTo {
  asset_id: string;
  giveTo:{
    type: string;
    name: string;
    amount: number;
  }
}
interface MoveMoneyProps{
  onClose: () => void;
  newDataAssetInput: any;
  delToAsset: delTo[];
  setDelToAsset: React.Dispatch<React.SetStateAction<delTo[]>>;
  handleDelAsset: () => void;
}
const MoveMoney: React.FC<MoveMoneyProps> = ({ onClose, newDataAssetInput, delToAsset, setDelToAsset, handleDelAsset }) => {
  const { addCommatoNumber } = useNumberFormat();
  const [statePage, setStatePage] = useState(0);
  const [selectedOptionPriority, setSelectedOptionPriority] = useState('');
  const [amount, setAmount] = useState('');
  const [editMoveMoney, setEditMoveMoney] = useState<delTo | null>(null); // ใช้เพื่อแก้ไขการโอนเงิน
  
  const [optionsPriority, setOptionsPriority] = useState([
      {title:'เงินเกษียณ'},
  ]);
  const [isSelected, setSelection] = useState(false);
  const [isFill, setIsFill] = useState(false);

  const [dataAssetNow, setDataAssetNow] = useState<{ asset_id: string; Name: string; Total_money: string; End_year: string; type: string; Status: string; current_money: string; }[]>([]);
  const [isHaveHome, setIsHaveHome] = useState(false);
  const [stateConfirm, setStateConfirm] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const responseAsset = await fetch(`${Port.BASE_URL}/asset`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseHouse = await fetch(`${Port.BASE_URL}/user/selected`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataAsset = await responseAsset.json();
        const dataHouse = await responseHouse.json();
        if (dataAsset.result !== null) {
          console.log('dataAsset.result:', JSON.stringify(dataAsset.result, null, 2))
          const assets = dataAsset.result.map((item: any) => ({
            asset_id: item.asset_id,
            Name: item.name,
            Total_money: item.total_cost.toString(),
            End_year: (parseInt(item.end_year)+543).toString(),
            type: item.type,
            Status: item.status,
            current_money: item.current_money,
          }));
          setDataAssetNow(assets.filter((item: any) => item.Status === 'In_Progress'));
        }
        if (dataHouse.result.NursingHouse.nh_id !== '00001' && dataHouse.result.status === 'In_Progress') {
          setIsHaveHome(true);
        }

        setSelectedOptionPriority(optionsPriority[0].title);

      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);




  const setOption = () => {
    if (optionsPriority.length === 0) {
      return;
    }
    setOptionsPriority((prev) => {
      let newOptions = [...prev];

      if ( !prev.some(opt => opt.title === 'เงินเกษียณ')) {
        newOptions.unshift({ title: 'เงินเกษียณ' });
      }
      
      if (isHaveHome && !prev.some(opt => opt.title === 'บ้านพักคนชรา')) {
        newOptions.push({ title: 'บ้านพักคนชรา' });
      }
      
      dataAssetNow.forEach((item) => {
        if (!prev.some(opt => opt.title === item.Name)) {
          newOptions.push({ title: item.Name });
        }
      });
      const setOption = newOptions.filter((item) => 
        !delToAsset.find((asset) => asset.giveTo.name === item.title)
      ).filter((item) => item.title !== newDataAssetInput.Name);

      console.log('setOption--------------***********',setOption)
      setSelectedOptionPriority(setOption[0].title)
      return setOption;
    });
  
  }




  const handleAddMoneyToMove = () => {
    
    setDelToAsset((prev) => {
      
      let newDelTo = [...prev];
      newDelTo.push({
        asset_id: newDataAssetInput.asset_id,
        giveTo: {
          type: selectedOptionPriority,
          name: selectedOptionPriority,
          amount: parseInt(amount),
        },
      });
      return newDelTo;
    });
    setStatePage(0)
    resetFrom()
  };

  const resetFrom = () => {
    setIsFill(false);
    setAmount('');
    setEditMoveMoney(null)
  }
  

 useEffect(() => {
  if (isFill){
    if (editMoveMoney !== null){
      setAmount((newDataAssetInput.current_money - delToAsset.reduce((acc, item) => acc + item.giveTo.amount, 0) + editMoveMoney.giveTo.amount).toLocaleString().replace(/[,]/g, ''))
    }else{
      setAmount((newDataAssetInput.current_money - delToAsset.reduce((acc, item) => acc + item.giveTo.amount, 0)).toLocaleString().replace(/[,]/g, ''))
    }
  }
 }),[isFill]

 const handleEditMoneyToMove = () => {
  setDelToAsset((prev) => {
    let newDelTo = [...prev];
    newDelTo = newDelTo.map((item) => {
      if (item.giveTo.name === editMoveMoney?.giveTo.name) {
        return {
          ...item,
          giveTo: {
            type: selectedOptionPriority,
            name: selectedOptionPriority,
            amount: parseInt(amount),
          },
        };
      }
      return item;
    });
    return newDelTo;
  });
  setStatePage(0);
  resetFrom();
};

const handleDel = () => {

  setDelToAsset((prev) => {
    let newDelTo = [...prev];
    newDelTo = newDelTo.filter((item) => item.giveTo.name !== editMoveMoney?.giveTo.name);
    return newDelTo;
  });
  setStatePage(0);
  resetFrom();
}


useEffect(() => {
  if (isSelected && dataAssetNow.length > 0) {
    let numAsset = dataAssetNow.length;
    if (isHaveHome) { numAsset +=1 }
    const moneyPerAsset = Math.floor(
      parseInt(addCommatoNumber(newDataAssetInput.current_money || "0").replace(/[,]/g, ''))/ numAsset 
    );
    const Remnant = (parseInt(addCommatoNumber(newDataAssetInput.current_money || "0").replace(/[,]/g, ''))) - moneyPerAsset * numAsset
    setDelToAsset([
      {
      asset_id: newDataAssetInput.asset_id,
      giveTo: {
        type: 'เงินเกษียณ',
        name: 'เงินเกษียณ',
        amount: isNaN(moneyPerAsset) ? 0 : moneyPerAsset + Remnant,
      },
      },
      ...dataAssetNow
      .filter((item) => item.Name !== newDataAssetInput.Name)
      .map((item) => ({
        asset_id: item.asset_id,
        giveTo: {
        type: item.Name,
        name: item.Name,
        amount: isNaN(moneyPerAsset) ? 0 : moneyPerAsset,
        },
      }))
    ]);
    if (isHaveHome) {
      setDelToAsset((prev) => [
      prev[0],
      {
        asset_id: newDataAssetInput.asset_id,
        giveTo: {
        type: 'บ้านพักคนชรา',
        name: 'บ้านพักคนชรา',
        amount: isNaN(moneyPerAsset) ? 0 : moneyPerAsset,
        },
      },
      ...prev.slice(1),
      ]);
    }
  }
}, [isSelected, dataAssetNow, newDataAssetInput.current_money]);


  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (stateConfirm) {
      // แสดง Popup (fade-in + scale-up)
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }

  }, [stateConfirm]);

  const onCloseConfirm =() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStateConfirm(false);
    });
  }



  return (
    <>
      {statePage === 0 && 
      <View className='w-full h-[450] justify-between'>
        <View className='w-full items-center px-5'>
          <TextF className='text-normalText text-lg '>
            ตอนนี้คุณมีเงินค้างอยู่ในทรัพย์สินนี้ 
            <Text style={{fontFamily: 'SarabunBold'}} className='text-primary text-xl'> {addCommatoNumber(newDataAssetInput.current_money)} </Text> 
            บาท
          </TextF>
          <TextF className='text-normalText'>
            คุณต้องการโอนย้ายเงินไปที่ไหน
          </TextF>
          <View className='w-full flex-row items-center'>
            <View className='w-10'>
              <CheckBox
                center
                checked={isSelected}
                onPress={() => setSelection(!isSelected)}
              />
            </View>
            <TextF>แบ่งอัตโนมัติ</TextF>
          </View>
          {delToAsset.length !== 0 &&<View className='w-full flex-row justify-between items-center px-5'>
            <View className='flex-row items-center w-1/2 justify-center'>
              <TextF  className='text-label'>ประเภท</TextF>
            </View>
            <View className='flex-row items-center w-1/2 justify-center'>
              <TextF  className='text-label'>จำนวน(บาท)</TextF>
            </View>
          </View>}
          <ScrollView className={`w-full overflow-auto mt-2 pb-2 ${delToAsset.length !== dataAssetNow.length+1 ?' max-h-[160]':' max-h-[220]'}`}>
            {delToAsset.map((item, index) => (
              <TouchableOpacity 
              onPress={() => {setEditMoveMoney(item),setSelectedOptionPriority(item.giveTo.type),setAmount(item.giveTo.amount.toLocaleString().replace(/[,]/g, '')),setStatePage(1)}}
              key={index} className="w-full flex-row justify-between items-center px-5 py-3 bg-unselectInput rounded-lg mt-2">
                <View className="flex-row items-center w-1/2 justify-center">
                  <TextF className=" text-normalText text-lg">{item.giveTo.name}</TextF> 
                </View>
                <View className="flex-row items-center w-1/2 justify-center">
                  <TextF className="text-normalText text-lg">{item.giveTo.amount.toLocaleString()}</TextF> 
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {(delToAsset.length !== (isHaveHome ? dataAssetNow.length+1 : dataAssetNow.length) && parseInt(addCommatoNumber(newDataAssetInput.current_money).replace(/[,]/g, '')) - delToAsset.reduce((acc, item) => acc + item.giveTo.amount, 0) > 0)
          &&<TouchableOpacity 
          onPress={() => {setStatePage(1),setOption()}}
            className='w-full flex-row justify-center items-center px-5 h-12 border border-dashed border-primary rounded-lg mt-5'>
            <TextF  className='text-primary'>เพิ่ม</TextF>
          </TouchableOpacity>}
        </View>

        <View
          className=' h-18 flex justify-center items-center mt-5 px-5 gap-2 bg-none'>
          <TextF  className='text-err'>หากยังมีเงินเหลืออยู่จะถือว่าเป็นการถอนออก</TextF>
          <View className='flex flex-row gap-4'>
            <TouchableOpacity
            onPress={() => {onClose()}}
            className='flex-1 h-12 rounded-lg border border-primary justify-center items-center'>
              <TextF className='text-primary text-lg'>ยกเลิก</TextF>
            </TouchableOpacity>
            <TouchableOpacity 
            id='BtnSaveFutureUse'
            onPress={()=> setStateConfirm(true)}
            className={`flex-1 h-12 rounded-lg justify-center items-center bg-err`}>
              <TextF className='text-neutral text-lg'>ลบ</TextF>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
      }

      {statePage === 1 && 
      <>
        <TextF className='text-normalText text-lg'>
          เงินที่ค้างอยู่ <Text style={{fontFamily: 'SarabunBold'}} className='text-primary text-xl'>
            {editMoveMoney !== null ? addCommatoNumber(newDataAssetInput.current_money - delToAsset.reduce((acc, item) => acc + item.giveTo.amount, 0) + editMoveMoney.giveTo.amount) 
            : addCommatoNumber(newDataAssetInput.current_money - delToAsset.reduce((acc, item) => acc + item.giveTo.amount, 0))}
            </Text> บาท
        </TextF>
        <View className='w-full justify-between items-center px-10'>
          <TextF  className='text-label w-full mt-2'>ประเภท</TextF> 
          <View className='w-full h-10 mt-3'>
            <DropdownCustom options={editMoveMoney !== null? [] : optionsPriority} selectedOption={selectedOptionPriority} setSelectedOption={setSelectedOptionPriority}/>
          </View>
          <TextF  className='text-label w-full mt-5'>จำนวน</TextF>
          <TextInput
            placeholder='จำนวนเงิน'
            placeholderTextColor={'#B0B0B0'}
            keyboardType='numeric'
            value={addCommatoNumber(amount)}
            onChangeText={(text)=>{
              let numericText = 0;
              if (editMoveMoney !== null){
                numericText = parseInt(addCommatoNumber(newDataAssetInput.current_money).replace(/[,]/g, '')) - delToAsset.reduce((acc, item) => acc + item.giveTo.amount, 0) + editMoveMoney.giveTo.amount ;
              }else{
                numericText = parseInt(addCommatoNumber(newDataAssetInput.current_money).replace(/[,]/g, '')) - delToAsset.reduce((acc, item) => acc + item.giveTo.amount, 0);
              }
              if (parseInt(text.replace(/[,]/g, '')) >= numericText) {
                setIsFill(true)
              }else{
                setAmount( text.replace(/[^0-9]/g, '').replace(/[,]/g, ''))
                setIsFill(false)
              }}}
            className={`h-12 text-lg text-primary pl-5 w-full border-b border-unselectMenu`}/>
        </View>
        <View className='w-full flex-row items-center pl-8'>
          <View className='w-10'>
            <CheckBox
              center
              checked={isFill}
              onPress={() => setIsFill(!isFill)}
            />
          </View>
          <TextF>จำนวนเงินที่เหลือทั้งหมด</TextF>
        </View>
        <View
        className=' h-14 flex flex-row justify-center items-center mt-5 px-5 gap-4 bg-none'>
          <TouchableOpacity
          onPress={() => {editMoveMoney !== null ? (setStatePage(0), resetFrom(), handleDel()): (setStatePage(0), resetFrom())}}
          className='flex-1 h-12 rounded-lg border border-err justify-center items-center'>
            <TextF className='text-err text-lg'>{editMoveMoney !== null ? 'ลบ' : 'ยกเลิก'}</TextF>
          </TouchableOpacity>
          <TouchableOpacity 
          id='BtnSaveFutureUse'
          onPress={()=> amount ? editMoveMoney !== null ? handleEditMoneyToMove(): handleAddMoneyToMove() : null}
          className={`flex-1 h-12 rounded-lg justify-center items-center ${amount ? 'bg-primary':'bg-unselectMenu'}`}>
            <TextF className='text-neutral text-lg'>บันทึก</TextF>
          </TouchableOpacity>
        </View>

      </>}
      {stateConfirm &&
      <>
      <BlurView
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              intensity={80}
              tint="extraLight" // หรือใช้ "dark", "extraLight"
            />
        <Animated.View 
        style={[
          { opacity: opacityAnim, transform: [{ scale: scaleAnim }], top:'30%'}
        ]}
        onStartShouldSetResponder={() => true}
        onTouchEnd={(event) => event.stopPropagation()}
        className='w-10/12 bg-neutral rounded-2xl shadow-lg flex items-center py-5 absolute'>
            <View
            className='w-full h-52 w-500 justify-center items-center'>
              <View
                className=' h-18 flex justify-center items-center mt-5 px-5 gap-10 bg-none'>
                
                {parseInt(addCommatoNumber(newDataAssetInput.current_money - delToAsset.reduce((acc, item) => acc + item.giveTo.amount, 0)).replace(/[,]/g, '')) > 0 ?
                <View className='w-full items-center px-5 gap-3'>
                  <TextF  className='text-err text-xl'>คุณยังมีเงินค้างอยู่</TextF>
                  <TextF  className='text-err text-2xl'>{addCommatoNumber(newDataAssetInput.current_money - delToAsset.reduce((acc, item) => acc + item.giveTo.amount, 0))} บาท</TextF>
                  <TextF  className='text-err '>หากลบแล้วจะไม่สามารถกู้คืนได้</TextF>
                </View>
                :<View className='w-full items-center px-5'>
                  <TextF  className='text-err text-xl'>ยืนยันการลบ</TextF>
                  <TextF  className='text-err '>หากลบแล้วจะไม่สามารถกู้คืนได้</TextF>
                </View>
                }
                <View className='flex flex-row gap-4'>
                  <TouchableOpacity
                  onPress={() => {onCloseConfirm()}}
                  className='flex-1 h-12 rounded-lg border border-primary justify-center items-center'>
                    <TextF className='text-primary text-lg'>ยกเลิก</TextF>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  id='BtnSaveFutureUse'
                  onPress={()=> handleDelAsset()}
                  className={`flex-1 h-12 rounded-lg justify-center items-center bg-err`}>
                    <TextF className='text-neutral text-lg'>ยืนยันการลบ</TextF>
                  </TouchableOpacity>
                </View>
                
              </View>
            </View>
        </Animated.View>
      </>}
    </>
  )
}

export default MoveMoney


