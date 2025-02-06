import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, LayoutAnimation, Platform, UIManager  } from 'react-native';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import ChartCir from '../../components/ChartCir';
import  TextF  from '../../components/TextF';

interface ReportProps{
  isDarkMode: boolean;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Report: React.FC<ReportProps> = ({ isDarkMode }) => {
  const [statePart, setStatePart] = useState(false)



  const [dataPart, setDataPart] = useState([
    {
      title: 'เงินเกษียณ',
      amount: '7,664,131'
    },
    {
      title: 'บ้านพักคนชรา',
      amount: '0'
    },
    {
      title: 'บ้าน',
      amount: '0'
    },
    {
      title: 'รถ',
      amount: '0'
    },
    {
      title: 'รถ',
      amount: '0'
    }
  ])

  const [dataDetail, setDataDetail] = useState([
    {
      title: 'บ้าน',
      amount: '0',
      useAge:32,
      MoneyPerMonth: '0',
    },
    {
      title: 'รถ',
      amount: '0',
      useAge:5,
      MoneyPerMonth: '0',
    },
    {
      title: 'บ้านพักคนชรา',
      amount: '0',
      useAge:5,
      MoneyPerMonth: '0',
    },
    {
      title: 'เงินเกษียณ',
      amount: '0',
      useAge:5,
      MoneyPerMonth: '0',
    },
    {
      title: 'เงินเกษียณ',
      amount: '0',
      useAge:5,
      MoneyPerMonth: '0',
    }
  ])


  const [titleTable, setTitleTable] = useState([
    'อายุ',
    'เงินออมปัจจุบัญ',
    'เก็บเงินเกษียณ/ปี',
    'บ้าน/ปี',
    'รถ/ปี',
    'รวมเงินทั้งหมด',
    'เงินเกษียณที่นำมาใช้/ปี'
  ])
  const [dataTable, setDataTable] = useState([{
    age: 45,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 46,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 47,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 48,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 49,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 50,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 51,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 52,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 53,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 54,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 55,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 56,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  }])



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

  return (
    <ScrollView 
    id='DashboardReportContainer'
    showsVerticalScrollIndicator={false}>
        <View className=' flex'>
          <View className='mt-5 flex justify-center items-center'>
            <TextF className='text-2xl font-bold'>ชื่อแผน</TextF>
          </View>
          <View className='mt-5 flex justify-center items-center bg-neutral mx-8 p-4 rounded-3xl shadow-sm'>
            <View className='flex w-9/12 max-w-96 max-h-96 my-4 items-center justify-center aspect-square'>
              <ChartCir/>
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
              <TextF className=' text-normalText text-lg'>7,664,131</TextF>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-unselectMenu'></View>
                <TextF className='text-normalText text-lg'>ต้องเก็บอีก</TextF>
              </View>
              <TextF className=' text-normalText text-lg'>7,564,131</TextF>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-primary'></View>
                <TextF className='text-normalText text-lg'>เงินออม </TextF>
                <View className='flex flex-row items-center gap-2'>
                  <FontAwesome6 name='caret-up' size={17} color='#30CC30'/>
                  <TextF className=' text-oktext text-sm '>1.5%/ปี</TextF>
                </View>
              </View>
              <TextF className=' text-normalText text-lg'>100,000</TextF>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-primary2'></View>
                <TextF className='text-normalText text-lg'>ลงทุน </TextF>
                <View className='flex flex-row items-center gap-2'>
                  <FontAwesome6 name='caret-up' size={17} color='#30CC30'/>
                  <TextF className=' text-oktext text-sm '>7%/ปี</TextF>
                </View>
              </View>
              <TextF className=' text-normalText text-lg'>0</TextF>
            </View>
          </View>
          <View className="px-5 mt-3">
            <View className="flex flex-row justify-end items-center">
              <TouchableOpacity
                id='BtnPartOfMoney'
                onPress={toggleDropdown}
                activeOpacity={1}
                className="flex flex-row justify-end items-center gap-2 pl-2 py-2">
                <TextF className="text-label">สัดส่วนเงินเก็บ</TextF>
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
                  {/* <View className="border-t border-unselectInput mb-3"></View> */}
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
              <TextF className=' text-normalText text-lg'>7,664,131</TextF>
            </View>
            {/* ------------------------------------------------------------ */}
            <ScrollView 
              id='ScrollViewDetail'
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className='flex flex-row h-36 mt-3'>
                {dataDetail.map((item, index) => (
                  <View 
                  id={'Detail'+item.title}
                  key={index} 
                  className='flex w-52 h-32 rounded-xl border border-neutral2 shadow-sm bg-neutral p-3 justify-between mr-3'>
                    <View className='flex flex-row justify-between items-center'>
                      <View className='flex flex-row gap-2'>
                        <FontAwesome6 name='house-chimney' size={18} color='#070F2D'/>
                        <TextF className='text-normalTextF text-lg'>{item.title}</TextF>
                      </View>
                      <View className='w-5 h-5 rounded bg-accent'></View>
                    </View>
                    <View className='flex flex-row justify-between items-center'>
                      <TextF className='text-normalTextF text-sm'>ซื้อตอนอายุ {item.useAge} ปี</TextF>
                    </View>
                    <View className='flex flex-row justify-between items-center'>
                      <TextF className='text-normalTextF text'>ต้องเก็บ/เดือน</TextF>
                      <TextF className=' text-normalTextF text'>{item.MoneyPerMonth}</TextF>
                    </View>
                    <View className='flex flex-row justify-between items-center'>
                      <TextF className='text-normalTextF text'>ต้องเก็บทั้งหมด</TextF>
                      <TextF className=' text-normalTextF text'>{item.amount}</TextF>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
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
                      uri: 'https://www.mylucknursinghome.com/media/cache/strip/202410/image-gallery/fffd2aab123267ff6a989b5051540d81.jpeg',
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
                  Myluck Nursinghome ศูนย์ดูแลผู้สูงอายุ และดูแลผู้ป่วย สาขาประชาอุทิศ 45 (บางมด)
                </Text>
                <View className='flex flex-row justify-between items-center'>
                  <TextF className='text-normalText text-lg'>ราคา/เดือน</TextF>
                  <TextF className=' text-normalText text-lg'>0 บาท</TextF>
                </View>
                <View className='flex flex-row justify-between items-center'>
                  <TextF className='text-normalText text-lg'>เงินที่ต้องเก็บ/เดือน</TextF>
                  <TextF className=' text-normalText text-lg'>0 บาท</TextF>
                </View>
                <View className='w-full flex flex-row gap-1 justify-end'>
                    <TextF className='text-accent'>ดูรายละเอียด</TextF>
                    <FontAwesome6 name="caret-right" size={18} color='#F68D2B'/>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className='h-32'></View>
      </ScrollView>

  )
}

export default Report