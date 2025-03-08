import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated , Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import TextF from './TextF';
import Mascot from './mascot';

interface NotiCardProps {
    messageNoti: string;
    setMessageNoti: (message: string) => void;
    setActiveTab: (tab: string) => void;
}

const NotiCard: React.FC<NotiCardProps> = ({ messageNoti, setMessageNoti, setActiveTab  }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [position, setPosition] = useState(0);
    const [countDown, setCountDown] = useState(5);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(-140)).current;

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setPosition(offsetY);
    };

    useEffect(() => {
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();

    }, []);


    useEffect(() => {
        if (position > 110) {
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
            Animated.timing(translateYAnim, {
                toValue: -140,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
        if (position !== 0 && intervalRef.current){
            setCountDown(5);
            clearInterval(intervalRef.current);
        }else{
            handlePressOut();
        }
    }, [position]);

    useEffect(() => {
        if (countDown === 0) {
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
            Animated.timing(translateYAnim, {
                toValue: -140,
                duration: 500,
                useNativeDriver: true,
            }).start();
            setMessageNoti('');
        }
        
    }, [countDown]);

    const handlePressIn = () => {
        setCountDown(5);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handlePressOut = () => {
        // intervalRef.current = setInterval(() => {
        //     setCountDown(prevCount => {
        //         if (prevCount <= 0) {
        //             clearInterval(intervalRef.current!);
        //             return 0;
        //         }
        //         return prevCount - 1;
        //     });
        // }, 1000);
        console.log('Button Pressed Out');
    };

    console.log('countDown',countDown)

    const handleToNoti = () => {
        setActiveTab('notification');
        setCountDown(0);
    }


    return (
        <>
            <Animated.ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                pagingEnabled={true}
                snapToInterval={112}
                style={{ position: 'absolute', top: -140, zIndex: 100000, opacity: opacityAnim, transform: [{ translateY: translateYAnim }] }}
                className='w-full h-80'
            >
                <View className='h-40 w-full border-x border-primary2 bg-white'></View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>handleToNoti()}
                    onPressIn={handlePressIn}   // เริ่มกด
                    onPressOut={handlePressOut}
                    className='flex flex-row justify-between items-center h-32 px-5 bg-white rounded-b-2xl border-b border-x border-primary2 relative'>
                    <View style={{position:'absolute', top: 15, right:0}} ><Mascot fromP={'noti'} type={'normal'} isPress={false} className='w-48 h-48 z-50'/></View>
                    <TextF>{messageNoti}</TextF>
                </TouchableOpacity>
                <View className='h-40'></View>
            </Animated.ScrollView>
        </>
    );
};

export default NotiCard;
