import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Linking, Alert } from "react-native";
import { FontAwesome6, FontAwesome, Fontisto, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import TextF from "../components/TextF";

interface DetailNursingHousesProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  homeSelected: string;
  setHomeSelected: (home: any) => void;
  formPage: string;
  state: number | null;
  homePickInPlan: string;
  setHomePickInPlan: (home: string) => void;
  setState: (state: number) => void;
}

const DetailNursingHouses: React.FC<DetailNursingHousesProps> = ({
  setActiveTab,
  setStateNavbar,
  homeSelected,
  setHomeSelected,
  formPage,
  state,
  homePickInPlan,
  setHomePickInPlan,
  setState
}) => {
  useEffect(() => {
    setStateNavbar(false);
  }, []);
  const [isActive, setIsActive] = useState(true);

  const nursingHome = {
    id: "00002",
    name: "สถานพักฟื้นผู้ป่วย ผู้สูงอายุ เพชรเกษมเฮลท์แคร์",
    address: "164 177-178 ซอย เพชรเกษม 14 แขวงวัดท่าพระ เขตบางกอกใหญ่ กรุงเทพมหานคร",
    price: "เริ่มต้น 20,000 บาทต่อเดือน",
    phone: "093 592 2595",
    website: "https://www.google.com/maps",
    imageUrl: "https://udeemeesuk.com/cdn/shop/articles/A1-087-1_grande.jpg?v=1713762079",
    maplink: "https://maps.app.goo.gl/TXeq6ov2JmdhwHJk6",
    hours: [
      { day: "จันทร์", time: "24 ชม." },
      { day: "อังคาร", time: "24 ชม." },
      { day: "พุธ", time: "24 ชม." },
      { day: "พฤหัสบดี", time: "24 ชม." },
      { day: "ศุกร์", time: "24 ชม." },
      { day: "เสาร์", time: "24 ชม." },
      { day: "อาทิตย์", time: "24 ชม." },
    ],
  };
  console.log('homeSelected',homeSelected)
  return (
    <>
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => formPage==='index'? setActiveTab("nursingHouses"):setHomeSelected('')}>
          <FontAwesome6 name="angle-left" size={28} color="#070F2D" />
        </TouchableOpacity>
        <Text 
          style={{ fontFamily: 'SarabunBold'}}
          className=' text-normalText text-2xl ml-3 h-12 pt-2'>บ้านพักคนชรา</Text>
      </View>

      {/* Content */}
      <ScrollView className="bg-white">
        {/* Image */}
        <View className="mx-4">
          <Image
            source={{ uri: nursingHome.imageUrl }}
            className="w-full h-60 rounded-lg"
            resizeMode="cover"
          />
        </View>

        <View className="p-5 justify-between gap-4 mt-5">
          {/* Name */}
          <View className="flex-row items-center mb-4 gap-4">
            <View className="justify-center text-center w-12">
              <FontAwesome6 name="house" size={25} color="#2A4296" className=" text-center" />
              <TextF className=" text-center text-sm mt-1">ชื่อ</TextF>
            </View>
            <TextF className="text-lg text-normalText flex-1">{nursingHome.name}</TextF>
            <TouchableOpacity
              className="mx-4"
              onPress={() => setIsActive(!isActive)}>
              <Ionicons name="heart" size={30} color={isActive ? '#FF5449' : '#B0B0B0'} 
              />
            </TouchableOpacity>
          </View>

          {/* Address */}
          <View className="flex-row items-start mb-4 gap-4">
            <View className="justify-center text-center w-12">
              <FontAwesome5 name="map-marker-alt" size={25} color="#F68D2B" className=" text-center"/>
              <TextF className=" text-center text-sm mt-1">ที่อยู่</TextF>
            </View>
            <TextF className=" text-normalText text-lg flex-1">{nursingHome.address}</TextF>
            <Ionicons name="open-outline" size={25} color="#979797" className="mx-4" 
              onPress={() => Linking.openURL(nursingHome.website)}/>
          </View>

          {/* Price */}
          <View className="flex-row  mb-4 gap-4">
            <View className="justify-center text-center w-12">
              <FontAwesome name="money" size={25} color="#38B62D" className=" text-center"/>
              <TextF className=" text-center text-sm mt-1">ราคา</TextF>
            </View>
            <TextF className=" text-normalText text-lg flex-1">{nursingHome.price}</TextF>
          </View>

          {/* Phone */}
          <View className="flex-row  mb-4 gap-4">
            <View className="justify-center text-center w-12">
              <FontAwesome6 name="phone" size={25} color="#070F2D" className=" text-center"/>
              <TextF className=" justify-center text-center text-sm mt-1" >โทร</TextF>
            </View>
            <Text
              className=" text-normalText text-lg flex-1"
              style={{fontFamily: 'SarabunRegular'}} 
            >
              {nursingHome.phone}
            </Text>
            <Ionicons name="copy-outline" size={25} color="#979797" className=""/>
            <FontAwesome 
              name="phone" size={25} color="#979797" className="mx-4" 
              activeOpacity={1}
              onPress={() => Linking.openURL(`tel:${nursingHome.phone}`)}/>
          </View>

          {/* Website */}
          <View className="flex-row  text-lg mb-6 gap-4">
            <View className="justify-center text-center w-12">
              <FontAwesome name="globe" size={25} color="#6780D6" className=" text-center" />
              <TextF className=" text-center text-sm mt-1">เว็บไซต์</TextF>
            </View>
            <Text
              className=" text-normalText underline flex-1 text-lg"
              style={{fontFamily: 'SarabunRegular'}} 
              onPress={() => Linking.openURL(nursingHome.website)}
            >
              {nursingHome.website}
            </Text>
          </View>

          {/* Operating Hours */}
          <View className="flex-row items-start">
            <View className="justify-center text-center w-12">
              <Fontisto name="clock" size={25} color="#FF5449" className=" text-center" />
              <TextF className=" text-sm mt-1 w-12 text-center ">เวลาเปิด/ปิด</TextF> 
            </View>
            <View className="border border-gray-300 rounded-md p-3 ml-4 w-60">
              {/* หัวตาราง */}
              <View className="flex-row items-center justify-between border-b border-gray-400 pb-2 mb-3">
                <TextF className="text-normalText font-bold flex-1 text-center">วัน</TextF>
                <TextF className="text-normalText font-bold flex-1 text-center">เวลา</TextF>
              </View>

              {/* ตารางเวลา */}
              {nursingHome.hours.map((hour, index) => (
                <View
                  key={index}
                  className={`flex-row items-center pb-2 ${index === nursingHome.hours.length - 1 ? '' : 'border-b border-gray-200 mb-2'}`}
                >
                  <TextF className="text-normalText flex-1 text-center">{hour.day}</TextF>
                  <TextF className="text-normalText flex-1 text-center">{hour.time}</TextF>
                </View>
              ))}
            </View>
          </View>


        </View>

        {/* Recommend Button */}
        <View className="p-5">
          <TouchableOpacity 
          onPress={() => formPage === 'calRetirement' ? (setHomePickInPlan(nursingHome.id), setState(4), setHomeSelected('')) : setActiveTab('index')}
          className="bg-primary rounded-lg py-3">
            <TextF
              className="text-center text-white text-lg"
            >
              {formPage === 'calRetirement' && 'เลือกบ้านพัก'}
              {formPage === 'index' && 'แทนที่บ้านพัก'}
            </TextF>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailNursingHouses;
