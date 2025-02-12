import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList } from 'react-native';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import TextF from '../../components/TextF';
import DropdownCustom from '../../components/DropdownCustom';
import DebtManagement from '../../debtManagement';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Port from '@/Port';

interface InfoPlanProps{
  allRequiredFund: number;
  all_money: number;
  allretirementfund: number;
  investment: number;
  monthly_expenses: number;
  saving: number;
  stillneed: number;
  plan_name: string;
}

interface SavingProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStatePopup: (state: boolean) => void;
  setDataPopup: (data: any) => void;
  reflesh: boolean;
  setReflesh: (reflesh: boolean) => void;
  planName: string;
  setPlanName: (planName: string) => void;
}



const Saving: React.FC<SavingProps> = ({ isDarkMode, setActiveTab, setStatePopup, setDataPopup, reflesh, setReflesh, planName, setPlanName }) => {



    const [selectedOption, setSelectedOption] = useState('เงินออม');
    const [selectedOptionPriority, setSelectedOptionPriority] = useState('อัตโนมัติ');
    const [isDiposit, setIsDiposit] = useState(true)
    const [amount, setAmount] = useState('')
    const scrollViewRef = useRef<ScrollView>(null);
    const [infoPlan, setInfoPlan] = useState<InfoPlanProps>();
    const [dataAsset, setDataAsset] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDebt, setIsDebt] = useState(false);


    const options = [
        {title:'เงินออม'},
        {title:'ลงทุน'}
    ];
    const [optionsPriority, setOptionsPriority] = useState([
        {title:'อัตโนมัติ'},
        {title:'เงินเกษียณ'},
    ]);




console.log(optionsPriority)

  useEffect(() => {
    const fetchToken = async (token:string ) => {
      try {
        
        const response = await fetch(`${Port.BASE_URL}/user/plan`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

        const responseTransaction = await fetch(`${Port.BASE_URL}/transaction`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
  
        const data = await response.json();
        const dataAsset = await responseAsset.json();
        const dataHouse = await responseHouse.json();
        const dataTransaction = await responseTransaction.json();

        console.log('infoPlan',data.result)
        setInfoPlan(data.result)
        setPlanName(data.result.plan_name)
        // console.log('response', JSON.stringify(response, null, 2));
        if (dataHouse?.result?.NursingHouse?.nh_id !== '00001' && 
          dataHouse?.result?.status !== "Completed") {  
        console.log('dataHouse', dataHouse.result);
        
        setOptionsPriority(prev => [
          ...prev, 
          { title: 'บ้านพักคนชรา' }
        ]);
      }
      

        if (dataAsset?.result) {
          console.log('dataAsset', dataAsset.result);
          setDataAsset(dataAsset.result);
        
          setOptionsPriority(prev => [
            ...prev, 
            ...dataAsset.result
              .filter((item: any) => item.status === "In_Progress")
              .map((item: any) => ({ title: item.name }))
          ]);
        }

        setIsDebt(
          dataTransaction?.result?.some((item: any) => 
            item.status === 'หยุดพัก' || 
            item.status === 'ชำระ' || 
            item.status === 'ค้างชำระ'
          )
        );
        
        
        
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch token from storage', error);
      }
    };
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token !== undefined && token !== null ) {
        fetchToken(token);
      }
    };
    
    getToken();
  }, [reflesh]);


    useEffect(() => {
      if(selectedOption === 'ลงทุน'){
        setSelectedOptionPriority('เงินเกษียณ')
      }else{
        if(!isDiposit){
          setSelectedOptionPriority('เงินเกษียณ')
          setOptionsPriority(optionsPriority.filter((item) => item.title !== 'อัตโนมัติ'))
        }else{
          setOptionsPriority([{ title: 'อัตโนมัติ' }, ...optionsPriority.filter((item) => item.title !== 'อัตโนมัติ')])
          
          setSelectedOptionPriority('อัตโนมัติ')
        }
        }
    }, [selectedOption, isDiposit]);


    const handleManageMoney = () => {
      const ManageMoney = async () => {
        const token = await AsyncStorage.getItem('token');

        try {
          const formData = new FormData();
          formData.append("method", isDiposit ? 'deposit' : 'withdraw' );
          formData.append("type", selectedOption === 'เงินออม' ? 'saving_money' : 'investment' );
          formData.append("money",amount );
          formData.append("category", selectedOptionPriority === 'อัตโนมัติ' ? 'spread' :selectedOptionPriority === 'เงินเกษียณ'? 'retirementplan': selectedOptionPriority === 'บ้านพักคนชรา'? 'house':'asset' );
          formData.append("name", selectedOptionPriority);

          const response = await fetch(`${Port.BASE_URL}/history`, {
            method: 'POST',
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            body: formData
          });
    
          const data = await response.json();
          setStatePopup(true)
          console.log('data', data)
          if(data.message?.toLowerCase().includes('insufficient funds')){
            setDataPopup('Insufficient_savings')
          }else if(data.message === 'insufficient investment funds'){
            setDataPopup('Insufficient_investment')
          }else{
            if (isDiposit){
              if (selectedOption === 'เงินออม'){
                setDataPopup('Successfully_deposited_money_into_savings_account')
              }else{
                setDataPopup('Successfully_deposited_money_into_investment_account')
              }
            }else{
              if (selectedOption === 'เงินออม'){
                setDataPopup('Successfully_withdraw_money_from_savings_account')
              }else{
                setDataPopup('Successfully_withdraw_money_from_investment_account')
              }
            }
          }


          console.log(data)
          setSelectedOption('เงินออม')
          setSelectedOptionPriority('อัตโนมัติ')
          setOptionsPriority([
            {title:'อัตโนมัติ'},
            {title:'เงินเกษียณ'},
          ])
          setIsDiposit(true)
          setAmount('')
          setReflesh(!reflesh)
          
    
        } catch (error) {
          console.error('Failed to fetch token from storage', error);
        }
      };
      ManageMoney();
    }
    


    
    

  return (
    <>
    {loading 
    ?<>
      <View className=' absolute flex-1 bg-slate-300'>
        
      </View>
    </>
    :<ScrollView 
    id='DashboardSavingContainer'
    showsVerticalScrollIndicator={false}
    ref={scrollViewRef} >
    <View className=' flex'>
      <View className='mt-5 flex justify-center items-center'>
      </View>
      <View className='mt-5 flex justify-center items-center bg-bgAuth mx-8 p-3 pt-4 pb-5 rounded-3xl shadow-sm'>
        <View className='flex w-full items-center gap-5'>
          <TextF className='text-lg'>จำนวนเงินที่ต้องเก็บตามแผนในเดือนนี้</TextF>
          <TextF className={`text-3xl scale-125 items-center justify-center flex ${infoPlan?.monthly_expenses !== undefined && Number(infoPlan.monthly_expenses) < 0 ? 'text-oktext' : ''}`}>{infoPlan?.monthly_expenses !== undefined && Number(infoPlan.monthly_expenses) < 0 ? `+ ${Math.abs(infoPlan.monthly_expenses)}`: infoPlan?.monthly_expenses}</TextF>
          <TextF>บาท</TextF>
        </View>
        <View className='mt-5 w-11/12 h-[2] bg-primary'></View>
        <View className='flex flex-row w-full gap-3 '>
            <View className='flex-1 items-center gap-3 pt-5'>
            <TextF className='text-lg'>จำนวนเงินสุทธิ</TextF>
            <TextF className='text-xl'>{infoPlan?.all_money}</TextF>
            <TextF>บาท</TextF>
          </View>
          <View className=' w-[2] bg-primary'></View>
          <View className='flex-1 items-center gap-3 pt-5'>
            <TextF className='text-lg'>จำนวนเงินที่ต้องเก็บ</TextF>
            <TextF className='text-xl '>{infoPlan?.allRequiredFund}</TextF>
            <TextF>บาท</TextF>
          </View>
        </View>
      </View>
    </View>
    <View className='flex flex-row justify-center items-center mt-3 w-full px-5'>
      <TouchableOpacity 
      id='BtnDeposit'
      activeOpacity={1}
      onPress={() => setIsDiposit(true)}
      className={`flex-1 justify-center items-center mt-5 p-3 rounded-l-xl shadow-sm ${isDiposit?'bg-primary':'bg-unselectInput'}`}>
        <TextF className={`text-lg ${isDiposit?'text-white':'text-primary'}`}>ฝากเงิน</TextF>
      </TouchableOpacity>
      <TouchableOpacity 
      id='BtnWithdraw'
      activeOpacity={1}
      onPress={() => setIsDiposit(false)}
      className={`flex-1 justify-center items-center mt-5 p-3 rounded-r-xl shadow-sm ${!isDiposit?'bg-err':' bg-unselectInput'}`}>
        <TextF className={`text-lg ${!isDiposit?'text-white':'text-primary'}`}>ถอนเงิน</TextF>
      </TouchableOpacity>
    </View>
    <View className='flex flex-row justify-between items-start mt-10 h-12 px-5 z-50'>
        <View className='flex-1 items-start'>
          <TextF className='text-lg'>รูปแบบการออม</TextF>
        </View>
        <View className='flex-1 items-end'>
          <DropdownCustom options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        </View>
    </View>
    <View className='flex flex-row justify-between items-start mt-10 h-12 px-5 relative'>
      <View className='flex-1 items-start'>
        <TextF className='text-lg'>ประเภทการออม</TextF>
      </View>
      <View className='flex-1 items-end'>
        <DropdownCustom options={selectedOption === 'ลงทุน' ? [] : optionsPriority} selectedOption={selectedOptionPriority} setSelectedOption={setSelectedOptionPriority}/>
      </View>
    </View>
    <View className=''>
        <TextInput
            id='InputAmount'
            onFocus={() => {
              scrollViewRef.current?.scrollTo({
                  y: 300,
                  animated: true,
              });
            }}
            placeholder="ใส่จำนวนเงิน"
            placeholderTextColor={'#B0B0B0'}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            className={`h-12 mx-5 px-3 mt-5 bg-neutral border-b text-primary ${amount == '' ?'border-unselectInput' :'border-primary'}`}/>


        <TouchableOpacity 
        id='BtnConfirm'
        activeOpacity={amount == '' ? 1 : 0.5}
        className={`mt-5 mx-5 p-3 rounded-xl shadow-sm flex justify-center items-center h-14 ${amount == '' ?' bg-unselectMenu' :' bg-primary'}`}
        onPress={() => amount == '' ? {} : handleManageMoney() } >
            <TextF className='text-white'>ยืนยัน</TextF>
        </TouchableOpacity>

    </View>
    {isDebt && <View className='flex justify-center mt-10 px-5'>
        <TextF className=' text-label'>จัดการข้อมูลหนี้</TextF>
        <TouchableOpacity 
        id='BtnAdjustPlan'
        activeOpacity={1}
        onPress={() => setActiveTab('debtManagement')}
        className='flex flex-row justify-between items-center bg-neutral h-20 p-3 mt-5 border border-err rounded-xl shadow-sm'>
            <TextF className='text-lg py-2'>จัดการข้อมูลหนี้ของคุณ</TextF>
            <View className='flex flex-row gap-1'>
                <TextF className='text-err'>แก้ไขข้อมูล</TextF>
                <FontAwesome6 name="caret-right" size={20} color='#FF5449'/>
            </View>
        </TouchableOpacity>
    </View>}
    <View className='flex justify-center mb-10 mt-5 px-5'>
        <TextF className=' text-label'>ปรับแผน</TextF>
        <TouchableOpacity 
        id='BtnAdjustPlan'
        activeOpacity={1}
        onPress={() => setActiveTab('calRetirement')}
        className='flex flex-row justify-between items-center bg-neutral h-20 p-3 mt-5 border border-unselectMenu rounded-xl shadow-sm'>
            <TextF className='text-lg'>ปรับแผนการเกษียณ</TextF>
            <View className='flex flex-row gap-1'>
                <TextF className='text-accent'>แก้ไขข้อมูล</TextF>
                <FontAwesome6 name="caret-right" size={20} color='#F68D2B'/>
            </View>
        </TouchableOpacity>
    </View>



    
    <View className='h-32'></View>
  </ScrollView>}
  </>
  )
}

export default Saving