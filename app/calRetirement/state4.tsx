import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import  TextF  from '../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../components/WideBtn';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface DataAsset {
  Name: string;
  type: string;
  Total_money: string;
  End_year: string;
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
}

const state4: React.FC<stateProps> = ({ isDarkMode, setState, dataInput, setDataInput, setActiveTab, dataAssetInput, homeSelected, setHomeSelected, homePickInPlan, setHomePickInPlan }) => {


  const [isFully, setIsFully] = useState(false);
  

const [selectNursingHousesId, setSelectNursingHousesId] = useState('')








  useEffect(() => {
    if (dataInput.Expected_monthly_expenses !== '' && dataInput.Annual_expense_increase !== '' && dataInput.Annual_savings_return !== '' && dataInput.Investment_return !== '' && homePickInPlan !== '') {
      setIsFully(true);
    } else {
      setIsFully(false);
    }
  }, [dataInput, homePickInPlan]);


useEffect(() => {

// fatch data from database
}, [selectNursingHousesId]);




const handleAddAsset = async (dataAsset: DataAsset, token:String): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("name", dataAsset.Name);
    formData.append("type", dataAsset.type);
    formData.append("totalcost", dataAsset.Total_money);
    formData.append("endyear", (parseInt(dataAsset.End_year) - 543).toString());
    console.log('formDataAsset:', formData);
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
      console.log('errorDataAsset',errorData)
      throw new Error(errorData.message || "Network response was not ok");
    }

    const data = await response.json();
    console.log('addAssetSuccess:', data);
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
    formData.append("retirementage", dataInput.Retirement_age);
    formData.append("expectlifespan", dataInput.Exp_lifespan);
    formData.append("currentsavings", dataInput.Current_savings);
    formData.append("currentsavingsreturns", dataInput.Current_savings_returns);
    formData.append("monthlyincome", dataInput.Monthly_income);
    formData.append("monthlyexpenses", dataInput.Monthly_expenses); //
    formData.append("currenttotalinvestment", dataInput.Current_total_investment);
    formData.append("investmentreturn", dataInput.Investment_return);
    formData.append("expectedinflation", dataInput.Expected_inflation);
    formData.append("expectedmonthlyexpenses", dataInput.Expected_monthly_expenses); //
    formData.append("annualexpenseincrease", dataInput.Annual_expense_increase);
    formData.append("annualsavingsreturn", dataInput.Annual_savings_return);
    formData.append("annualinvestmentreturn", dataInput.Annual_investment_return);




    console.log(token,'formData:', formData);
    console.log(JSON.stringify(dataAssetInput, null, 2));

    const response = await fetch(`${Port.BASE_URL}/retirement`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });
    console.log('----------------------')
    if (!response.ok) {
      const errorData = await response.json();
      console.log('-----',errorData)
      throw new Error(errorData.message || "Network response was not ok");
    }

    if (dataAssetInput.length !== 0) {
      for (let i = 0; i < dataAssetInput.length; i++) {
        console.log('dataAssetInput----:', dataAssetInput[i]);
        handleAddAsset(dataAssetInput[i], token);
      }
    }
    
    const data = await response.json();
    console.log('++data++',data)

    const responseAddHouse = await fetch(`${Port.BASE_URL}/user/${homePickInPlan}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    console.log('responseAddHouse',responseAddHouse)
    setActiveTab('dashboard');
  } catch (error) {
    throw new Error( error as string);
    
  }
};



console.log('homePickInPlan',homePickInPlan)






  return (
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
                      value={dataInput.Expected_monthly_expenses}
                      keyboardType='numeric'
                      onChangeText={(text) => {
                        setDataInput({ ...dataInput, Expected_monthly_expenses: text });
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
              onPress={() => setHomePickInPlan('00001')}
              className={`flex-1 h-14 rounded-lg justify-center items-center flex-row gap-3 ${homePickInPlan == '00001' ? 'bg-primary':'bg-neutral'}`}>
                <FontAwesome6 name="house-chimney" size={20} color={homePickInPlan == '00001' ?'#FCFCFC':'#2A4296'} />
                <TextF className={`text-lg ${homePickInPlan  == '00001' ? 'text-neutral':'text-primary'}`}>บ้านตนเอง</TextF>
              </TouchableOpacity>
              <TouchableOpacity 
              id='NursingHousesBtn'
              activeOpacity={1}
              onPress={() => setState(5)}
              className={`flex-1 h-14 rounded-lg justify-center items-center flex-row gap-3 ${homePickInPlan !== '' && homePickInPlan !== '00001' ? 'bg-primary':'bg-neutral'}`}>
                <FontAwesome6 name="person-cane" size={22} color={homePickInPlan !== '' && homePickInPlan !== '00001' ?'#FCFCFC':'#2A4296'} />
                <TextF className={`text-lg ${homePickInPlan  !== '' && homePickInPlan !== '00001' ? 'text-neutral':'text-primary'}`}>บ้านพักคนชรา</TextF>
              </TouchableOpacity>
            </View>
          </View>
          {homePickInPlan !== '00001' && <View className='h-20 '></View>}
    </View>
    <View className='h-5 '></View>
    <WideBtn id='saveCalRetirementData' activeOpacity={1} text='บันทึก' disabled={!isFully} onPress={handleCreatePlan}/>
  </View>
  )
}

export default state4