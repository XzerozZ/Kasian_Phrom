import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated , Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { FontAwesome6, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { useNumberFormat } from "@/app/NumberFormatContext";
import TextF from './TextF';
import Mascot from './mascot';
interface messageProp{
    id: string;
    message: string;
    balance: number;
    is_read: boolean;
    created_at: string;
    type: string;
  }
interface NotiCardProps {
    messageNoti: messageProp | undefined;
    setMessageNoti: (message: any) => void;
    setActiveTab: (tab: string) => void;
}

const NotiCard: React.FC<NotiCardProps> = ({ messageNoti, setMessageNoti, setActiveTab  }) => {
      const { addCommatoNumber } = useNumberFormat();
    
    const scrollViewRef = useRef<ScrollView>(null);
    const [position, setPosition] = useState(0);
    const [countDown, setCountDown] = useState(5);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const opacityAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(-120)).current; //-140

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
                toValue: -120,
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
                toValue: -120,
                duration: 500,
                useNativeDriver: true,
            }).start();
            setMessageNoti(undefined);
        }
        
    }, [countDown]);

    const handlePressIn = () => {
        setCountDown(5);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handlePressOut = () => {
        intervalRef.current = setInterval(() => {
            setCountDown(prevCount => {
                if (prevCount <= 0) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);
        console.log('Button Pressed Out');
    };

    console.log('countDown',countDown)

    const handleToNoti = () => {
        setActiveTab('notification');
        setCountDown(0);
        console.log(typeof(messageNoti))
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
                style={{ position: 'absolute', top: -120, zIndex: 100000, opacity: opacityAnim, transform: [{ translateY: translateYAnim }] }}
                className='w-full h-80'
            >
                <View className='h-40 w-full border-x border-primary2 bg-white'></View>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={()=>handleToNoti()}
                    onPressIn={handlePressIn}   // เริ่มกด
                    onPressOut={handlePressOut}
                    className='flex flex-row justify-between items-center h-32 px-5 bg-white rounded-b-2xl border-b border-x border-primary2 relative'>
                    <View style={{position:'absolute', top: 20, right:0}} ><Mascot fromP={'noti'} type={'normal'} isPress={false} className='w-48 h-48 z-50'/></View>
                    <View className='flex flex-row items-center gap-3'>
                        {/* <View>
                            {messageNoti?.type === 'asset' && messageNoti?.balance == 0 
                            ? <MaterialCommunityIcons name="alert-circle" size={20} color='#FF5449'/>
                            :<Ionicons name="checkmark-circle" size={20} color='#6780D6'/>}
                        </View> */}
                        <View className='flex flex-col justify-center items-start px-3 gap-3'>
                            <TextF  className='text-lg w-9/12 break-words'>{messageNoti?.message}{messageNoti?.type === 'asset' && messageNoti?.balance > 0 && ` คุณเก็บเงินได้ ${addCommatoNumber(messageNoti?.balance)} บาท` }</TextF>
                            
                            
                        </View>
                    </View>
                </TouchableOpacity>
                <View className='h-40'></View>
            </Animated.ScrollView>
        </>
    );
};

export default NotiCard;
