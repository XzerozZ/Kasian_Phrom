import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, LayoutAnimation, Platform, UIManager  } from 'react-native';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import ChartCir from '../../components/ChartCir';
import  TextF  from '../../components/TextF';
import Port from '@/Port';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface NursingHouse {
  monthly_expenses: number,
  current_money: number,
  status: string,
  NursingHouse: {
    nh_id: string,
    name: string,
    province: string,
    address: string,
    price: number,
    map: string,
    phone_number: string,
    site: string,
    Date: string,
    Status: string,
    images: [
      {
        image_id: string,
        image_link: string
      }
    ],
    CreatedAt: string,
    UpdatedAt: string
  }
  
}


interface Asset {
  asset_id:string
  total_cost: string;
  end_year: string;
  type: string;
  name: string;
  status: boolean
  monthly_expenses: string;
  
}

interface InfoPlanProps{
  allRequiredFund: number;
  all_money: number;
  allretirementfund: number;
  investment: number;
  monthly_expenses: number;
  saving: number;
  stillneed: number;
  annual_savings_return: number;
  annual_investment_return: number;
  plan_name: string;
}
interface series{
  value: number;
  color: string;
}

interface dataPartProp{
  title: string;
  amount: number;
}

interface ReportProps{
  isDarkMode: boolean;
  reflesh: boolean;
  planName: string;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Report: React.FC<ReportProps> = ({ isDarkMode, reflesh, planName }) => {
  const [statePart, setStatePart] = useState(false)
  const [infoPlan, setInfoPlan] = useState<InfoPlanProps>();
  const [dataAsset, setDataAsset] = useState<Asset[]>([])
  const [dataHouse, setDataHouse] = useState<NursingHouse>()
  const [series, setSeries] = useState<series[]>([])
  const [series2, setSeries2] = useState<series[]>([{ value: 1, color: '#FCE49E' }])
  const [colorsCat, setColorsCat] = useState([
    '#F68D2B',
    '#FFB36C',
    '#EFBCD5',
    '#51BBFE',
    '#6095DA',
    '#18798A',
    '#4C6930',
    '#404E7C',
    '#8963BA',
    '#DB5461',
    '#8BBF9F',
    '#635380',
    '#685044',
    '#F6AE2D',
  ]);



  const [dataPart, setDataPart] = useState<dataPartProp[]>([])







  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStatePart(!statePart);

    Animated.timing(animatedHeight, {
      toValue: statePart ? 0 : ((dataPart.length * 30)+50 < 300)? (dataPart.length * 30)+50:300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };


  useEffect (() => {
    const fetchToken = async (token:string ) => {
      try {
        console.log('token:', token);
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
  
        const data = await response.json();
        const dataAsset = await responseAsset.json();
        const dataHouse = await responseHouse.json();
        setInfoPlan(data.result)
        setSeries([
          { value: data.result.saving , color: '#2A4296' },
          { value: data.result.investment , color: '#6780D6' },
          { value: data.result.stillneed, color: '#C9C9C9' },
        ])
        console.log('',data.result.saving, data.result.investment, data.result.stillneed) 
        setDataPart([ { title: 'เงินเกษียณ', amount: data.result.plan_saving }])

        if (dataHouse?.result?.NursingHouse?.nh_id !== '00001') {
          console.log('dataHouse.result:', JSON.stringify(dataHouse.result, null, 2));
          setDataHouse(dataHouse.result);
          setDataPart(prev => [...prev, { title: 'บ้านพักคนชรา', amount: dataHouse.result.current_money }]);
        }
        
        if (dataAsset?.result) {
          console.log('dataAsset.result:', JSON.stringify(dataAsset.result, null, 2));
          setDataAsset(dataAsset.result);
        
          dataAsset.result.forEach((item: any) => {
            setDataPart(prev => [...prev, { title: item.name, amount: item.current_money }]);
          });
        
          setSeries2(prevSeries => {
            const newSeries = dataAsset.result.map((item: any, index:number) => ({
              value: item.total_cost,
              color: colorsCat[index % colorsCat.length],
            }));
        
            return [
              ...newSeries,
              { value: data.result.allretirementfund, color: '#FCE49E' }
            ];
          });
        }
        
        
        
        
        
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
  } ,[reflesh])
console.log('series:', series)
console.log('series2:', series2)

  return (
    <ScrollView 
    id='DashboardReportContainer'
    showsVerticalScrollIndicator={false}>
        <View className=' flex'>
          <View className='mt-5 flex justify-center items-center'>
            <TextF className='text-2xl font-bold'>{planName}</TextF>
          </View>
          <View className='mt-5 flex justify-center items-center bg-neutral mx-8 p-4 rounded-3xl shadow-sm'>
            <View className='flex w-9/12 max-w-96 max-h-96 my-4 items-center justify-center aspect-square'>
              <ChartCir series={series} series2={series2}/>
            </View>
            <View className='flex w-full items-end '>
              <TextF className='text-label mr-5 text-sm'>กราฟแสดงสัดส่วนจำนวนเงิน</TextF>
            </View>
          </View>
          <View className='px-5 mt-5 gap-3'>
            <View className='flex flex-row justify-between items-center'>
              <TextF className='text-label'>สถานะปัจจุบัน</TextF>
              <TextF className=' text-normalText'>บาท</TextF>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded'></View>
                <TextF className='text-normalText text-lg'>จำนวนเงินที่ต้องเก็บทั้งหมด</TextF>
              </View>
              <TextF className=' text-normalText text-lg'>{infoPlan?.allRequiredFund}</TextF>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-unselectMenu'></View>
                <TextF className='text-normalText text-lg'>ต้องเก็บอีก</TextF>
              </View>
              <TextF className=' text-normalText text-lg'>{infoPlan?.stillneed}</TextF>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-primary'></View>
                <TextF className='text-normalText text-lg'>เงินออม </TextF>
                <View className='flex flex-row items-center gap-2'>
                  <FontAwesome6 name='caret-up' size={17} color='#30CC30'/>
                    <TextF className=' text-oktext text-sm '>{infoPlan?.annual_savings_return}%/ปี</TextF> 
                </View>
              </View>
              <TextF className=' text-normalText text-lg'>{infoPlan?.saving}</TextF>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-primary2'></View>
                <TextF className='text-normalText text-lg'>ลงทุน </TextF>
                <View className='flex flex-row items-center gap-2'>
                  <FontAwesome6 name='caret-up' size={17} color='#30CC30'/>
                  <TextF className=' text-oktext text-sm '>{infoPlan?.annual_investment_return}%/ปี</TextF>
                </View>
              </View>
              <TextF className=' text-normalText text-lg'>{infoPlan?.investment}</TextF>
            </View>
          </View>
          <View className="px-5 mt-3">
            <View className="flex flex-row justify-end items-center">
              <TouchableOpacity
                id='BtnPartOfMoney'
                onPress={toggleDropdown}
                activeOpacity={1}
                className="flex flex-row justify-end items-center gap-2 pl-2 py-2">
                <TextF className="text-label">สัดส่วนเงินออม</TextF>
                {statePart ? (
                  <FontAwesome6 name="angle-up" size={18} color="#B0B0B0" />
                ) : (
                  <FontAwesome6 name="angle-down" size={18} color="#B0B0B0" />
                )}
              </TouchableOpacity>
            </View>

            {/* คำนวณความสูงของ dropdown */}
            {statePart && <View className="border-t border-unselectInput"></View>}
            <Animated.ScrollView 
            className='pt-3'
            style={{ height: animatedHeight, overflow: 'hidden', maxHeight: 300 }}>
                <View className="mt-1 gap-3">
                  {dataPart.map((item, index) => (
                    <View 
                    id={'PartOfMoney'+item.title}
                    key={index} 
                    className="flex flex-row justify-between items-center px-5">
                      <View className="flex flex-row items-center gap-2">
                        <TextF className="text-normalText text-lg ml-2">{item.title} </TextF>
                      </View>
                      <TextF className="text-normalText text-lg">{item.amount}</TextF>
                    </View>
                  ))}
                </View>
            </Animated.ScrollView>
          </View>
          <View className='px-5 mt-5 gap-3'>
            <View className='flex flex-row items-center'>
              <TextF className='text-label'>รายระเอียด</TextF>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-secondary'></View>
                <TextF className='text-normalText text-lg'>เงินเก็บเพื่อเกษียณ</TextF>
              </View>
              <TextF className=' text-normalText text-lg'>{infoPlan?.allretirementfund}</TextF>
            </View>
            {/* ------------------------------------------------------------ */}
            <ScrollView 
              id='ScrollViewDetail'
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className='flex flex-row h-36 mt-3'>
                {dataAsset.map((item, index) => (
                  <View 
                  id={'dataAsset'}
                  key={index} 
                  className='flex w-52 h-32 rounded-xl border border-neutral2 shadow-sm bg-neutral p-3 justify-between mr-3'>
                    <View className='flex flex-row justify-between items-center'>
                      <View className='flex flex-row gap-2'>
                        {item.type == 'home' && <FontAwesome6 name="house-chimney" size={18} color="#070F2D" /> }
                        {item.type == 'child' && <MaterialIcons name="child-friendly" size={23} color="#070F2D" /> }
                        {item.type == 'car' && <FontAwesome6 name="car" size={18} color="#070F2D" /> }
                        {item.type == 'travel' && <FontAwesome6 name="plane-departure" size={18} color="#070F2D" /> }
                        {item.type == 'marry' && <Ionicons name="heart" size={22} color="#070F2D" /> }
                        {item.type == 'emergencyMoney' && <FontAwesome5 name="hospital-alt" size={18} color="#070F2D" /> }
                        <TextF className='text-normalTextF text-lg'>{item.name}</TextF>
                      </View>
                      <View 
                      style={{backgroundColor: colorsCat[index % colorsCat.length]}}
                      className={`w-5 h-5 rounded `}></View>
                    </View>
                    <View className='flex flex-row justify-between items-center'>
                      <TextF className='text-normalTextF text-sm'>ซื้อตอนอายุ {item.end_year} ปี</TextF>
                    </View>
                    <View className='flex flex-row justify-between items-center'>
                      <TextF className='text-normalTextF text'>ต้องเก็บ/เดือน</TextF>
                      <TextF className=' text-normalTextF text'>{item.monthly_expenses}</TextF>
                    </View>
                    <View className='flex flex-row justify-between items-center'>
                      <TextF className='text-normalTextF text'>ต้องเก็บทั้งหมด</TextF>
                      <TextF className=' text-normalTextF text'>{item.total_cost}</TextF>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
          {dataHouse !== undefined &&
          <View className='px-5 mt-5 gap-3'>
            <View className='w-full flex flex-row items-center'>
              <TextF className='text-label'>บ้านพักคนชรา</TextF>
            </View>
            <View className='flex mx-2 rounded-xl shadow-sm mt-3'>
              <View 
              id='NursingHouseSelect'
              className='flex w-full h-40 bg-stone-200 rounded-t-xl overflow-hidden'>
                  {/* รูปบ้านพัก */}
                  <Image
                    source={{
                      uri: dataHouse.NursingHouse.images[0].image_link,
                    }}
                    className='w-full h-full '
                  />
              </View>
              <View className='flex w-full h-32 bg-neutral rounded-b-xl px-3 justify-around py-2'>
                <Text
                  className='text-normalText text-lg'
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={{ width: '100%', overflow: 'hidden', textAlign: 'left', fontFamily: 'SarabunRegular' }}
                >
                  {dataHouse.NursingHouse.name}
                </Text>
                <View className='flex flex-row justify-between items-center'>
                  <TextF className='text-normalText text-lg'>ราคา/เดือน</TextF>
                  <TextF className=' text-normalText text-lg'>{dataHouse.NursingHouse.price} บาท</TextF>
                </View>
                <View className='flex flex-row justify-between items-center'>
                  <TextF className='text-normalText text-lg'>เงินที่ต้องเก็บ/เดือน</TextF>
                  <TextF className=' text-normalText text-lg'>{dataHouse.monthly_expenses} บาท</TextF>
                </View>
                <View className='w-full flex flex-row gap-1 justify-end'>
                    <TextF className='text-accent'>ดูรายละเอียด</TextF>
                    <FontAwesome6 name="caret-right" size={18} color='#F68D2B'/>
                </View>
              </View>
            </View>
          </View>}
        </View>
        <View className='h-32'></View>
      </ScrollView>

  )
}

export default Report