import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView } from 'react-native';
import  TextF  from '../../components/TextF';
import SearchBar from '../../components/SearchBar';
import NursingHomeCard from '../../components/NursingHousesCard';
import { FontAwesome6, FontAwesome, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';



interface NursingHousesProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  setSelectedHome: (select: string) => void;
}
const NursingHouses: React.FC<NursingHousesProps> = ({ isDarkMode, setActiveTab, setStateNavbar, setSelectedHome }) => {
  useEffect(() => {
    setStateNavbar(true);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim().toLowerCase()); // เก็บข้อความค้นหาในรูปแบบตัวพิมพ์เล็ก
  };

  const favoriteHomes = [
    {
      id: "1",
      name: "MyLuck Nursinghome",
      description: "ศูนย์ดูแลผู้สูงอายุและดูแลผู้ป่วย สาขาประชาอุทิศ 45 (บางมด)",
      price: "20,000 บาท/เดือน",
      location: "กทม.",
      imageUrl: "https://www.therichnursing.com/wp-content/uploads/2024/01/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B1%E0%B8%81-%E0%B8%84%E0%B8%99%E0%B8%8A%E0%B8%A3%E0%B8%B2-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg",
    },
  ];

  const recommendedHomes = [
    {
      id: "2",
      name: "สถานพักฟื้นผู้ป่วย ผู้สูงอายุ เพชรเกษมเฮลท์แคร์",
      description: "สถานที่ฟื้นฟูสุขภาพสำหรับผู้สูงอายุและผู้ป่วย",
      price: "20,000 บาท/เดือน",
      location: "กทม.",
      imageUrl: "https://udeemeesuk.com/cdn/shop/articles/A1-087-1_grande.jpg?v=1713762079",
    },
    {
      id: "3",
      name: "บ้านคุณจุ๋ม",
      description: "สถานรับดูแลผู้ป่วยจิตเวชและผู้สูงอายุ (บ้านคุณจุ๋ม อิสรภาพ5)",
      price: "2,000 บาท/เดือน",
      location: "กทม.",
      imageUrl: "https://scontent.fbkk24-1.fna.fbcdn.net/v/t39.30808-6/348224569_270374295358366_1042483928026436489_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=KCmmWiMJyNsQ7kNvgGcg4dw&_nc_oc=AdhQ1hLX8LetQH1oV8kAxwZKso6CaTNzNUWlCiSJV1mTQwK0gKfJHez6FGfohg2YTZTYv-frqtUgQ2D15pH5OG4Y&_nc_zt=23&_nc_ht=scontent.fbkk24-1.fna&_nc_gid=AWiAyex7p-vKSz2sBmvgwTI&oh=00_AYDfWV5Y2fO2Ql47qIk5fspoXO71eJNB4G4NASh8wQtUWg&oe=678538AF",
    },
    {
      id: "4",
      name: "คิษฐารักษ์เนอร์สซิ่งโฮม",
      description: "สาขาปิ่นเกล้า, Ditsara Nursing Home Pinklao Branch",
      price: "20,000 บาท/เดือน",
      location: "กทม.",
      imageUrl: "https://www.thaielder.com/datas/nursinghome/47/preview__ittara_ursing_ome_inklao_ranch_65f2d50dc9df4.jpg",
    },
  ];

  // ฟังก์ชันกรองข้อมูลตาม searchQuery
  const filterHomes = (homes: any[]) =>
    homes.filter((home) => home.name.toLowerCase().includes(searchQuery));

  return (
    <View className="flex-1">
      <View className="flex-row mt-5 ml-5 h-14 items-center">
        <Text
          style={{ fontFamily: 'SarabunBold' }}
          className="text-normalText text-2xl ml-3 h-12 pt-2"
        >
          บ้านพักคนชรา
        </Text>
      </View>
      <View className="w-full h-20 mt-4">
        <SearchBar
          placeholder="ค้นหาบ้านพักคนชรา"
          onSearch={handleSearch}
          isDarkMode={false}
        />
      </View>
      <ScrollView>
        <View className="mx-5 justify-between flex-row">
          <TextF className="mt-3 pt-4 text-normalText text-lg">บ้านพักคนชราในแผนของคุณ</TextF>
        </View>
        {filterHomes(favoriteHomes).map((home, index) => (
          <TouchableOpacity key={index} activeOpacity={1} onPress={() => setActiveTab('detailnursingHouses')}>
            <NursingHomeCard
              id={home.id}
              name={home.name}
              description={home.description}
              price={home.price}
              location={home.location}
              imageUrl={home.imageUrl}
            />
          </TouchableOpacity>
        ))}

        <TextF className="ml-5 mt-8 text-lg text-normalText">บ้านพักคนชราแนะนำ</TextF>
        {filterHomes(recommendedHomes).map((home, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => {
              setActiveTab('detailnursingHouses');
              setSelectedHome(home.id);
            }}
          >
            <NursingHomeCard
              id={home.id}
              name={home.name}
              description={home.description}
              price={home.price}
              location={home.location}
              imageUrl={home.imageUrl}
            />
            <View className="flex flex-row items-center px-4 py-4 border-b border-gray-300" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NursingHouses;
