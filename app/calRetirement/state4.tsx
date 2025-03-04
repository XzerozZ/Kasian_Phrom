import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import  TextF  from '../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../components/WideBtn';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNumberFormat } from "@/app/NumberFormatContext";
import { BlurView } from 'expo-blur';
import MoveMoney from './moveMoney';


interface delTo {
  asset_id: string;
  giveTo:{
    type: string;
    name: string;
    amount: number;
  }
}

interface DataAsset {
  asset_id: string;
  Name: string;
  type: string;
  Total_money: string;
  End_year: string;
  Status: string;
}

interface stateProps{
  isDarkMode: boolean;
  setState: (state: number) => void
  dataInput: any;
  setDataInput: (data: any) => void;
  setActiveTab: (tab: string) => void;
  dataAssetInput: any;
  homeSelected: string;
  setHomeSelected: (home: string) => void;
  homePickInPlan: string;
  setHomePickInPlan: (home: string) => void;
  oldAssetInput: any;
  havePlant: boolean;
  formClick: string;
  setFormClick: (form: string) => void;
}
const state4: React.FC<stateProps> = ({ isDarkMode, setState, dataInput, setDataInput, setActiveTab, dataAssetInput, homeSelected, setHomeSelected, homePickInPlan, setHomePickInPlan, oldAssetInput, havePlant, formClick, setFormClick }) => {


const [isFully, setIsFully] = useState(false);
const { addCommatoNumber } = useNumberFormat();

const [dataHausePick, setDataHausePick] = useState<any>(null);


useEffect(() => {
  const handleGetHomeSelected = async () => {
    if (homePickInPlan !== '' && homePickInPlan !== '00001') {
      try {
        const response = await fetch(`${Port.BASE_URL}/nursinghouses/${homePickInPlan}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData)
          throw new Error(errorData.message || "Network response was not ok");
        }
        const data = await  response.json();
        // console.log('dataHome', JSON.stringify(data, null, 2));
        setDataHausePick(data.result);

      } catch (error) {
        throw new Error(error as string);
      }
    }else if (homePickInPlan === '00001') {
      setDataHausePick(null);
    }
  }
  handleGetHomeSelected();
}, [homePickInPlan]);



useEffect(() => {
  if (dataInput.Expected_monthly_expenses !== '' && dataInput.Annual_expense_increase !== '' && dataInput.Annual_savings_return !== '' && dataInput.Investment_return !== '' && (dataHausePick !== null || homePickInPlan === '00001')) {
    setIsFully(true);
  } else {
    setIsFully(false);
  }
}, [dataInput, dataHausePick, homePickInPlan]);

const resetCommato = (text: string) => {
  return text.replace(/,/g, '');
}



const handleAddAsset = async (dataAsset: DataAsset, token:String): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("name", dataAsset.Name);
    formData.append("type", dataAsset.type);
    formData.append("totalcost", dataAsset.Total_money);
    formData.append("endyear", (parseInt(dataAsset.End_year) - 543).toString());

    // console.log('formDataAsset:', formData);
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
      // console.log('errorDataAsset',errorData)
      throw new Error(errorData.message || "Network response was not ok");
    }

    const data = await response.json();
    // console.log('addAssetSuccess:', data);
  } catch (error) {
    throw new Error(error as string);
  }
};





const handleCreatePlan = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error("Token is null");
    }
    const formData = new FormData();
    formData.append("planname", dataInput.Name);
    formData.append("birthdate", dataInput.Birth_date);
    formData.append("retirementage", resetCommato(dataInput.Retirement_age));
    formData.append("expectlifespan", resetCommato(dataInput.Exp_lifespan));
    formData.append("currentsavings", resetCommato(dataInput.Current_savings));
    formData.append("currentsavingsreturns", resetCommato(dataInput.Current_savings_returns));
    formData.append("monthlyincome", resetCommato(dataInput.Monthly_income));
    formData.append("monthlyexpenses", resetCommato(dataInput.Monthly_expenses)); //
    formData.append("currenttotalinvestment", resetCommato(dataInput.Current_total_investment));
    formData.append("investmentreturn", resetCommato(dataInput.Investment_return));
    formData.append("expectedinflation", resetCommato(dataInput.Expected_inflation));
    formData.append("expectedmonthlyexpenses", resetCommato(dataInput.Expected_monthly_expenses)); //
    formData.append("annualexpenseincrease", resetCommato(dataInput.Annual_expense_increase));
    formData.append("annualsavingsreturn", resetCommato(dataInput.Annual_savings_return));
    formData.append("annualinvestmentreturn", resetCommato(dataInput.Annual_investment_return));

    // console.log(token,'formData:', formData);
    // console.log(JSON.stringify(dataAssetInput, null, 2));

    const response = await fetch(`${Port.BASE_URL}/retirement`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });
    // console.log('----------------------')
    if (!response.ok) {
      const errorData = await response.json();
      // console.log('-----',errorData)
      throw new Error(errorData.message || "Network response was not ok");
    }

    if (dataAssetInput.length !== 0) {
      for (let i = 0; i < dataAssetInput.length; i++) {
        // console.log('dataAssetInput----:', dataAssetInput[i]);
        handleAddAsset(dataAssetInput[i], token);
      }
    }
    
    const data = await response.json();
    // console.log('++data++',data)

    const responseAddHouse = await fetch(`${Port.BASE_URL}/user/${homePickInPlan}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    // console.log('responseAddHouse',responseAddHouse)
    setActiveTab('dashboard');
  } catch (error) {
    throw new Error( error as string);
    
  }
};

const handleUpdateAsset = async (dataAsset: DataAsset, token:String): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("name", dataAsset.Name);
    formData.append("type", dataAsset.type);
    formData.append("totalcost", dataAsset.Total_money);
    formData.append("endyear", (parseInt(dataAsset.End_year) - 543).toString());
    formData.append("status", dataAsset.Status);
    
    // console.log('formDataAsset:', formData);
    const response = await fetch(`${Port.BASE_URL}/asset/${dataAsset.asset_id}`, {
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
    // console.log('addAssetSuccess:', data);
  } catch (error) {
    throw new Error(error as string);
  }
};





const handleSaveEditPlant = async () => {

  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error("Token is null");
    }
    const formData = new FormData();
    formData.append("planname", dataInput.Name);
    formData.append("birthdate", dataInput.Birth_date);
    formData.append("retirementage", resetCommato(dataInput.Retirement_age));
    formData.append("expectlifespan", resetCommato(dataInput.Exp_lifespan));
    // formData.append("currentsavings", resetCommato(dataInput.Current_savings));
    formData.append("currentsavingsreturns", resetCommato(dataInput.Current_savings_returns));
    formData.append("monthlyincome", resetCommato(dataInput.Monthly_income));
    formData.append("monthlyexpenses", resetCommato(dataInput.Monthly_expenses)); //
    // formData.append("currenttotalinvestment", resetCommato(dataInput.Current_total_investment));
    formData.append("investmentreturn", resetCommato(dataInput.Investment_return));
    formData.append("expectedinflation", resetCommato(dataInput.Expected_inflation));
    formData.append("expectedmonthlyexpenses", resetCommato(dataInput.Expected_monthly_expenses)); //
    formData.append("annualexpenseincrease", resetCommato(dataInput.Annual_expense_increase));
    formData.append("annualsavingsreturn", resetCommato(dataInput.Annual_savings_return));
    formData.append("annualinvestmentreturn", resetCommato(dataInput.Annual_investment_return));

    console.log(token,'formData:', formData);
    console.log(JSON.stringify(dataAssetInput, null, 2));

    const response = await fetch(`${Port.BASE_URL}/retirement`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
      throw new Error(errorData.message || "Network response was not ok");
    }

    if (oldAssetInput !== dataAssetInput) {
      for (let i = 0; i < dataAssetInput.length; i++) {
        console.log('dataAssetInput----:', dataAssetInput[i]);
    
        const existingAsset: DataAsset | undefined = oldAssetInput.find((asset: DataAsset) => asset.asset_id === dataAssetInput[i].asset_id);
    
        if (existingAsset) {
          handleUpdateAsset(dataAssetInput[i], token);
        } else {
          handleAddAsset(dataAssetInput[i], token);
        }
      }
    
      
    }
    
    const responseAddHouse = await fetch(`${Port.BASE_URL}/user/${homePickInPlan}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    console.log('responseAddHouse',responseAddHouse)
    setFormClick('default')
    setActiveTab('dashboard');

    if (isChangeHomeToOwn){
      const ChangeToHomeSet = async () => {
        const token = await AsyncStorage.getItem('token');
        const formData = new FormData();
        delToAsset.forEach((item) => {
          formData.append("type", item.giveTo.name !== 'เงินเกษียณ' ? 'asset' : 'retirementplan' );
          formData.append("name", item.giveTo.name);
          formData.append("amount", item.giveTo.amount.toString());
        });
        console.log('formData********************************************++++++++++++++++++++',formData)
        const response = await fetch(`${Port.BASE_URL}/user/00001`, {
          method: 'PUT',
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
          body: formData,
        });
        const data = await response.json();
        onClose();
        setDelToAsset([]);
      };
      ChangeToHomeSet();
    }
  } catch (error) {
    throw new Error( error as string);
    
  }
};



  const [statePopupMoveMoney, setStatePopupMoveMoney] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  useEffect(() => {
    if (statePopupMoveMoney) {
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

  }, [statePopupMoveMoney]);

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
      setStatePopupMoveMoney(false);
    });
    
  }

  const [isChangeHomeToOwn, setIsChangeHomeToOwn] = useState(false);
  const [delToAsset, setDelToAsset] = useState<delTo[]>([])
  const [newDataHouse, setNewDataHouse] = useState({
    asset_id:'',
    Name: 'บ้านพักคนชรา',
    Total_money: '',
    End_year: '',
    type: 'home',
    Status: 'house',
    current_money: 0,
  })

  useEffect (() => {
    const fetchToken = async (token:string ) => {
      try {
        const responseHouse = await fetch(`${Port.BASE_URL}/user/selected`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataHouse = await responseHouse.json();
        setNewDataHouse(prev => ({...prev, 
          asset_id: dataHouse.result.NursingHouse.nh_id,
          Total_money: dataHouse.result.NursingHouse.price, 
          current_money: dataHouse.result.current_money}));

      } catch (error) {
        console.error('Failed to fetch token from storage', error);
      }
    };
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token !== undefined && token !== null && havePlant ) {
        fetchToken(token);
      }
    };
    
    getToken();
  } ,[havePlant])

  const handleChangeToHome = () => {
    setHomePickInPlan('00001');
    onClose();
    setIsChangeHomeToOwn(true);
  }

console.log(newDataHouse)

  return (
    <>
    {statePopupMoveMoney && 
      <TouchableOpacity 
      activeOpacity={1}
      className=' absolute flex-1 h-screen w-full mt-5 items-center z-30' style={{ flex: 1, top: 0, left:0}}>
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
          <MoveMoney onClose={onClose} newDataAssetInput={newDataHouse} delToAsset={delToAsset} setDelToAsset={setDelToAsset} handleDelAsset={handleChangeToHome}/>
      </Animated.View>
    </TouchableOpacity>}
    <View 
    id='CalRetirementState4'
    className='flex-1'>
      <View className='bg-neutral2 rounded-3xl pb-10 px-5 mb-5'>
          <View className='flex mt-5'>
            <TextF className='text-normalText text-lg mt-5'>ข้อมูลการเงินที่คาดหวังในอนาคต</TextF>
            <View className='flex mt-5 bg-neutral rounded-xl px-3'>
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>รายจ่ายหลังเกษียณ/เดือน</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='ExpectedMonthlyExpensesInput'
                      placeholder='ใส่จำนวนเงิน'
                      placeholderTextColor={'#B0B0B0'}
                      value={addCommatoNumber(dataInput.Expected_monthly_expenses)}
                      keyboardType='numeric'
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Expected_monthly_expenses: text.replace(/,/g, '') });
                      }}
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>บาท</TextF>
                </View>
              </View>

              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>การเพิ่มขึ้นของรายจ่าย/ปี</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='AnnualExpenseIncreaseInput'
                      value={dataInput.Annual_expense_increase}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          text = text.replace(/^0+/, '');
                        }
                        if (text.length == 0) {
                          text = '0';
                        }
                        setDataInput({ ...dataInput, Annual_expense_increase: text });
                      }}
                      onBlur={() => {
                        if (!dataInput.Annual_expense_increase) {
                          setDataInput({ ...dataInput, Annual_expense_increase: '3' });
                        }}
                      }
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>%</TextF>
                </View>
              </View>

              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>ผลตอบแทนจากการออม/ปี</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='AnnualSavingsReturnInput'
                      value={dataInput.Annual_savings_return}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          text = text.replace(/^0+/, '');
                        }
                        if (text.length == 0) {
                          text = '0';
                        }
                        setDataInput({ ...dataInput, Annual_savings_return: text });
                      }}
                      onBlur={() => {
                        if (!dataInput.Annual_savings_return) {
                          setDataInput({ ...dataInput, Annual_savings_return: '1.25' });
                        }}
                      }
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>%</TextF>
                </View>
              </View>

              <View className='w-full h-[1] bg-neutral2'></View>
              
              <View className='flex flex-row  justify-between items-center h-16'>
                <View> 
                  <TextF className='text-lg text-normalText'>ผลตอบแทนจากการลงทุน/ปี</TextF>
                  <TextF className='text-xs text-label'>ตัวเลขนี้เป็นเพียงค่าเฉลี่ยมาตรฐาน สามารถแก้ไขได้</TextF>
                </View>
                <View className='w-18 flex flex-row justify-center items-center'>
                    <TextInput
                      id='AnnualInvestmentReturnInput'
                      value={dataInput.Annual_investment_return}
                      keyboardType='numeric'
                      maxLength={4}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          text = text.replace(/^0+/, '');
                        }
                        if (text.length == 0) {
                          text = '0';
                        }
                        setDataInput({ ...dataInput, Annual_investment_return: text });
                      }}
                      onBlur={() => {
                        if (!dataInput.Annual_investment_return) {
                          setDataInput({ ...dataInput, Annual_investment_return: '5' });
                        }}
                      }
                      className={`h-16 text-end text-lg text-primary pr-2`}/>
                      <TextF className={` text-lg text-primary`}>%</TextF>
                </View>
              </View>
            </View>
          </View>

          <View className='flex mt-2'>
            <TextF className='text-normalText text-lg mt-5'>ที่อยู่อาศัยที่คาดหวังในอนาคต</TextF>
            <View
            className=' h-14 flex flex-row justify-center items-center mb-5 gap-5 mt-5'>
              <TouchableOpacity
              id='OwnHouseBtn'
              activeOpacity={1}
              onPress={() => {newDataHouse.current_money > 0 ?setStatePopupMoveMoney(true): setHomePickInPlan('00001')}}
              className={`flex-1 h-14 rounded-lg justify-center items-center flex-row gap-3 ${homePickInPlan == '00001' ? 'bg-primary':'bg-neutral'}`}>
                <FontAwesome6 name="house-chimney" size={20} color={homePickInPlan == '00001' ?'#FCFCFC':'#2A4296'} />
                <TextF className={`text-lg ${homePickInPlan  == '00001' ? 'text-neutral':'text-primary'}`}>บ้านตนเอง</TextF>
              </TouchableOpacity>
              <TouchableOpacity 
              id='NursingHousesBtn'
              activeOpacity={1}
              onPress={() => setState(5)}
              className={`flex-1 h-14 rounded-lg justify-center items-center flex-row gap-3 ${dataHausePick !== null ? 'bg-primary':'bg-neutral'}`}>
                <FontAwesome6 name="person-cane" size={22} color={dataHausePick !== null ?'#FCFCFC':'#2A4296'} />
                <TextF className={`text-lg ${dataHausePick !== null ? 'text-neutral':'text-primary'}`}>บ้านพักคนชรา</TextF>
              </TouchableOpacity>
            </View>
          </View>
          {dataHausePick !== null && 
          <View 
          className="flex flex-row bg-neutral items-center rounded-xl px-3 py-2 mt-5">
            <View className="w-1/2 aspect-video max-w-52 bg-slate-300 rounded-md">
              <Image
                source={{ uri: dataHausePick.images[0].image_link }}
                className="w-full h-full object-cover rounded-md"
              />
            </View>
            <View className="flex-1 pl-3 justify-between">
              <View className=' h-16'>
                <TextF className="text font-bold text-black">{dataHausePick.name}</TextF>
              </View>
              <TextF className="text-oktext items-center mt-3">{dataHausePick.price} บาท/เดือน</TextF>
              <View className="flex-row items-center w-full justify-end gap-1">
                <TextF className="text-sm text-label ml-1 ">{dataHausePick.province}</TextF>
                <FontAwesome5 name="map-marker-alt" size={12} color="#979797" />
              </View>
            </View>
          </View>}
    </View>
    <View className='h-5 '></View>
    {!havePlant ? <WideBtn id='saveCalRetirementData' activeOpacity={1} text='สร้างแผน' disabled={!isFully} onPress={handleCreatePlan}/>
    :<WideBtn id='saveCalRetirementData' activeOpacity={1} text='บันทึก' disabled={!isFully} onPress={handleSaveEditPlant }/>}
  </View>
  </>
  )
}

export default state4