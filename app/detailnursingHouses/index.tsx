import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Linking, Alert,  Dimensions, NativeSyntheticEvent, NativeScrollEvent  } from "react-native";
import { FontAwesome6, FontAwesome, Fontisto, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import TextF from "../components/TextF";
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';

interface Home {
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
  images: [{
    image_id: string,
    image_link: string
  }],
  CreatedAt: string,
  UpdatedAt: string

}

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
  setFormClick: (state: string) => void;
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
  setState,
  setFormClick
}) => {
  const[detailHouses,setDetailHouses] = useState<Home>();
  const[checkFav, setCheckFav] = useState(false)
  const[isAuth, setIsAuth] = useState(false)
  const[havePlan, setHavePlan] = useState(false)
  const[idPlant, setIdPlant] = useState('')
  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    setStateNavbar(false);   
    
    const allopenHouses = async() => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token !== null) {
          setIsAuth(true);
          const responseSelected = await fetch(`${Port.BASE_URL}/user/selected`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        })
          if (!responseSelected.ok) {
            const errorData = await responseSelected.json();
            console.log('errorDataAsset', errorData);
            throw new Error(errorData.message || "Network response was not ok");
          }
          
          const dataOwnHouses = await responseSelected.json();
          
          setIdPlant(dataOwnHouses.result.NursingHouse.nh_id)
        }

        const responseP = await fetch(`${Port.BASE_URL}/user/plan`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataP = await responseP.json();
        if (dataP.result === null) {
          setHavePlan(false)
        }else{
          setHavePlan(true)
        }

        const response = await fetch(`${Port.BASE_URL}/nursinghouses/${homeSelected}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            // "Authorization": Bearer ${token}
          },
        });
        if (!response.ok) {

          const errorData = await response.json();
          console.log('errorDataAsset',errorData)
          throw new Error(errorData.message || "Network response was not ok");
        }
        const data = await response.json();
        setDetailHouses(data.result)





        if(token !== null){
          setIsAuth(true)
          const responseCheckFav = await fetch(`${Port.BASE_URL}/favorite/${homeSelected}`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            },
          });
          const dataFav = await responseCheckFav.json();
          if (dataFav.status === 'Success'){
            setCheckFav(true)
          }
          else{
            setCheckFav(false)
          }
        }
        
      } catch (error) {
        throw new Error(error as string);
      }
        }
        if (homeSelected !== ''){
          allopenHouses()
        }
      }, [homeSelected]);

    // const [isActive, setIsActive] = useState(false);
    const toggleFavorite = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // ถ้าชื่นชอบอยู่แล้ว ให้ลบออก
        if (checkFav === true) {
          const responseDeleteFav = await fetch(`${Port.BASE_URL}/favorite/${detailHouses?.nh_id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            }
          });
    
          if (!responseDeleteFav.ok) {
            const errorData = await responseDeleteFav.json();
            console.log('Delete Error:', errorData);
            throw new Error(errorData.message || "Delete request failed");
          }
          console.log('Deleted from Favorite');
          setCheckFav(false)
        } else {
          // ถ้ายังไม่ชื่นชอบ ให้เพิ่มเข้าไป
          const formData = new FormData();
            if (detailHouses?.nh_id) {
              formData.append('nursingHouseID', detailHouses.nh_id.toString());
            } else {
              console.error('nursingHouseID is undefined');
            }
          const responsePutFav = await fetch(`${Port.BASE_URL}/favorite`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`
            },
            body: formData
          });
    
          if (!responsePutFav.ok) {
            const errorData = await responsePutFav.json();
            console.log('Post Error:', errorData);
            throw new Error(errorData.message || "Post request failed");
          }
          console.log('Added to Favorite');
          setCheckFav(true)
        }
    
      } catch (error) {
        console.error('toggleFavorite Error:', error);
      }
    }
  
    const [dateArray, setDateArray] = useState<{ day: string; time: string }[]>([]);

    useEffect(() => {
      const dateString = detailHouses?.Date?.replace(/'/g, '"') ?? '[]';
      console.log('dateStringdateString',dateString)
      try {
        if (dateString.length === 0) {
          setDateArray([]);
          return;
        }else{
          const parsedArray: string[] = JSON.parse(dateString); // แปลง string เป็น array
          const formattedArray = parsedArray.map((item) => {
            const [day, time] = item.split(': '); 
            return { day, time };
          });
          setDateArray(formattedArray); // อัปเดต state
        }
        
      } catch (error) {
        console.error('Error parsing Date:', error);
      }
    }, [detailHouses]); 
    

    const [currentPage, setCurrentPage] = useState(0);
    const ProgressBar: React.FC<{ currentPage: number; totalPages: number }> = ({
      currentPage,
      totalPages,
    }) => {
      return (
        <View className="flex-row justify-center my-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <View
              key={index}
              className={`h-2 w-8 mx-1 rounded-full ${
                index === currentPage ? 'bg-primary' : 'bg-neutral2'
              }`}
            />
          ))}
        </View>
      );
    };
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(offsetX / screenWidth);
      setCurrentPage(currentIndex);
    };

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
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={screenWidth}  // เลื่อนทีละ 1 รูป
            decelerationRate="fast" 
            onScroll={handleScroll}
            scrollEventThrottle={16}
            className="w-full h-60 rounded-lg"
          >
            {detailHouses?.images.slice(0, 5).map((image) => (
              <Image
                key={image.image_id}
                source={{ uri: image.image_link }}
                style={{ width: screenWidth, height: 240, borderRadius: 10 }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <ProgressBar currentPage={currentPage} totalPages={Math.min(detailHouses?.images.length || 0, 5)} />

        </View>


        <View className="p-5 justify-between gap-4 mt-5">
          {/* Name */}
          <View className="flex-row items-center mb-4 gap-4">
            <View className="justify-center text-center w-12">
              <FontAwesome6 name="house" size={25} color="#2A4296" className=" text-center" />
              <TextF className=" text-center text-sm mt-1">ชื่อ</TextF>
            </View>
            <TextF className="text-lg text-normalText flex-1">{detailHouses?.name}</TextF>
            {isAuth &&<TouchableOpacity
              className="mx-4"
              onPress={toggleFavorite}>
              <Ionicons name="heart" size={30} color={checkFav? '#FF5449' : '#B0B0B0'} 
              />
            </TouchableOpacity>}
          </View>

          {/* Address */}
          <View className="flex-row items-start mb-4 gap-4">
            <View className="justify-center text-center w-12">
              <FontAwesome5 name="map-marker-alt" size={25} color="#F68D2B" className=" text-center"/>
              <TextF className=" text-center text-sm mt-1">ที่อยู่</TextF>
            </View>
            <TextF className=" text-normalText text-lg flex-1">{detailHouses?.address}</TextF>
            <Ionicons name="open-outline" size={25} color="#979797" className="mx-4" 
              onPress={() => detailHouses !== undefined && Linking.openURL(detailHouses?.map)}/>
          </View>

          {/* Price */}
          <View className="flex-row  mb-4 gap-4">
            <View className="justify-center text-center w-12">
              <FontAwesome name="money" size={25} color="#38B62D" className=" text-center"/>
              <TextF className=" text-center text-sm mt-1">ราคา</TextF>
            </View>
            <TextF className=" text-normalText text-lg flex-1">{detailHouses?.price}</TextF>
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
              {detailHouses?.phone_number}
            </Text>
            <Ionicons 
              name="copy-outline" 
              size={25} 
              color="#979797" 
              onPress={() => Clipboard.setString(detailHouses?.phone_number || '')}
            />
            <FontAwesome 
              name="phone" size={25} color="#979797" className="mx-4" 
              activeOpacity={1}
              onPress={() => Linking.openURL(`tel:${detailHouses?.phone_number}`)}/>
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
              onPress={() => detailHouses !== undefined && Linking.openURL(detailHouses?.site)}>
              {detailHouses?.site}
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
              {dateArray.map((hour, index) => (
                <View
                  key={index}
                  className={`flex-row items-center pb-2 ${index === Date.length - 1 ? '' : 'border-b border-gray-200 mb-2'}`}
                >
                  <TextF className="text-normalText flex-1 text-center">{hour.day}</TextF>
                  <TextF className="text-normalText flex-1 text-center">{hour.time}</TextF>
                </View>
              ))}
            </View>
          </View>


        </View>

        {/* Recommend Button */}
        {isAuth  && (havePlan || formPage === 'calRetirement') && idPlant !== detailHouses?.nh_id &&
        <View className="p-5">
          <TouchableOpacity 
         onPress={() => {
          if (formPage === 'calRetirement') {
            if (detailHouses?.nh_id) {
              setHomePickInPlan(detailHouses.nh_id);
              setState(4);
              setHomeSelected('');
            }
          } else {
            if (detailHouses?.nh_id) {
              setActiveTab('calRetirement');
              setFormClick('pickhome');
              setHomePickInPlan(detailHouses.nh_id);
              setState(4);
              setHomeSelected('');
            }
          }
        }}
          className="bg-primary rounded-lg py-3">
            <TextF
              className="text-center text-white text-lg"
            >
              {formPage === 'calRetirement' && 'เลือกบ้านพัก'}
              {formPage === 'index' && 'แทนที่บ้านพัก'}
            </TextF>
          </TouchableOpacity>
        </View>}
        <View className="h-10"/>
      </ScrollView>
    </>
  );
};
export default DetailNursingHouses;