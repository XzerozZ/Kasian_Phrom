import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import NursingHomeCard from '../components/NursingHousesCard';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import TextF from "../components/TextF";

interface FavNursingHousesProps {
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
}

const FavNursingHouses: React.FC<FavNursingHousesProps> = ({ isDarkMode, setActiveTab, setStateNavbar }) => {
  const favoriteHomes = [
    {
      id: "1",
      name: "MyLuck Nursinghome",
      description: "ศูนย์ดูแลผู้สูงอายุและดูแลผู้ป่วย สาขาประชาอุทิศ 45 (บางมด)",
      price: "1000",
      location: "กทม.",
      fullLocation: "กรุงเทพมหานคร",
      imageUrl: "https://www.therichnursing.com/wp-content/uploads/2024/01/%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B1%E0%B8%81-%E0%B8%84%E0%B8%99%E0%B8%8A%E0%B8%A3%E0%B8%B2-%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88.jpg",
      mapLink: "https://maps.app.goo.gl/TXeq6ov2JmdhwHJk6"
    },
  ];

  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState(favoriteHomes);

  // Handle search query
  useEffect(() => {
    if (query === '') {
      setSearchQuery(favoriteHomes);
    } else {
      const filteredHomes = favoriteHomes.filter((home) =>
        home.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchQuery(filteredHomes);
    }
  }, [query]);

  useEffect(() => {
    setStateNavbar(true);
  }, [setStateNavbar]);

  return (
    <View className="flex-1 px-5">
      {/* Header */}
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={() => setActiveTab("nursingHouses")}>
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
        {searchQuery.map((home, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => setActiveTab('detailnursingHouses')}
          >
            <NursingHomeCard
              id={home.id}
              name={home.name}
              description={home.description}
              price={home.price}
              location={home.location}
              imageUrl={home.imageUrl}
              mapLink={home.mapLink}
            />
          </TouchableOpacity>
        ))}
        <View className="h-40"></View>
      </ScrollView>
    </View>
  );
};

export default FavNursingHouses;
