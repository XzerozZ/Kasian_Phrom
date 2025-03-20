import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Dimensions, NativeSyntheticEvent, NativeScrollEvent, Animated, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Province from './province';
import TextF from '../../components/TextF';
import { FontAwesome6, FontAwesome5, FontAwesome, MaterialIcons, Ionicons, AntDesign, Feather, Entypo } from '@expo/vector-icons';

interface FilterProps {
    stateFilter: boolean;
    setStateFilter: (state: boolean) => void;
    queryFilter: {
        startPrice: string;
        endPrice: string;
        location: string[];
    };
    setQueryFilter: (query: { startPrice: string, endPrice: string, location: string[] }) => void;
}

const Filter: React.FC<FilterProps> = ({ stateFilter, setStateFilter, queryFilter, setQueryFilter }) => {
    const [statePageFilter, setStatePageFilter] = useState(1);
    const scrollViewRef = useRef<ScrollView>(null);
    const screenWidth = Dimensions.get('window').width;
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState<string[]>(Province.map((province) => province.Province));
    const [stateUp, setStateUp] = useState(true);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.round(offsetX / screenWidth);
        setStatePageFilter(pageIndex);
        if (offsetX > screenWidth - 20) {
            setStateFilter(false);
        }
    };

    const handleClose = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: screenWidth, animated: true });
        }
    };

    const startContainer = useRef(new Animated.Value(-screenWidth-10)).current;
    const animatedHeight = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        if (stateFilter) {
            Animated.timing(startContainer, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }

    }, [stateFilter]);

    useEffect(() => {
        if (queryFilter.location.length > 0) {
            setLocation(location.filter((province) => !queryFilter.location.includes(province)));
        }
    }, []);

    useEffect(() => {
        if (search === '') {
            setLocation(Province.map((province) => province.Province).filter((province) => !queryFilter.location.includes(province)));
            return;
        }
        setLocation(Province.map((province) => province.Province).filter((province) => province.includes(search) && !queryFilter.location.includes(province)));
    }, [search]);



    const handleReset = () => {
        setQueryFilter({ startPrice: '', endPrice:'', location: [] });
        setLocation(Province.map((province) => province.Province));
    };
    const handleSelectLocation = (province: string) => {
        setQueryFilter({ 
            ...queryFilter, 
            location: [...queryFilter.location, province].reverse() 
        });
        
        setLocation(location.filter((item) => item !== province));
    }
    const handleRemoveLocation = (province: string) => {
        setQueryFilter({
            ...queryFilter,
            location: queryFilter.location
            .filter((item) => item !== province)
            .reverse(),
        });
        
        
        setLocation([...location, province].sort());
    }
    
    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: stateUp ? 230 : 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [stateUp]);

    console.log('------', queryFilter.startPrice, queryFilter.endPrice);

    return (
        <Animated.View
            style={{ position: 'absolute', top: -40, left: 0, zIndex: 50, transform: [{ translateX: startContainer}] }}
            className="w-full h-full pt-10">
            <ScrollView
                id="FilterContainer"
                bounces={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ref={scrollViewRef}
                horizontal={true}
                pagingEnabled={true}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                className="w-full h-full flex flex-row"
            >
                <View className="w-screen h-full flex flex-row">
                    
                    <View className="w-4/5 max-w-[500] h-full bg-neutral shadow flex px-5 ">
                        <View className='mt-10'>
                            <View className='flex-row justify-between items-center'>
                                <Text  
                                style={{ fontFamily: 'SarabunBold'}}
                                className='text-lg text-normalText'>เลือกจังหวัดที่คุณต้องการ</Text>
                                <TouchableOpacity 
                                id='BtnClearFilter'
                                activeOpacity={0.8}
                                onPress={handleReset}
                                className='w-24 items-center justify-center h-10 bg-primary rounded-lg'>
                                    <TextF className='text-lg text-neutral'>ล้าง</TextF>
                                </TouchableOpacity>
                            </View>
                            <View className='w-full h-14 mt-5 border border-neutral2 rounded-full flex flex-row items-center px-3'>
                                <Ionicons name="search" size={24} color="#6780D6" />
                                <TextInput
                                id='searchLocation'
                                placeholder='ค้นหาจังหวัด'
                                placeholderTextColor={'#B0B0B0'}
                                value={search}
                                onChangeText={setSearch}
                                className='h-10 px-5 w-11/12 text-lg text-normalText'/>
                            </View>
                            <Animated.View 
                            style={{ flexDirection: 'row', height: animatedHeight }}
                            className={`flex flex-row`}>
                                <View className='w-1/2 h-full mt-5 border-r border-neutral2'>
                                    <ScrollView className=''>
                                        {queryFilter.location.map((location, index) => (
                                            <TouchableOpacity 
                                            key={index} 
                                            id="selectedLocation"
                                            activeOpacity={0.8}
                                            onPress={() => handleRemoveLocation(location)}
                                            style={{position: 'relative'}}
                                            className='flex flex-row items-center pr-5 w-full h-12 mt-2'>
                                                <View style={{position: 'absolute', right: 20, top: 3, zIndex: 10}}>
                                                    <Entypo name="cross" size={15} color="#FCFCFC" />
                                                </View>
                                                <View className={` flex justify-center items-center bg-primary2 w-full h-full rounded-md`}>
                                                    <TextF className='text-neutral '>{location}</TextF>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                                <View className='w-1/2 h-full mt-5 '>
                                    <ScrollView className=''>
                                        {location.map((province, index) => (
                                            <View key={index} className='flex flex-row items-center'>
                                                <TouchableOpacity
                                                    id='SelectLocation'
                                                    activeOpacity={0.8}
                                                    onPress={()=>handleSelectLocation(province)}
                                                    className={`h-16  border-b border-neutral2 w-full flex justify-center items-center ${queryFilter.location.includes(province) ? 'bg-primary' : 'bg-neutral'}`}
                                                >
                                                    <TextF className='text-normalText h-8pt-2'>{province}</TextF>
                                                </TouchableOpacity>
                                                
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                                
                            </Animated.View>
                        </View>
                        <View className='mt-10'>
                            <Text
                            style={{ fontFamily: 'SarabunBold'}}
                            className='text-lg text-normalText'>เลือกช่วงราคาที่คุณต้องการ</Text>
                            <View>
                                <View className='flex mt-4'>
                                    <TextF className='text-lg'>ราคาเริ่มต้น</TextF>
                                    <View className='flex items-center mt-2 justify-between'>
                                        <TextInput
                                            id='startPrice'
                                            keyboardType='numeric'
                                            placeholder='ไม่มี'
                                            placeholderTextColor={'#B0B0B0'}
                                            value={queryFilter.startPrice}
                                            onChangeText={(text) => setQueryFilter({ ...queryFilter, startPrice: text })}
                                            onBlur={() => {
                                                setStateUp(true);
                                                if ((parseInt(queryFilter.startPrice) > parseInt(queryFilter.endPrice)) && queryFilter.endPrice !== '') {
                                                    setQueryFilter({ ...queryFilter, endPrice : queryFilter.startPrice.toString() });
                                                }
                                            }}
                                            onFocus={() => {
                                                setStateUp(false);
                                            }}
                                            className='w-full h-12 px-3 bg-neutral border border-neutral2 rounded-full text-center'/>
                                        
                                    </View>
                                </View>
                                <View className='flex mt-4'>
                                    <TextF className='text-lg'>ราคาสิ้นสุด</TextF>
                                    <View className='flex items-center mt-2 justify-between'>
                                        <TextInput
                                            id='endPrice'
                                            keyboardType='numeric'
                                            placeholder='ไม่มี'
                                            placeholderTextColor={'#B0B0B0'}
                                            value={queryFilter.endPrice}
                                            onChangeText={(text) => setQueryFilter({ ...queryFilter, endPrice: text })}
                                            onBlur={() => {
                                                setStateUp(true);
                                                if ((parseInt(queryFilter.endPrice) < parseInt(queryFilter.startPrice)) && queryFilter.startPrice !== '') {
                                                    setQueryFilter({ ...queryFilter, startPrice : queryFilter.endPrice.toString() });
                                                }
                                            }}
                                            onFocus={() => {
                                                setStateUp(false);
                                            }}
                                            className='w-full h-12 px-3 bg-neutral border border-neutral2 rounded-full text-center'/>
                                    </View>
                                </View>
                                
                            </View>
                            
                        </View>
                    </View>
                    <TouchableOpacity
                        id='CloseFilter'
                        onPress={handleClose}
                        className="w-1/5 h-full"
                    ></TouchableOpacity>
                </View>
                <View className="w-screen h-full"></View>
            </ScrollView>
        </Animated.View>
    );
};

export default Filter;


