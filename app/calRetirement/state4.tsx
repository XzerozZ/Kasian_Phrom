import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import  TextF  from '../components/TextF';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import WideBtn from '../components/WideBtn';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNumberFormat } from "@/app/NumberFormatContext";


interface DataAsset {
  asset_id: string;
  Name: string;
  type: string;
  Total_money: string;
  End_year: string;
  Status: boolean;
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
}

const state4: React.FC<stateProps> = ({ isDarkMode, setState, dataInput, setDataInput, setActiveTab, dataAssetInput, homeSelected, setHomeSelected, homePickInPlan, setHomePickInPlan, oldAssetInput, havePlant }) => {


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
        console.log('dataHome', JSON.stringify(data, null, 2));
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
  if (dataInput.Expected_monthly_expenses !== '' && dataInput.Annual_expense_increase !== '' && dataInput.Annual_savings_return !== '' && dataInput.Investment_return !== '' && homePickInPlan !== '') {
    setIsFully(true);
  } else {
    setIsFully(false);
  }
}, [dataInput, homePickInPlan]);





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

const handleUpdateAsset = async (dataAsset: DataAsset, token:String): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("name", dataAsset.Name);
    formData.append("type", dataAsset.type);
    formData.append("totalcost", dataAsset.Total_money);
    formData.append("endyear", (parseInt(dataAsset.End_year) - 543).toString());
    // formData.append("status", dataAsset.Status ?'In_Progress':'Waiting');
    
    console.log('formDataAsset:', formData);
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
    console.log('addAssetSuccess:', data);
  } catch (error) {
    throw new Error(error as string);
  }
};

const handleDelAsset = async (dataAsset: DataAsset, token:String): Promise<void> => {
  try {
    const response = await fetch(`${Port.BASE_URL}/asset/${dataAsset.asset_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }

    const data = await response.json();
    console.log('delAssetSuccess:', data);
  } catch (error) {
    throw new Error(error as string);
  }
}



const handleSaveEditPlant = async () => {

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
    // formData.append("currentsavings", dataInput.Current_savings);
    formData.append("currentsavingsreturns", dataInput.Current_savings_returns);
    formData.append("monthlyincome", dataInput.Monthly_income);
    formData.append("monthlyexpenses", dataInput.Monthly_expenses);
    // formData.append("currenttotalinvestment", dataInput.Current_total_investment);
    formData.append("investmentreturn", dataInput.Investment_return);
    formData.append("expectedinflation", dataInput.Expected_inflation);
    formData.append("expectedmonthlyexpenses", dataInput.Expected_monthly_expenses);
    formData.append("annualexpenseincrease", dataInput.Annual_expense_increase);
    formData.append("annualsavingsreturn", dataInput.Annual_savings_return);
    formData.append("annualinvestmentreturn", dataInput.Annual_investment_return);

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
    
      for (let i = 0; i < oldAssetInput.length; i++) {
        const existingAssetInNewData = dataAssetInput.find((asset: DataAsset) => asset.asset_id === oldAssetInput[i].asset_id);
        
        if (!existingAssetInNewData) {
          handleDelAsset(oldAssetInput[i], token);
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
    setActiveTab('dashboard');
  } catch (error) {
    throw new Error( error as string);
    
  }
};






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
                      value={addCommatoNumber(dataInput.Expected_monthly_expenses)}
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
                      value={addCommatoNumber(dataInput.Annual_expense_increase)}
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
                      value={addCommatoNumber(dataInput.Annual_savings_return)}
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
                      value={addCommatoNumber(dataInput.Annual_investment_return)}
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
              <View className="flex-row items-center w-full justify-end">
                <TextF className="text-sm text-label ml-1 ">{dataHausePick.province === 'กรุงเทพมหานคร' ? 'กทม.' : dataHausePick.province}</TextF>
                <FontAwesome5 name="map-marker-alt" size={12} color="#979797" />
              </View>
            </View>
          </View>}
    </View>
    <View className='h-5 '></View>
    <WideBtn id='saveCalRetirementData' activeOpacity={1} text='บันทึก' disabled={!isFully} onPress={havePlant ? handleSaveEditPlant :handleCreatePlan}/>
  </View>
  )
}

export default state4