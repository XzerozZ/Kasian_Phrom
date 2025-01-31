import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import  TextF  from '../../components/TextF';
import NursingHomeCard from '../../components/NursingHousesCard';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import Filter from './filter';



  interface Home {
    id: string;
    name: string;
    description: string;
    price: string;
    location: string;
    imageUrl: string;
    mapLink: string;
  }

interface NursingHousesProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  setSelectedHome: (select: string) => void;
}
const NursingHouses: React.FC<NursingHousesProps> = ({ isDarkMode, setActiveTab, setStateNavbar, setSelectedHome }) => {
  useEffect(() => {
    setStateNavbar(true);
    setShowData(recommendedHomes);
  }, []);

  const [state, setState] = useState(false);
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

  const recommendedHomes = [
    {
      id: "2",
      name: "สถานพักฟื้นผู้ป่วย ผู้สูงอายุ เพชรเกษมเฮลท์แคร์",
      description: "สถานที่ฟื้นฟูสุขภาพสำหรับผู้สูงอายุและผู้ป่วย",
      price: "25000",
      location: "กทม.",
      fullLocation: "กรุงเทพมหานคร",
      imageUrl: "https://udeemeesuk.com/cdn/shop/articles/A1-087-1_grande.jpg?v=1713762079",
      mapLink: "https://maps.app.goo.gl/TXeq6ov2JmdhwHJk6"
    },
    {
      id: "3",
      name: "บ้านคุณจุ๋ม",
      description: "สถานรับดูแลผู้ป่วยจิตเวชและผู้สูงอายุ (บ้านคุณจุ๋ม อิสรภาพ5)",
      price: "2000",
      location: "กทม.",
      fullLocation: "กรุงเทพมหานคร",
      imageUrl: "https://scontent.fbkk24-1.fna.fbcdn.net/v/t39.30808-6/348224569_270374295358366_1042483928026436489_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=KCmmWiMJyNsQ7kNvgGcg4dw&_nc_oc=AdhQ1hLX8LetQH1oV8kAxwZKso6CaTNzNUWlCiSJV1mTQwK0gKfJHez6FGfohg2YTZTYv-frqtUgQ2D15pH5OG4Y&_nc_zt=23&_nc_ht=scontent.fbkk24-1.fna&_nc_gid=AWiAyex7p-vKSz2sBmvgwTI&oh=00_AYDfWV5Y2fO2Ql47qIk5fspoXO71eJNB4G4NASh8wQtUWg&oe=678538AF",
      mapLink: "https://maps.app.goo.gl/TXeq6ov2JmdhwHJk6"
    },
    {
      id: "4",
      name: "คิษฐารักษ์เนอร์สซิ่งโฮม",
      description: "สาขาปิ่นเกล้า, Ditsara Nursing Home Pinklao Branch",
      price: "30000",
      location: "กทม.",
      fullLocation: "กรุงเทพมหานคร",
      imageUrl: "https://www.thaielder.com/datas/nursinghome/47/preview__ittara_ursing_ome_inklao_ranch_65f2d50dc9df4.jpg",
      mapLink: "https://maps.app.goo.gl/TXeq6ov2JmdhwHJk6"
    },
  ];
  
  const [searchQuery, setSearchQuery] = useState<Home[]>([]);

  const [query, setQuery] = useState('');

  const [stateFilter, setStateFilter] = useState(false);
  const [queryFilter, setQueryFilter] = useState({
    startPrice: '',
    endPrice: '',
    location: [] as string[],
  });
  const [showData, setShowData] = useState([{
    id: "",
    name: "",
    description: "",
    price: "",
    location: "",
    imageUrl: "",
    mapLink: "",
  }]);

  useEffect(() => {

    if (query === '') {
      setSearchQuery(showData);
      return;
    }else{
      const filteredHomes = showData.filter((home) =>
      home.name.toLowerCase().includes(query.toLowerCase()) // เปรียบเทียบข้อความแบบไม่สนใจตัวพิมพ์ใหญ่-เล็ก
    );
    setSearchQuery(filteredHomes);
  }

  }, [query]);


  useEffect(() => {

      if(queryFilter.location.length > 0) {
      const filteredHomes = recommendedHomes.filter((home) =>
      queryFilter.location.some(location => home.fullLocation.toLowerCase().includes(location.toLowerCase())));

        if (queryFilter.startPrice !== '' && queryFilter.endPrice !== '') {
          const filteredHomesP = filteredHomes.filter((home) =>
          parseInt(home.price) >= parseInt(queryFilter.startPrice) && parseInt(home.price) <= parseInt(queryFilter.endPrice)); 
          setShowData(filteredHomesP);
          setSearchQuery(filteredHomesP);
        }else if( queryFilter.startPrice !== '' && queryFilter.endPrice === ''){
          const filteredHomesP = filteredHomes.filter((home) =>
          parseInt(home.price) >= parseInt(queryFilter.startPrice)); 
          setShowData(filteredHomesP);
          setSearchQuery(filteredHomesP);
        }else if (queryFilter.startPrice === '' && queryFilter.endPrice !== '') {
          const filteredHomesP = filteredHomes.filter((home) =>
          parseInt(home.price) <= parseInt(queryFilter.endPrice)); 
          setShowData(filteredHomesP);
          setSearchQuery(filteredHomesP);
        }else {
          setShowData(filteredHomes);
          setSearchQuery(filteredHomes);
        }

      }else {

        if (queryFilter.startPrice !== '' && queryFilter.endPrice !== '') {
          const filteredHomesP = recommendedHomes.filter((home) =>
          parseInt(home.price) >= parseInt(queryFilter.startPrice) && parseInt(home.price) <= parseInt(queryFilter.endPrice)); 
          setShowData(filteredHomesP);
          setSearchQuery(filteredHomesP);
        }else if( queryFilter.startPrice !== '' && queryFilter.endPrice === ''){
          const filteredHomesP = recommendedHomes.filter((home) =>
          parseInt(home.price) >= parseInt(queryFilter.startPrice)); 
          setShowData(filteredHomesP);
          setSearchQuery(filteredHomesP);
        }else if (queryFilter.startPrice === '' && queryFilter.endPrice !== '') {
          const filteredHomesP = recommendedHomes.filter((home) =>
          parseInt(home.price) <= parseInt(queryFilter.endPrice)); 
          setShowData(filteredHomesP);
          setSearchQuery(filteredHomesP);
        }else {
          setShowData(recommendedHomes);
          setSearchQuery(recommendedHomes);
        }
      }
    }, [queryFilter]);

    const isNoFilter = queryFilter.startPrice === '' && queryFilter.endPrice === '' && queryFilter.location.length === 0;

  
  return (
    <View 
    style={{position: 'relative'}}
    id='NursingHousesContainer'
    className="flex-1">
      {stateFilter && <Filter stateFilter={stateFilter} setStateFilter={setStateFilter} queryFilter={queryFilter} setQueryFilter={setQueryFilter}/>}
      <View className="flex-1 px-5">
        <View className='flex-row my-3 h-14 items-center justify-between'>
            <Text 
            style={{ fontFamily: 'SarabunBold'}}
            className=' text-normalText text-2xl ml-3 h-12 pt-2'>บ้านพักคนชรา</Text>
            <TouchableOpacity
            id='BtnFilter'
            activeOpacity={1}
            onPress={() => setStateFilter(!stateFilter)}
            className='w-14 h-14 items-center justify-center'>
              <Feather name="sliders" size={32} color={ isNoFilter ? '#B0B0B0' : '#2A4296'}/>
            </TouchableOpacity>
        </View>
        <View className="h-16 mt-4">
          <View className={`flex flex-row items-center px-4 py-2 rounded-full bg-neutral2 h-14`}>
            <View 
            className="mr-2">
              <Ionicons name="search" size={24} color="#6780D6" />
            </View>
            <TextInput
              id='searchInputNursingHouses'
              value={query}
              onChangeText={setQuery}
              placeholder='ค้นหาบ้านพักคนชรา'
              placeholderTextColor={'#B0B0B0'}
              // placeholderTextColor="#6780D6"
              className="flex-1 text-lg text-normalText pl-2 h-14"
            />
          </View>
        </View>
        <ScrollView
        showsVerticalScrollIndicator={false}>


          <View className='flex flex-row justify-between items-center'>
            <TextF className="mt-3 pt-4 text-normalText text-lg mb-8">{query === '' &&  isNoFilter ? 'บ้านพักคนชราในแผนของคุณ' : 'ผลลัพธ์การค้นหา' }</TextF>
            <TouchableOpacity 
            id='BtnFavorite'
            activeOpacity={1}
            onPress={() => setActiveTab('favnursingHouses')}
            className='w-44 h-10 bg-primary rounded-lg justify-center items-center flex flex-row gap-2'>
              <Ionicons name="heart" size={22} color='#fff'/>
              <TextF className=' text-white pt-1'>บ้านพักที่ชื่นชอบ</TextF>
            </TouchableOpacity>
          </View>
          {query === '' && isNoFilter &&
            favoriteHomes.map((home, index) => (
              <TouchableOpacity 
              id='favoriteNursingHomes'
              key={index} 
              activeOpacity={1}
              onPress={() => setActiveTab('detailnursingHouses')}>
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
          {query === '' &&  isNoFilter && <TextF className="mt-8 text-lg text-normalText">บ้านพักคนชราแนะนำ</TextF>}
          <View className='h-5'></View>
          {searchQuery.map((home, index) => (
            <TouchableOpacity
              id='recommendNursingHomes'
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
                mapLink={home.mapLink}
              />
              <View className="flex px-4 my-5 h-[1] bg-unselectInput" />
            </TouchableOpacity>
          ))}
          <View className='h-40'></View>
        </ScrollView>
      </View>
    </View>
    
  );
};

export default NursingHouses;
