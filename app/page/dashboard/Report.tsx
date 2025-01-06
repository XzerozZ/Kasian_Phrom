import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, Pressable, Modal, FlatList, LayoutAnimation, Platform, UIManager  } from 'react-native';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import ChartCir from '../../components/ChartCir';

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
      amount: 2000
    },
    {
      title: 'บ้านพักคนชรา',
      amount: 500
    },
    {
      title: 'บ้าน',
      amount: 60000
    },
    {
      title: 'รถ',
      amount: 8000
    },
    {
      title: 'รถ',
      amount: 8000
    }
  ])

  const [dataDetail, setDataDetail] = useState([
    {
      title: 'บ้าน',
      amount: 2000000,
      useAge:32,
      MoneyPerMonth: 2000,
    },
    {
      title: 'รถ',
      amount: 50000,
      useAge:5,
      MoneyPerMonth: 8000,
    },
    {
      title: 'บ้านพักคนชรา',
      amount: 50000,
      useAge:5,
      MoneyPerMonth: 8000,
    },
    {
      title: 'เงินเกษียณ',
      amount: 50000,
      useAge:5,
      MoneyPerMonth: 8000,
    },
    {
      title: 'เงินเกษียณ',
      amount: 50000,
      useAge:5,
      MoneyPerMonth: 8000,
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
    age: 20,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 21,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 22,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 23,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 24,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 25,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 26,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 27,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 28,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 29,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 30,
    saving: 2000,
    retire: 50000,
    house: 2000,
    car: 8000,
    total: 50000,
    retireUse: 50000
  },{
    age: 31,
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
    <ScrollView>
        <View className=' flex'>
          <View className='mt-5 flex justify-center items-center'>
            <Text className='text-2xl font-bold'>ชื่อแผน</Text>
          </View>
          <View className='mt-5 flex justify-center items-center bg-neutral mx-8 p-4 rounded-3xl shadow-sm'>
            <View className='flex w-9/12 max-w-96 max-h-96 my-4 items-center justify-center aspect-square'>
              <ChartCir/>
            </View>
            <View className='flex w-full items-end '>
              <Text className='text-label mr-5 text-sm'>กราฟแสดงสัดส่วนจำนวนเงิน</Text>
            </View>
          </View>
          <View className='px-5 mt-5 gap-3'>
            <View className='flex flex-row justify-between items-center'>
              <Text className='text-label'>สถานะปัจจุบัน</Text>
              <Text className=' text-normalText'>บาท</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded'></View>
                <Text className='text-normalText text-lg'>จำนวนเงินที่ต้องเก็บทั้งหมด</Text>
              </View>
              <Text className=' text-normalText text-lg'>20,000,000,000</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-unselectMenu'></View>
                <Text className='text-normalText text-lg'>ต้องเก็บอีก</Text>
              </View>
              <Text className=' text-normalText text-lg'>1,999,999,997,500</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-primary'></View>
                <Text className='text-normalText text-lg'>เงินออม </Text>
                <View className='flex flex-row items-center gap-2'>
                  <FontAwesome6 name='caret-up' size={17} color='#30CC30'/>
                  <Text className=' text-oktext text-sm '>1.5%/ปี</Text>
                </View>
              </View>
              <Text className=' text-normalText text-lg'>2,000</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-primary2'></View>
                <Text className='text-normalText text-lg'>ลงทุน </Text>
                <View className='flex flex-row items-center gap-2'>
                  <FontAwesome6 name='caret-up' size={17} color='#30CC30'/>
                  <Text className=' text-oktext text-sm '>7%/ปี</Text>
                </View>
              </View>
              <Text className=' text-normalText text-lg'>500</Text>
            </View>
          </View>
          <View className="px-5 mt-3">
            <View className="flex flex-row justify-end items-center">
              <TouchableOpacity
                onPress={toggleDropdown}
                activeOpacity={1}
                className="flex flex-row justify-end items-center gap-2 pl-2 py-2">
                <Text className="text-label">สัดส่วนเงินเก็บ</Text>
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
                    <View key={index} className="flex flex-row justify-between items-center px-5">
                      <View className="flex flex-row items-center gap-2">
                        <Text className="text-normalText text-lg ml-2">{item.title} </Text>
                      </View>
                      <Text className="text-normalText text-lg">{item.amount}</Text>
                    </View>
                  ))}
                </View>
            </Animated.ScrollView>
          </View>
          <View className='px-5 mt-5 gap-3'>
            <View className='flex flex-row items-center'>
              <Text className='text-label'>รายระเอียด</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-row items-center gap-2'>
                <View className='w-5 h-5 rounded bg-secondary'></View>
                <Text className='text-normalText text-lg'>เงินเก็บเพื่อเกษียณ</Text>
              </View>
              <Text className=' text-normalText text-lg'>50,000,000</Text>
            </View>
            {/* ------------------------------------------------------------ */}
            <ScrollView 
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className='flex flex-row h-36 mt-3'>
                {dataDetail.map((item, index) => (
                  <View key={index} className='flex w-52 h-32 rounded-xl border border-neutral2 shadow-sm bg-neutral p-3 justify-between mr-3'>
                    <View className='flex flex-row justify-between items-center'>
                      <View className='flex flex-row gap-2'>
                        <FontAwesome6 name='house-chimney' size={18} color='#070F2D'/>
                        <Text className='text-normalText text-lg'>{item.title}</Text>
                      </View>
                      <View className='w-5 h-5 rounded bg-accent'></View>
                    </View>
                    <View className='flex flex-row justify-between items-center'>
                      <Text className='text-normalText text-sm'>ซื้อตอนอายุ {item.useAge} ปี</Text>
                    </View>
                    <View className='flex flex-row justify-between items-center'>
                      <Text className='text-normalText text'>ต้องเก็บ/เดือน</Text>
                      <Text className=' text-normalText text'>{item.MoneyPerMonth}</Text>
                    </View>
                    <View className='flex flex-row justify-between items-center'>
                      <Text className='text-normalText text'>ต้องเก็บทั้งหมด</Text>
                      <Text className=' text-normalText text'>{item.amount}</Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
          <View className='px-5 mt-5 gap-3'>
            <View className='w-full flex flex-row items-center'>
              <Text className='text-label'>บ้านพักคนชรา</Text>
            </View>
            <View className='flex mx-5 rounded-xl shadow-sm mt-3'>
              <View className='flex w-full h-40 bg-stone-200 rounded-t-xl'>
                  {/* รูปบ้านพัก */}
                  <Image
                    source={{
                      uri: 'https://www.mylucknursinghome.com/media/cache/strip/202410/image-gallery/fffd2aab123267ff6a989b5051540d81.jpeg',
                    }}
                    className='w-full h-full rounded-t-xl'
                  />
              </View>

              <View className='flex w-full h-32 bg-neutral rounded-b-xl px-3 justify-around py-2'>
                <Text
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={{ width: '100%', overflow: 'hidden', textAlign: 'left' }}
                  className='text-normalText text-lg'
                >
                  Myluck Nursinghome ศูนย์ดูแลผู้สูงอายุ และดูแลผู้ป่วย สาขาประชาอุทิศ 45 (บางมด)
                </Text>
                <View className='flex flex-row justify-between items-center'>
                  <Text className='text-normalText text-lg'>ราคา/เดือน</Text>
                  <Text className=' text-normalText text-lg'>20,000 บาท</Text>
                </View>
                <View className='flex flex-row justify-between items-center'>
                  <Text className='text-normalText text-lg'>เงินที่ต้องเก็บ/เดือน</Text>
                  <Text className=' text-normalText text-lg'>8,000บาท</Text>
                </View>
                <View className='w-full flex flex-row gap-1 justify-end'>
                    <Text className='text-accent'>ดูรายละเอียด</Text>
                    <FontAwesome6 name="caret-right" size={18} color='#F68D2B'/>
                </View>
              </View>
            </View>
          </View>
          <View className='px-5 mt-8 gap-3'>
            <View className='flex flex-row justify-between items-center'>
              <Text className='text-label'>แผนปัจจุบัน</Text>
              <Text className=' text-normalText '>ปี</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <Text className='text-normalText text-lg'>อายุ</Text>
              <Text className=' text-normalText text-lg'>20</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <Text className='text-normalText text-lg'>อายุที่ต้องการเกษียณ</Text>
              <Text className=' text-normalText text-lg'>50</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
              <Text className='text-normalText text-lg'>อายุที่คาดว่าจะเสียชีวิต</Text>
              <Text className=' text-normalText text-lg'>80</Text>
            </View>
          </View>
          <ScrollView 
            horizontal={true}
            bounces={false}
            overScrollMode="never"
            showsHorizontalScrollIndicator={false}
            className=' my-10 gap-3'>
              <View>
              <View className='h-36 flex flex-row justify-between items-center bg-secondary'>  
                {titleTable.map((item, index) => (
                  <View 
                  key={index} 
                  className='flex flex-col justify-center items-center w-20 px-2 h-full'>
                    <Text className='text-normalText break-words text-center'>{item}</Text>
                  </View>
                ))}
              </View>
              <View>
              {dataTable.map((item, index) => (
                <View key={index} className={`h-12 flex flex-row justify-between items-center ${index % 2 == 1 ? ' bg-gray-200' : 'bg-neutral'}`}>
                  <View className='flex flex-col justify-center items-center w-20 px-2'>
                    <Text className='text-normalText text-center'>{item.age}</Text>
                  </View>
                  <View className='flex flex-col justify-center items-center w-20 px-2'>
                    <Text className='text-normalText text-center'>{item.saving}</Text>
                  </View>
                  <View className='flex flex-col justify-center items-center w-20 px-2'>
                    <Text className='text-normalText text-center'>{item.retire}</Text>
                  </View>
                  <View className='flex flex-col justify-center items-center w-20 px-2'>
                    <Text className='text-normalText text-center'>{item.house}</Text>
                  </View>
                  <View className='flex flex-col justify-center items-center w-20 px-2'>
                    <Text className='text-normalText text-center'>{item.car}</Text>
                  </View>
                  <View className='flex flex-col justify-center items-center w-20 px-2'>
                    <Text className='text-normalText text-center'>{item.total}</Text>
                  </View>
                  <View className='flex flex-col justify-center items-center w-20 px-2'>
                    <Text className='text-normalText text-center'>{item.retireUse}</Text>
                  </View>
                </View>
              ))}
              </View>
            </View>
              
          </ScrollView>
        </View>
      </ScrollView>

  )
}

export default Report