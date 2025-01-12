import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import  TextF  from '../../components/TextF';
import { FontAwesome6, FontAwesome, MaterialCommunityIcons, Ionicons, AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Logo = require('../../../assets/images/logo.png');


interface MainProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}
const Main: React.FC<MainProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  
  
  const [isAuth, setIsAuth] = useState(true);
  const [havePlant, setHavePlant] = useState(false);
  
  
  
  
  
  
  
  
  
    useEffect(() =>{
      setStateNavbar(true)
      if( !isAuth ){
        setMenu([
          { tag: 'nursingHouses', icon: <Feather name="home" size={30} color="#2a4296" />, text: "บ้านพักคนชรา", bg: "bg-banner" },
          { tag: 'finance', icon: <Ionicons name="document-text-outline" size={34} color="#38b62d" />, text: "คู่มือการเงิน", bg: "bg-bgmenu_Finance" },
          { tag: 'assessmentRisk', icon: <MaterialCommunityIcons name="chart-line" size={29} color="#f04545" />, text: "วัดความเสี่ยงการลงทุน", bg: "bg-bgmenu_Testfinance" },
          { tag: 'calRetirement', icon: <FontAwesome6 name="sack-dollar" size={28} color="#da9e1d" />, text: "คำนวนเงินหลังเกษียณ", bg: "bg-bgmenu_Money" },
          { tag: '', icon: <AntDesign name="questioncircleo" size={30} color="#da9e1d" />, text: "เกษียณพร้อมคืออะไร?", bg: "bg-orange-100" },
        ])
      }
      if( isAuth && !havePlant ){
        setMenu([
          { tag: 'nursingHouses', icon: <Feather name="home" size={30} color="#2a4296" />, text: "บ้านพักคนชรา", bg: "bg-banner" },
          { tag: 'finance', icon: <Ionicons name="document-text-outline" size={34} color="#38b62d" />, text: "คู่มือการเงิน", bg: "bg-bgmenu_Finance" },
          { tag: 'assessmentRisk', icon: <MaterialCommunityIcons name="chart-line" size={29} color="#f04545" />, text: "วัดความเสี่ยงการลงทุน", bg: "bg-bgmenu_Testfinance" },
          { tag: 'calRetirement', icon: <FontAwesome6 name="sack-dollar" size={28} color="#da9e1d" />, text: "คำนวนเงินหลังเกษียณ", bg: "bg-bgmenu_Money" },
          { tag: '', icon: <AntDesign name="questioncircleo" size={30} color="#da9e1d" />, text: "เกษียณพร้อมคืออะไร?", bg: "bg-orange-100" },
        ])
      }
    },[isAuth]);
    


    const [menu, setMenu] = useState([
      { tag: 'nursingHouses', icon: <Feather name="home" size={30} color="#2a4296" />, text: "บ้านพักคนชรา", bg: "bg-banner" },
      { tag: 'finance', icon: <Ionicons name="document-text-outline" size={34} color="#38b62d" />, text: "คู่มือการเงิน", bg: "bg-bgmenu_Finance" },
      { tag: '', icon: <Ionicons name="sync-circle-outline" size={36} color="#19a4ca" />, text: "ปรับแผน", bg: "bg-bgmenu_Change" },
      { tag: 'assessmentRisk', icon: <MaterialCommunityIcons name="chart-line" size={29} color="#f04545" />, text: "วัดความเสี่ยงการลงทุน", bg: "bg-bgmenu_Testfinance" },
      { tag: 'calRetirement', icon: <FontAwesome6 name="sack-dollar" size={28} color="#da9e1d" />, text: "คำนวนเงินหลังเกษียณ", bg: "bg-bgmenu_Money" },
      { tag: '', icon: <AntDesign name="questioncircleo" size={30} color="#da9e1d" />, text: "เกษียณพร้อมคืออะไร?", bg: "bg-orange-100" },
    ])

    const DataNow = new Date();
    const DateNow = DataNow.getDate();
    const MonthNow = DataNow.getMonth();
    const YearNow = DataNow.getFullYear();
    const DayNow = DataNow.getDay();
    const MonthName = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
    const DayName = ['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์'];
    const DateThai = `วัน${DayName[DayNow]} ที่ ${DateNow} ${MonthName[MonthNow]} พ.ศ. ${YearNow+543}`;
  
    
  return (
    <View 
    id='mainContainer'
    className='flex-1'>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      className="flex-1">
        <View
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 5,
            overflow: 'hidden',
          }}
          className='w-full h-72'>
          <LinearGradient
            colors={['#FCFCFC', '#C8D4FF']}
            style={{
              flex: 1,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          >
            <View className='flex-row justify-between mt-5 ml-9'>
              <Image source={Logo} style={styles_pic.logo} />
              <View className='mr-7 mt-3'>
                <TouchableOpacity 
                  id='BtnNotification'
                  activeOpacity={1}
                  onPress={()=> isAuth ? setActiveTab('notification') : setActiveTab('auth')}
                  className=''>
                  {isAuth ? <MaterialCommunityIcons name="bell" size={30} color="#2A4296" />
                  :<TextF className='text-primary text-lg'>เข้าสู่ระบบ</TextF>}
                  
                </TouchableOpacity>
              </View>
            </View>
            <View className='flex-1 justify-between'>
              <View className='flex justify-between px-5 gap-1'>
                <TextF className='text-2xl text-primary py-2'>สวัสดี, คุณพิชั่ย</TextF>
                <TextF className='text-2xl text-primary py-2'>{DateThai}</TextF>
              </View>
              <View className='flex-row justify-between px-5'>
                {/* {quotes.map((quote, index) => (  */}
                  <View className='flex-1'>

                  </View>
                {/* ))} */}
              </View>
            </View>
          </LinearGradient>
        </View>
        
        <View className='flex px-5'>
        {isAuth && havePlant ?
          <>
            <TextF className='pl-5 mt-6 text-label'>ไปให้ถึงเป้าหมายที่วางไว้ </TextF>
            <View className='rounded-xl border border-banner h-28 mt-5 justify-center gap-2'>
              <TextF className=' ml-6 text-normalText text-lg'>จำนวนเงินที่ต้องเก็บในเดือนนี้</TextF>
              <View className='flex-row justify-between items-end'>
                <View className='flex-row gap-2 items-end'>
                  <TextF className='text-3xl ml-6 text-primary'>19,000</TextF>
                  <TextF className='text-lg text-normalText'>บาท</TextF>
                </View>
                <TouchableOpacity
                id='BtnDashboard'
                activeOpacity={1}
                onPress={() => setActiveTab('dashboard')}>
                  <TextF className='text-right mr-5 text-accent h-6'>ดูแผนของฉัน 
                    <AntDesign name="caretright" size={12} color="#F68D2B"/>
                  </TextF>
                </TouchableOpacity>
              </View>
            </View>
          </>
          :isAuth && <View className='shadow-sm bg-secondary2 rounded-xl mt-10 h-26 justify-center mb-3 gap-2'>
            <TouchableOpacity
            id='BtnStartCalRetirement'
            activeOpacity={1}
            onPress={() => setActiveTab('calRetirement')}
            className='rounded-xl h-28 justify-between gap-2 flex-row items-center px-5'>
              <TextF className=' text-normalText text-xl'>มาเริ่มวางแผนแรกของคุณกันเลย!</TextF>
              <View>
                <AntDesign name="caretright" size={25} color="#F68D2B"/>
              </View>
            </TouchableOpacity>
          </View>
          }
          <TextF className=' mt-6 text-label'>บริการที่น่าสนใจ </TextF>

          <View className=" flex-row justify-between mt-5">
            {menu.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                id={'Btn'+item.tag} // BtnnursingHouses Btnfinance BtnassessmentRisk BtncalRetirement
                key={index}
                activeOpacity={1}
                className="w-[25%] items-center"
                onPress={() => setActiveTab(item.tag)}
              >
                <View className={`${item.bg} h-16 w-16 rounded-2xl justify-center items-center`}>
                  {item.icon}
                </View>
                <TextF className="pt-3 text-center text-normalText">{item.text}</TextF>
              </TouchableOpacity>
            ))}
          </View>
          <View className=" flex-row mt-5">
            {menu.slice(4).map((item, index) => (
              <TouchableOpacity
                id={'Btn'+item.tag}
                key={index + 4}
                activeOpacity={1}
                className="w-[25%] items-center"
                onPress={() => setActiveTab(item.tag)}
              >
                <View className={`${item.bg} h-16 w-16 rounded-2xl justify-center items-center`}>
                  {item.icon}
                </View>
                <TextF className="pt-3 text-center text-normalText">{item.text}</TextF>
              </TouchableOpacity>
            ))}
          </View>

          <View className='flex-row justify-between mt-8'>
            <TextF className='text-normalText text-lg pt-1'>บ้านพักคนชราแนะนำ</TextF>
            <TouchableOpacity 
              id='BtnAllNursingHouses'
              activeOpacity={1} 
              onPress={() => setActiveTab('nursingHouses')}
              className='flex-row items-center'>
              <TextF className=" text-primary h-10 pt-2">ดูทั้งหมด</TextF>
            </TouchableOpacity>

          </View>
          <View 
          id='recommendNursingHouses'
          className='flex-row'>
            <ScrollView 
            horizontal={true}
            className='mt-5 h-[130]'> 
                <Image
                source={{ uri: "https://www.therichnursing.com/wp-content/uploads/2024/01/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B1%E0%B8%81-%E0%B8%84%E0%B8%99%E0%B8%8A%E0%B8%A3%E0%B8%B2-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg" }}
                style={styles_pic.image}
                />
                <Image
                source={{ uri: "https://www.therichnursing.com/wp-content/uploads/2024/01/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B1%E0%B8%81-%E0%B8%84%E0%B8%99%E0%B8%8A%E0%B8%A3%E0%B8%B2-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg" }}
                style={styles_pic.image}
                />
                <Image
                source={{ uri: "https://www.therichnursing.com/wp-content/uploads/2024/01/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B1%E0%B8%81-%E0%B8%84%E0%B8%99%E0%B8%8A%E0%B8%A3%E0%B8%B2-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg" }}
                style={styles_pic.image}
                /> 
            </ScrollView>
          </View>
        </View>
        <View className='h-52'></View>
      </ScrollView>
  </View>
  )
}

export default Main

const styles_pic = StyleSheet.create({
  image: {
    width: 180,
    height: 120,
    borderRadius: 13,
    marginRight: 15,
  },
  logo: {
    width: 70,
    height: 70,
  }
});
