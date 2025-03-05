import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import  TextF  from '../../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../../components/WideBtn';
import { useMemo } from 'react';
import CheckBox from '../../components/checkBox';
import { useNumberFormat } from "@/app/NumberFormatContext";
import MoveMoney from '../moveMoney';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Port from '@/Port';

// import 
interface delTo {
  asset_id: string;
  giveTo:{
    type: string;
    name: string;
    amount: number;
  }
}
interface futureUseProps{
  isDarkMode: boolean;
  setStateFutureUse: (state: boolean) => void
  dataAssetInput: any;
  setDataAssetInput: (data: any) => void;
  dataEditAsset: number | null;
  setDataEditAsset: (data: number | null) => void;
  havePlant: boolean;
  refresh: boolean;
  setRefresh: (state: boolean) => void;
}
const futureUse: React.FC<futureUseProps> = ({ isDarkMode, setStateFutureUse, dataAssetInput, setDataAssetInput, dataEditAsset, setDataEditAsset, havePlant, refresh, setRefresh }) => {

  const scrollViewRef = useRef<ScrollView>(null);
  const { addCommatoNumber } = useNumberFormat();
  const [isNewAsset, setIsNewAsset] = useState(true);
  const [statePopupDel, setStatePopupDel] = useState(false);
  const [statePopupMoveMoney, setStatePopupMoveMoney] = useState(false);
  
  const [delToAsset, setDelToAsset] = useState<delTo[]>([])
  const [newDataAssetInput, setNewDataAssetInput] = useState({
    Name: '',
    Total_money: '',
    End_year: '',
    type: 'home',
    Status: 'In_Progress',
    current_money: 0,
  })
// console.log(JSON.stringify(dataAssetInput, null,2 ))
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
    if (dataEditAsset !== null) {
      const assetData = dataAssetInput.find((asset:any ) => asset.asset_id === dataEditAsset);
      setNewDataAssetInput(assetData);
  
      if (!assetData.hasOwnProperty("asset_id")) {
        setIsNewAsset(true);
      } else {
        setIsNewAsset(false);
      }
    }
  }, [dataEditAsset,dataAssetInput]);


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
    const currentYear = new Date().getFullYear() + 543; // ปี พ.ศ.
    const numericText = newDataAssetInput.End_year.replace(/[^0-9]/g, ''); // กรองเฉพาะตัวเลข
    const validatedValue = parseInt(numericText, 10);
  
    // ถ้าปีที่ใส่น้อยกว่าปีปัจจุบัน ให้ใช้ปีปัจจุบันแทน
    const finalValue = !isNaN(validatedValue) && validatedValue < currentYear
      ? String(currentYear)
      : numericText;
  
    // อัปเดตค่า End_year ก่อนบันทึก
    const updatedData = { ...newDataAssetInput, End_year: finalValue };
  
    // เพิ่มข้อมูลใหม่เข้าไปใน dataAssetInput
    setDataAssetInput((prevData: any[]) => [...prevData, updatedData]);
  
    // รีเซ็ตค่า input
    setNewDataAssetInput({
      Name: '',
      Total_money: '',
      End_year: '',
      type: 'home',
      Status: 'In_Progress',
      current_money: 0,

    });
  
    setType('');
    setStateFutureUse(false);
  };
  

  const handleCancelEdit = () => {
    setDataEditAsset(null);
    setNewDataAssetInput({
      Name: '',
      Total_money: '',
      End_year: '',
      type: 'home',
      Status: 'In_Progress',
      current_money: 0,
    });
    setType('');
    setStateFutureUse(false);
  }

  const handleSaveEdit = () => {
    const currentYear = new Date().getFullYear() + 543; // ปี พ.ศ.
    const numericText = newDataAssetInput.End_year.replace(/[^0-9]/g, ''); // กรองเฉพาะตัวเลข
    const validatedValue = parseInt(numericText, 10);
  
    // ถ้าปีที่ใส่น้อยกว่าปีปัจจุบัน ให้ใช้ปีปัจจุบันแทน
    const finalValue = !isNaN(validatedValue) && validatedValue < currentYear
      ? String(currentYear)
      : numericText;
  
    // อัปเดตค่า End_year ก่อนบันทึก
    const updatedData = { ...newDataAssetInput, End_year: finalValue };
  
    // อัปเดตข้อมูลใน dataAssetInput
    const newData = dataAssetInput.map((item: any, index: number) => {
      if (index === dataEditAsset) {
        return updatedData;
      }
      return item;
    });
  
    setDataAssetInput(newData);
  
    setDataEditAsset(null);
    setNewDataAssetInput({
      Name: '',
      Total_money: '',
      End_year: '',
      type: 'home',
      Status: 'In_Progress',
      current_money: 0,
    });
    setType('');
    setStateFutureUse(false);
    
  }

  // const handleDelAsset = () => {
  //   const newData: any[] = dataAssetInput.filter((_: any, index: number) => index !== dataEditAsset);
  //   setDataAssetInput(newData);

  //   setDataEditAsset(null);
  //   setNewDataAssetInput({
  //     Name: '',
  //     Total_money: '',
  //     End_year: '',
  //     type: 'home',
  //     Status: 'In_Progress',
  //     current_money: 0,
  //   });
  //   setType('');
  //   setStateFutureUse(false);
  // }

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (statePopupDel || statePopupMoveMoney) {
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

  }, [statePopupDel, statePopupMoveMoney]);

  const onClose =() => {
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
      setStatePopupDel(false);
      setStatePopupMoveMoney(false);
    });
    setDelToAsset([])
  }

  const handleDelAsset = () => {
    try {
      const deleteAsset = async () => {
        const token = await AsyncStorage.getItem('token');
        const formData = new FormData();
        if (delToAsset.length !== 0) {
          delToAsset.forEach((item) => {
            formData.append("type", item.giveTo.name !== 'เงินเกษียณ' ? item.giveTo.name !== 'บ้านพักคนชรา' ?  'asset' : 'house' : 'retirementplan');
            formData.append("name", item.giveTo.name);
            formData.append("amount", item.giveTo.amount.toString());
          });
        }else{
          formData.append("type", 'delAsset');
          formData.append("name", 'delAsset');
          formData.append("amount", '0');
        }
        console.log('///////////////formData',formData)
        const response = await fetch(`${Port.BASE_URL}/asset/${dataEditAsset}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
          body: formData,
        });
        const data = await response.json();
        console.log('data', data);
        onClose();

        setDataEditAsset(null);
        setNewDataAssetInput({
          Name: '',
          Total_money: '',
          End_year: '',
          type: 'home',
          Status: 'In_Progress',
          current_money: 0,
        });
        setType('');
        setStateFutureUse(false);
        setRefresh(!refresh);
      };
      deleteAsset();
      
    }
    catch (e) {
      console.log(e);
    }
  }

  
const handleAddAsset = async (): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append("name", newDataAssetInput.Name);
    formData.append("type", newDataAssetInput.type);
    formData.append("totalcost", newDataAssetInput.Total_money);
    formData.append("endyear", (parseInt(newDataAssetInput.End_year) - 543).toString());

    const response = await fetch(`${Port.BASE_URL}/asset`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
     
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    const data = await response.json();
    setNewDataAssetInput({
      Name: '',
      Total_money: '',
      End_year: '',
      type: 'home',
      Status: 'In_Progress',
      current_money: 0,

    });
  
    setType('');
    setStateFutureUse(false);
    setRefresh(!refresh);
  } catch (error) {
    throw new Error(error as string);
  }
};
console.log('dataEditAsset',dataEditAsset)

const handleUpdateAsset = async (): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    formData.append("name", newDataAssetInput.Name);
    formData.append("type", newDataAssetInput.type);
    formData.append("totalcost", newDataAssetInput.Total_money);
    formData.append("endyear", (parseInt(newDataAssetInput.End_year) - 543).toString());
    formData.append("status", newDataAssetInput.Status);
    
    const response = await fetch(`${Port.BASE_URL}/asset/${dataEditAsset}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
     
      const errorData = await response.json();
      console.log('errorDataAsset',errorData)
      throw new Error(errorData.message || "Network response was not ok");
    }

    const data = await response.json();
    setNewDataAssetInput({
      Name: '',
      Total_money: '',
      End_year: '',
      type: 'home',
      Status: 'In_Progress',
      current_money: 0,

    });
  
    setType('');
    setStateFutureUse(false);
    setRefresh(!refresh);
  } catch (error) {
    throw new Error(error as string);
  }
};

  return (
    <>
    
    
    <View 
    id='CalRetirementFutureUse'
    style={{ position : 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20, backgroundColor: 'white' }}
    className='flex-1 pt-10'>
      {statePopupMoveMoney && 
      <TouchableOpacity 
      activeOpacity={1}
      className=' absolute flex-1 h-screen w-full justify-center items-center z-30' style={{ flex: 1, top: 0, left:0}}>
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        intensity={40}
        tint="prominent" // หรือใช้ "dark", "extraLight"
      />
      <Animated.View 
      style={[
        { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }
      ]}
      onStartShouldSetResponder={() => true}
      onTouchEnd={(event) => event.stopPropagation()}
      className='w-10/12 bg-neutral rounded-2xl shadow-lg flex items-center py-5'>
          <MoveMoney onClose={onClose} newDataAssetInput={newDataAssetInput} delToAsset={delToAsset} setDelToAsset={setDelToAsset} handleDelAsset={handleDelAsset}/>
      </Animated.View>
    </TouchableOpacity>}
      {statePopupDel && 
      <TouchableOpacity 
      activeOpacity={1}
      onPress={()=>onClose()}
      className=' absolute flex-1 h-screen w-full justify-center items-center z-30' style={{ flex: 1, top: 0, left:0}}>
      <BlurView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        intensity={40}
        tint="prominent" // หรือใช้ "dark", "extraLight"
      />
      <Animated.View 
      style={[
        { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }
      ]}
      onStartShouldSetResponder={() => true}
      onTouchEnd={(event) => event.stopPropagation()}
      className='w-10/12 h-80 bg-neutral rounded-2xl shadow-lg flex justify-center items-center'>
          <TextF className='text-lg text-normalText px-3 text-center'>คุณต้องการลบทรัพย์สิน <TextF className='text-primary'>{newDataAssetInput.Name}</TextF> ใช่หรือไม่</TextF>
          <View className='w-full flex flex-row px-3 gap-3 mt-14'>
            <TouchableOpacity 
            onPress={()=>onClose()}
            className=' flex-1 h-14 border-primary border justify-center items-center rounded-md'>
              <TextF className='text-lg text-primary'>ยกเลิก</TextF>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>handleDelAsset()}
            className='flex-1 h-14 bg-err justify-center items-center rounded-md '>
              <TextF className='text-lg text-white'>ยืนยัน</TextF>
            </TouchableOpacity>
          </View>
      </Animated.View>
    </TouchableOpacity>}
      <View className='flex-row mt-3 ml-5 h-14 items-center'>
          <TouchableOpacity
              id='BtnBackToCalRetirementState3'
              activeOpacity={1}
              onPress={()=> dataEditAsset !== null ? handleCancelEdit() :setStateFutureUse(false)}
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
                placeholderTextColor={'#B0B0B0'}
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
                    placeholderTextColor={'#B0B0B0'}
                    keyboardType='numeric'
                    value={addCommatoNumber(newDataAssetInput.Total_money)}
                    onChangeText={(text)=>setNewDataAssetInput({...newDataAssetInput, Total_money: text.replace(/,/g, '')})}
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
                  placeholderTextColor={'#B0B0B0'}
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
                      !isNaN(validatedValue) && validatedValue < currentYear+1
                        ? String(currentYear+1)
                        : numericText;
                    setNewDataAssetInput({ ...newDataAssetInput, End_year: finalValue });
                  }}
                  className="h-16 text-end text-lg text-primary pr-2"
                />
              </View>
            </View>
            {!isNewAsset && newDataAssetInput.Status !== 'Completed' && 
            <>
              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>อยู่ระหว่างการออม</TextF>
                </View>
                <View 
                  id='BtnChangeNotification'
                  className='flex flex-row gap-5 justify-center items-center'>
                      <CheckBox 
                        toggle={newDataAssetInput.Status === 'In_Progress'} 
                        setToggle={(value) => 
                          setNewDataAssetInput(prevState => ({
                            ...prevState,
                            Status: value ? 'In_Progress' : 'Paused'
                          }))
                        } 
                      />
                </View>
              </View>
            </>}
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
                  placeholderTextColor={'#B0B0B0'}
                  className="ml-2 border-b-[1px] border-neutral2 flex-1 h-10 mr-5 py-2"
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
          onPress={()=> dataEditAsset !== null ? newDataAssetInput.current_money > 0 ? setStatePopupMoveMoney(true) : setStatePopupDel(true) : setStateFutureUse(false)}
          className='flex-1 h-14 rounded-lg border border-err justify-center items-center'>
            <TextF className='text-err text-lg'>{dataEditAsset !== null ? 'ลบ' : 'ยกเลิก'}</TextF>
          </TouchableOpacity>
          <TouchableOpacity 
          id='BtnSaveFutureUse'
          onPress={() => { if (isFully) { dataEditAsset !== null ? handleUpdateAsset() : handleAddAsset(); } }}
          className={`flex-1 h-14 rounded-lg justify-center items-center ${isFully ? 'bg-primary':'bg-unselectMenu'}`}>
            <TextF className='text-neutral text-lg'>บันทึก</TextF>
          </TouchableOpacity>
        </View>
      </View>
      </>
  )
}

export default futureUse


// Removed local useMemo function to resolve conflict with imported useMemo from 'react'
