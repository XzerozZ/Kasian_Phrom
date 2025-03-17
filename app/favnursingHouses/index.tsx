import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import NursingHomeCard from '../components/NursingHousesCard';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import TextF from "../components/TextF";
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Home {
  NursingHouse:{
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
    images: [],
    CreatedAt: string,
    UpdatedAt: string
  }
}


interface FavNursingHousesProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  setHomeSelected: (home: any) => void;
  formPage: string;
  setFormPage2: (page: string) => void;
  setState: (state: number) => void;
}

const FavNursingHouses: React.FC<FavNursingHousesProps> = ({ isDarkMode, setActiveTab, setStateNavbar, setHomeSelected, formPage, setFormPage2, setState }) => {
  // const favoriteHomes = [
  //   {
  //     id: "1",
  //     name: "MyLuck Nursinghome",
  //     description: "ศูนย์ดูแลผู้สูงอายุและดูแลผู้ป่วย สาขาประชาอุทิศ 45 (บางมด)",
  //     price: "1000",
  //     location: "กทม.",
  //     fullLocation: "กรุงเทพมหานคร",
  //     imageUrl: "https://www.therichnursing.com/wp-content/uploads/2024/01/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B1%E0%B8%81-%E0%B8%84%E0%B8%99%E0%B8%8A%E0%B8%A3%E0%B8%B2-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg",
  //     mapLink: "https://maps.app.goo.gl/TXeq6ov2JmdhwHJk6"
  //   },
  // ];

  const [query, setQuery] = useState('');
  // const [searchQuery, setSearchQuery] = useState(favoriteHomes);
  

  // Handle search query
  // useEffect(() => {
  //   if (query === '') {
  //     setSearchQuery(favoriteHomes);
  //   } else {
  //     const filteredHomes = favoriteHomes.filter((home) =>
  //       home.name.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setSearchQuery(filteredHomes);
  //   }
  // }, [query]);
  const [favHouses, setFavHouses] = useState<Home[]>([]);
  useEffect(() => {
    // if (formPage === 'index') {
    //   setStateNavbar(true);
    // }else{
    //   setStateNavbar(false);
    // }
    setStateNavbar(false);
  }, []);

  useEffect(() => {
    
    const favAllHouses = async() => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${Port.BASE_URL}/favorite`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        });
        if (!response.ok) {

          const errorData = await response.json();
          console.log('errorDataAsset',errorData)
          throw new Error(errorData.message || "Network response was not ok");
        }

        const data = await response.json();
        setFavHouses(data.result);
        console.log('API Response:', JSON.stringify(data, null, 2));
        console.log('----------------------a',JSON.stringify(data.result, null, 2));
      } catch (error) {
        throw new Error(error as string);
      }
        }

        favAllHouses()
  }, []);

  console.log(favHouses)
  return (
    <View className="flex-1 px-5">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => formPage === 'index' ? setActiveTab("nursingHouses") :formPage === 'profile' ? setActiveTab("profile") : setState(5)}>
          <FontAwesome6 name="angle-left" size={28} color="#070F2D" />
        </TouchableOpacity>
        <Text 
          style={{ fontFamily: 'SarabunBold'}}
          className=' text-normalText text-2xl ml-3 h-12 pt-2'>บ้านพักคนชรา</Text>
      </View>

      {/* Search Bar */}
      <View className="h-16 mt-4">
        <View className={`flex flex-row items-center px-4 py-2 rounded-full bg-neutral2 h-14`}>
          <View className="mr-2">
            <Ionicons name="search" size={24} color="#6780D6" />
          </View>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="ค้นหาบ้านพักคนชรา"
            placeholderTextColor={'#B0B0B0'}
            className="flex-1 text-lg text-normalText pl-2 h-14"
          />
        </View>
      </View>
      <TextF className="mt-3 pt-4 text-normalText text-lg mb-8">บ้านพักคนชราที่ชื่นชอบ</TextF>
      {/* Favorites List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {favHouses.map((Home, index) => (
              <TouchableOpacity
                id='favNursingHomes'
                key={index}
                activeOpacity={1}
                onPress={() => {
                  (formPage === 'index' && setActiveTab('detailnursingHouses'),setHomeSelected(Home.NursingHouse.nh_id), setFormPage2('favnursingHouses'))
                }}
              >
                <NursingHomeCard datahouse={Home.NursingHouse} />
                <View className="flex px-4 my-5 h-[1] bg-unselectInput" />
              </TouchableOpacity>
            ))}
          <View className="h-40"></View>
      </ScrollView>



    </View>
  );
};

export default FavNursingHouses;
