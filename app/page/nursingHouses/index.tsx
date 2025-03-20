import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, Animated, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import  TextF  from '../../components/TextF';
import NursingHomeCard from '../../components/NursingHousesCard';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import Filter from './filter';
import HeadTitle from '../../components/headTitle';
import Port from '../../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';



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
    images: [],
    CreatedAt: string,
    UpdatedAt: string
  }

interface NursingHousesProps{
  isDarkMode: boolean;
  setActiveTab: (tab: string) => void;
  setStateNavbar: (state: boolean) => void;
  setHomeSelected: (home: string) => void;
  formPage: string;
  setState: (state: number) => void;
  setHomePickInPlan: (home: string) => void;
}
const NursingHouses: React.FC<NursingHousesProps> = ({ isDarkMode, setActiveTab, setStateNavbar, setHomeSelected, formPage, setState, setHomePickInPlan }) => {
  const[allHouses, setAllHouses] = useState<Home[]>([]);
  const[ownHouses, setOwnHouses] = useState<Home>();
  const [isAllHouses, setIsAllHouses] = useState(false)
  const [showData, setShowData] = useState<Home[]>([]);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const allopenHouses = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        
        const response = await fetch(`${Port.BASE_URL}/nursinghouses/Active`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const responseRecommend = await fetch(`${Port.BASE_URL}/nursinghouses/recommend/cosine`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json();
          console.log('errorDataAsset', errorData);
          throw new Error(errorData.message || "Network response was not ok");
        }
        const data = await response.json();
        const dataRecommend = await responseRecommend.json();
        
        if (isAllHouses === false) {
          setAllHouses(data.result);
        } else if (isAllHouses === true) {
          console.log(',dataRecommend.result,,,,,,,,,,,,,,,,,,,,,',dataRecommend.result);
          setAllHouses(dataRecommend.result);
        }

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
          
          setOwnHouses(dataOwnHouses.result.NursingHouse);
        }


  
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
  
    // ตรวจสอบ formPage แล้วตั้งค่า State Navbar และเรียก API
    if (formPage === 'calRetirement') {
      setStateNavbar(false);
      allopenHouses();
    } else {
      setStateNavbar(true);
      allopenHouses();
    }
  }, [formPage, isAllHouses, setAllHouses, setOwnHouses]);
  
  const [searchQuery, setSearchQuery] = useState<Home[]>([]);

  const [query, setQuery] = useState('');

  const [stateFilter, setStateFilter] = useState(false);
  const [queryFilter, setQueryFilter] = useState({
    startPrice: '',
    endPrice: '',
    location: [] as string[],
  });

  console.log('123--------',ownHouses);

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


  // useEffect(() => {

  //     if(queryFilter.location.length > 0) {
  //     const filteredHomes = recommendedHomes.filter((home) =>
  //     queryFilter.location.some(location => home.fullLocation.toLowerCase().includes(location.toLowerCase())));

  //       if (queryFilter.startPrice !== '' && queryFilter.endPrice !== '') {
  //         const filteredHomesP = filteredHomes.filter((home) =>
  //         parseInt(home.price) >= parseInt(queryFilter.startPrice) && parseInt(home.price) <= parseInt(queryFilter.endPrice)); 
  //         setShowData(filteredHomesP);
  //         setSearchQuery(filteredHomesP);
  //       }else if( queryFilter.startPrice !== '' && queryFilter.endPrice === ''){
  //         const filteredHomesP = filteredHomes.filter((home) =>
  //         parseInt(home.price) >= parseInt(queryFilter.startPrice)); 
  //         setShowData(filteredHomesP);
  //         setSearchQuery(filteredHomesP);
  //       }else if (queryFilter.startPrice === '' && queryFilter.endPrice !== '') {
  //         const filteredHomesP = filteredHomes.filter((home) =>
  //         parseInt(home.price) <= parseInt(queryFilter.endPrice)); 
  //         setShowData(filteredHomesP);
  //         setSearchQuery(filteredHomesP);
  //       }else {
  //         setShowData(filteredHomes); 
  //         setSearchQuery(filteredHomes);
  //       }

  //     }else {

  //       if (queryFilter.startPrice !== '' && queryFilter.endPrice !== '') {
  //         const filteredHomesP = recommendedHomes.filter((home) =>
  //         parseInt(home.price) >= parseInt(queryFilter.startPrice) && parseInt(home.price) <= parseInt(queryFilter.endPrice)); 
  //         setShowData(filteredHomesP);
  //         setSearchQuery(filteredHomesP);
  //       }else if( queryFilter.startPrice !== '' && queryFilter.endPrice === ''){
  //         const filteredHomesP = recommendedHomes.filter((home) =>
  //         parseInt(home.price) >= parseInt(queryFilter.startPrice)); 
  //         setShowData(filteredHomesP);
  //         setSearchQuery(filteredHomesP);
  //       }else if (queryFilter.startPrice === '' && queryFilter.endPrice !== '') {
  //         const filteredHomesP = recommendedHomes.filter((home) =>
  //         parseInt(home.price) <= parseInt(queryFilter.endPrice)); 
  //         setShowData(filteredHomesP);
  //         setSearchQuery(filteredHomesP);
  //       }else {
  //         setShowData(recommendedHomes);
  //         setSearchQuery(recommendedHomes);
  //       }
  //     }
  //   }, [queryFilter]);

  useEffect(() => {
    if (queryFilter.location.length > 0) {
      const filteredHomes = allHouses.filter((home) =>
        queryFilter.location.some(location => home.province.toLowerCase().includes(location.toLowerCase()))
      );
  
      let filteredHomesP = filteredHomes;
      if (queryFilter.startPrice !== '') {
        filteredHomesP = filteredHomesP.filter((home) => parseInt(home.price.toString()) >= parseInt(queryFilter.startPrice));
      }
      if (queryFilter.endPrice !== '') {
        filteredHomesP = filteredHomesP.filter((home) => parseInt(home.price.toString()) <= parseInt(queryFilter.endPrice));
      }
  
      setShowData(filteredHomesP);
      setSearchQuery(filteredHomesP);
    } else {
      let filteredHomesP = allHouses;
      if (queryFilter.startPrice !== '') {
        filteredHomesP = filteredHomesP.filter((home) => parseInt(home.price.toString()) >= parseInt(queryFilter.startPrice));
      }
      if (queryFilter.endPrice !== '') {
        filteredHomesP = filteredHomesP.filter((home) => parseInt(home.price.toString()) <= parseInt(queryFilter.endPrice));
      }
  
      setShowData(filteredHomesP);
      setSearchQuery(filteredHomesP);
    }
  }, [queryFilter, allHouses]);

    const isNoFilter = queryFilter.startPrice === '' && queryFilter.endPrice === '' && queryFilter.location.length === 0;



  
  return (
    <View 
    style={{position: 'relative'}}
    id='NursingHousesContainer'
    className="flex-1">
      {stateFilter && <Filter stateFilter={stateFilter} setStateFilter={setStateFilter} queryFilter={queryFilter} setQueryFilter={setQueryFilter}/>}
      <View className="flex-1 px-5">
        <View className='flex-row my-3 h-14 items-center justify-between'>
            {formPage === 'calRetirement' ?
            <>
            <HeadTitle 
              id='CalRetirementHeadTitle'
              setActiveTab={setActiveTab} 
              title='บ้านพักคนชรา' 
              onPress={() => setState(4)}/>
              <TouchableOpacity
              id='BtnFilter'
              activeOpacity={1}
              onPress={() => setStateFilter(!stateFilter)}
              style={{position: 'absolute', right: 0}}
              className='w-14 h-14 items-center justify-center absolute'>
                <Feather name="sliders" size={32} color={ isNoFilter ? '#B0B0B0' : '#2A4296'}/>
              </TouchableOpacity>
            </>
            :
            <>
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
            </>}
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
        {formPage === 'calRetirement' && 
        <TouchableOpacity 
        id='BtnSkip'
        activeOpacity={1}
        onPress={() => (setState(4), setHomePickInPlan('00001'))}
        className='flex-row justify-end items-end mt-3'>
          <TextF className="text-primary w-14 text-lg">ข้าม</TextF>
        </TouchableOpacity>
        }
        <ScrollView
        showsVerticalScrollIndicator={false}>
          <View className={`flex flex-row mt-4 items-center ${isAuth || !isNoFilter ? 'justify-between' : 'justify-end'}`}>
          { isNoFilter && query === ''
          ? ownHouses === undefined || ownHouses?.nh_id === '00001'
            ? isAuth &&(
              <View className='flex-row  text-lg justify-between'>
                <View className='flex-row gap-3'>
                  <TouchableOpacity
                    id='BtnRecommendHouses'
                    activeOpacity={1}
                    onPress={() => setIsAllHouses(true)}
                  >
                    <View>
                      <TextF className={`${!isAllHouses ? 'text-label' : 'text-normalText'}`}>แนะนำ</TextF>
                    </View>
                  </TouchableOpacity>
                  <View className='flex h-5 w-[1] mt-1 bg-unselectInput'></View>
                  <TouchableOpacity
                    id='BtnAllHouses'
                    activeOpacity={1}
                    onPress={() => setIsAllHouses(false)}
                  >
                    <View>
                      <TextF className={`${!isAllHouses ? 'text-normalText' : 'text-label'}`}>ทั้งหมด</TextF>
                    </View>
                  </TouchableOpacity>
                </View>
                  </View>
                )
                : (
                  <TextF className="mt-3 pt-4 text-normalText text-lg mb-8">
                    บ้านพักคนชราในแผนของคุณ
                  </TextF>
                )
              : (
                <TextF className="mt-3 pt-4 text-normalText text-lg mb-8">
                  ผลลัพธ์การค้นหา
                </TextF>
              )
            }

            {isAuth && <TouchableOpacity 
            id='BtnFavorite'
            activeOpacity={1}
            onPress={() => setActiveTab('favnursingHouses')}
            className='w-44 h-10 bg-primary rounded-lg justify-center items-center flex flex-row gap-2'>
              <Ionicons name="heart" size={22} color='#fff'/>
              <TextF className=' text-white pt-1'>บ้านพักที่ชื่นชอบ</TextF>
            </TouchableOpacity>}
          </View>
          {query === '' && isNoFilter && ownHouses?.nh_id !== '00001' && ownHouses !== undefined &&
            <TouchableOpacity 
            id='favoriteNursingHomes'
            activeOpacity={1}
            onPress={() => {
              (formPage === 'index' && setActiveTab('detailnursingHouses'),setHomeSelected(ownHouses?.nh_id))
            }}>
              {ownHouses !==undefined && <NursingHomeCard datahouse={ownHouses} />}
            </TouchableOpacity>
          }
          <View className=' flex-row text-lg justify-between'>
            {query !== '' ||  !isNoFilter && ownHouses === undefined || ownHouses?.nh_id !== '00001' &&<TextF className=" text-normalText mt-8 text-lg">บ้านพักคนชรา</TextF>}
            {ownHouses !== undefined && ownHouses?.nh_id !== '00001' && (
              <View className='flex-row gap-3 mt-8'>
                <TouchableOpacity
                  id='BtnRecommendHouses'
                  activeOpacity={1}
                  onPress={() => setIsAllHouses(true)}
                >
                  <View>
                    <TextF className={`${!isAllHouses ? 'text-label' : 'text-normalText'}`}>แนะนำ</TextF>
                  </View>
                </TouchableOpacity>
                <View className='flex h-5 w-[1] mt-1 bg-unselectInput'></View>
                <TouchableOpacity
                  id='BtnAllHouses'
                  activeOpacity={1}
                  onPress={() => setIsAllHouses(false)}
                >
                  <View>
                    <TextF className={`${!isAllHouses ? 'text-normalText' : 'text-label'}`}>ทั้งหมด</TextF>
                  </View>
                </TouchableOpacity>
              </View>
            )}

          </View>
          <View className='h-5'></View>
          {searchQuery && searchQuery.length > 0 && searchQuery.map((Home, index) => (
            <TouchableOpacity
              id='recommendNursingHomes'
              key={index}
              activeOpacity={1}
              onPress={() => {
                (formPage === 'index' && setActiveTab('detailnursingHouses'),setHomeSelected(Home.nh_id),console.log('idh',Home.nh_id))
              }}
            >
              <NursingHomeCard datahouse={Home} />
              <View className="flex px-4 my-5 h-[1] bg-unselectInput" />
            </TouchableOpacity>
          ))}
          <View className='h-40'></View>
        </ScrollView>
      </View>
    </View>
    
  );
};

export default NursingHouses