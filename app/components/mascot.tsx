import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import Port from '../../Port';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNumbers } from "../NumberProvider";

const AS_babyBlue = require('../../assets/Mascot/AS_babyBlue.png');
const AS_babyCollar = require('../../assets/Mascot/AS_babyCollar.png');
const AS_babyPink = require('../../assets/Mascot/AS_babyPink.png');
const AS_bands = require('../../assets/Mascot/AS_bands.png');
const AS_belt = require('../../assets/Mascot/AS_belt.png');
const AS_bow = require('../../assets/Mascot/AS_bow.png');
const AS_degreeHat = require('../../assets/Mascot/AS_degreeHat.png');
const AS_fullset = require('../../assets/Mascot/AS_fullset.png');
const AS_Glasses = require('../../assets/Mascot/AS_Glasses.png');
const AS_mail = require('../../assets/Mascot/AS_mail.png');
const AS_monocle = require('../../assets/Mascot/AS_monocle.png');
const AS_necklace = require('../../assets/Mascot/AS_necklace.png');
const AS_necktieCollar = require('../../assets/Mascot/AS_necktieCollar.png');
const AS_ribbonCollar = require('../../assets/Mascot/AS_ribbonCollar.png');
const AS_smallGlasses = require('../../assets/Mascot/AS_smallGlasses.png');
const E_angry = require('../../assets/Mascot/E_angry.png');
const E_close = require('../../assets/Mascot/E_close.png');
const E_cry = require('../../assets/Mascot/E_cry.png');
const E_eyelash = require('../../assets/Mascot/E_eyelash.png');
const E_fire = require('../../assets/Mascot/E_fire.png');
const E_heart = require('../../assets/Mascot/E_heart.png');
const E_normal = require('../../assets/Mascot/E_normal.png');
const EF_hearts = require('../../assets/Mascot/EF_hearts.png');
const F_cheekPink = require('../../assets/Mascot/F_cheekPink.png');
const F_eyebrow = require('../../assets/Mascot/F_eyebrow.png');
const M_bigHeart = require('../../assets/Mascot/M_bigHeart.png');
const M_coin = require('../../assets/Mascot/M_coin.png');
const M_lineMooPointer = require('../../assets/Mascot/M_lineMooPointer.png');
const M_lineMooSitdown = require('../../assets/Mascot/M_lineMooSitdown.png');
const M_lineMooStandup = require('../../assets/Mascot/M_lineMooStandup.png');
const M_mooPointer = require('../../assets/Mascot/M_mooPointer.png');
const M_mooSitdown = require('../../assets/Mascot/M_mooSitdown.png');
const M_mooStandup = require('../../assets/Mascot/M_mooStandup.png');
const T_car = require('../../assets/Mascot/T_car.png');
const T_home = require('../../assets/Mascot/T_home.png');
const T_save = require('../../assets/Mascot/T_save.png');
const T_travel = require('../../assets/Mascot/T_travel.png');



interface MascotProps{
    className?: string;
    fromP?: string;
    type?: string;
    isPress?: boolean;
    }
const Mascot: React.FC<MascotProps> = ({className, fromP, type, isPress,  ...rest}) => {
    const { numbers, generateRandomNumbers } = useNumbers();
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isHavePlan, setIsHavePlan] = useState<boolean>(false);
    const [listASTier, setListASTier] = useState<any>(['AS_babyBlue', 'AS_babyPink', 'AS_babyCollar', 'AS_bands', 'AS_belt', 'AS_bow', 'AS_Glasses', 'AS_monocle', 'AS_necktieCollar', 'AS_ribbonCollar', 'AS_smallGlasses']);
    const [listASTier2, setListASTier2] = useState<any>([
        {type : 0 , AS: 'AS_fullset'},
        {type : 0 , AS: 'AS_necklace'},
        {type : 1 , AS: 'AS_babyBlue'},
        {type : 1 , AS: 'AS_babyPink'},
        {type : 2 , AS: 'AS_babyCollar'},
        {type : 2 , AS: 'AS_necktieCollar'},
        {type : 2 , AS: 'AS_ribbonCollar'},
        {type : 3 , AS: 'AS_bands'},
        {type : 3 , AS: 'AS_belt'},
        {type : 3 , AS: 'AS_bow'},
        {type : 4 , AS: 'AS_Glasses'},
        {type : 4 , AS: 'AS_monocle'},
        {type : 4 , AS: 'AS_smallGlasses'},
    ]);

    const [mascotAccessory, setMascotAccessory] = useState<any>([]);

    const [mascotBody, setMascotBody] = useState<string>();
    const [mascotEye, setMascotEye] = useState<string>();

    const [mascotFace, setMascotFace] = useState<string>();
    const [isCheekPink, setIsCheekPink] = useState<boolean>(false);
    const [resetAnimetion, setResetAnimetion] = useState<boolean>(false);
    const [onAnimetion, setOnAnimetion] = useState<boolean>(false);
    const opacityE_normal = useRef(new Animated.Value(0)).current;
    const opacityE_close = useRef(new Animated.Value(1)).current;
    const opacityE_fire = useRef(new Animated.Value(1)).current;
    const opacityF_cheekPink = useRef(new Animated.Value(1)).current;
    const opacityEF_hearts = useRef(new Animated.Value(0)).current;
    const scaleEF_hearts = useRef(new Animated.Value(1)).current;
    const opacityM_bigHeart = useRef(new Animated.Value(0)).current;
    const opacityCoin = useRef(new Animated.Value(0)).current;
    const translateYCoin = useRef(new Animated.Value(-50)).current;


    
    
    useEffect(() => {
        // generateRandomNumbers();
        const fetchData = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                setIsAuth(true);
                const responsePlan = await fetch(`${Port.BASE_URL}/user/plan`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const dataPlan = await responsePlan.json();
                console.log((dataPlan.result))
                if (dataPlan.result !== null) {
                    setIsHavePlan(true);
                    const percentMoney = dataPlan.result.all_money/dataPlan.result.allRequiredFund*100;
                    if (percentMoney > 0 && percentMoney <= 5) {
                        setMascotAccessory([listASTier[Math.floor(numbers[0] * listASTier.length)]]);
                    }else if(percentMoney > 5){
                        const index = Math.floor(numbers[0] * (listASTier2.length))
                        const Tier1_2AS1 = listASTier2[index];

                        if (Tier1_2AS1.type !== 0) {
                            const listASTier2Part2 = listASTier2.filter((item: any) => item.type !== Tier1_2AS1.type && item.type !== 0);
                            const index2 = Math.floor(numbers[1] * (listASTier2Part2.length))
                            const Tier1_2AS2 = listASTier2Part2[index2];
                            setMascotAccessory([Tier1_2AS1.AS, Tier1_2AS2.AS]);
                        }else{
                            setMascotAccessory([Tier1_2AS1.AS]);
                        }
                    }
                }
            }
            
        };
        fetchData();
        
    }, []);

    console.log('------------------++++++++++++++++++*************///////////////',mascotAccessory, mascotBody, listASTier2[Math.floor(numbers[0] * (listASTier2.length))])

    useEffect(() => {
        const randomValue = Math.random() < 0.5 ? 'standup' : 'sitdown';
        setMascotBody(randomValue);

        if (fromP === 'main') {
            setMascotEye('normal');
            setIsCheekPink(true);
        } else if (fromP === 'finance') {
            setMascotEye('normal');
            setIsCheekPink(true);
        } else if(fromP === 'noti'){
            setMascotEye('normal');
            setIsCheekPink(true);
        }else if(fromP === 'setting'){
            setMascotEye('normal');
            setIsCheekPink(true);
        }else if(fromP === 'login'){
            setMascotEye('normal');
            setIsCheekPink(true);
            setMascotBody('pointer');
        }else if(fromP === 'dashboard'){
            const randomValue = Math.random() < 0.5 ? 'E_heart' : 'normal';
            setMascotEye(randomValue);
            setIsCheekPink(true);
        }else if(fromP === 'addDept'){
            setMascotEye('E_fire');
            setMascotBody('sitdown');
        }else if(fromP === 'payDept'){
            setMascotEye('E_heart');
            setIsCheekPink(true);
            setMascotBody('sitdown');
        }else if(fromP === 'delDept'){
            setMascotEye('E_heart');
            setIsCheekPink(true);
            setMascotBody('sitdown');
        }else if(fromP === 'dashboardPopup_Successfully_deposited'){
            setMascotEye('E_heart');
            setIsCheekPink(true);
            setMascotBody('sitdown');
            onActiveEF_hearts();
            giveCoine();
        }else if(fromP === 'dashboardPopup_Successfully_withdraw'){
            const randomValue = Math.random() < 0.5 ? 'E_close' : 'E_angry';
            setMascotEye(randomValue);
            setIsCheekPink(true);
            setMascotBody('sitdown');
        }else if(fromP === 'dashboardPopup_Insufficient'){
            setMascotEye('E_cry');
            setIsCheekPink(true);
            setMascotBody('sitdown');
        }

        
    }, []);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityE_normal, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
                Animated.timing(opacityE_normal, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityE_close, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
                Animated.timing(opacityE_close, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityE_fire, {
                    toValue: 0.6,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityE_fire, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityF_cheekPink, {
                    toValue: 0.4,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
                Animated.timing(opacityF_cheekPink, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
        
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleEF_hearts, {
                    toValue: 0.9,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                
                Animated.timing(scaleEF_hearts, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [resetAnimetion]);

    const onActiveMascot=()=>{
        
        console.log('Mascot clicked!')
        const randomValue = Math.random();
        console.log('randomValue<><><><>',randomValue)
        if (randomValue < 0.5){
            Animated.sequence([
                Animated.timing(opacityEF_hearts, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
                }),
                Animated.delay(3500),
                Animated.timing(opacityEF_hearts, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
                }),
            ]).start();
        }else{
            Animated.sequence([
                Animated.timing(opacityM_bigHeart, {
                toValue: 0.8,
                duration: 1000,
                useNativeDriver: true,
                }),
                Animated.delay(2000),
                Animated.timing(opacityM_bigHeart, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
                }),
            ]).start();
        }

        Animated.sequence([
            Animated.timing(opacityE_normal, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            }),
            Animated.delay(3000),
            Animated.timing(opacityE_normal, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            }),
        ]).start();
        Animated.sequence([
            Animated.timing(opacityE_close, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            }),
            Animated.delay(3000),
            Animated.timing(opacityE_close, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            }),
        ]).start(() => { setResetAnimetion(!resetAnimetion),  setOnAnimetion(false) });

        
    }
    const onActiveEF_hearts=()=>{
        Animated.sequence([
            Animated.timing(opacityEF_hearts, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
            }),
        ]).start();
    }
    const giveCoine = () => {
        Animated.sequence([
            Animated.timing(opacityCoin, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
            }),
        ]).start();
        Animated.sequence([
            Animated.timing(translateYCoin, {
            toValue: 30,
            duration: 1000,
            useNativeDriver: true,
            }),
            Animated.timing(translateYCoin, {
            toValue: -10,
            duration: 1000,
            useNativeDriver: true,
            }),
        ]).start();
    }
console.log('isPress',isPress)


    return (
        <TouchableOpacity 
        className={className}
        activeOpacity={1}
        onPress={() => ((!onAnimetion && isPress) ? (onActiveMascot(), setOnAnimetion(true)) : {} )}
        {...rest}
        >

        {/* <Image source={T_car} className="w-full h-full object-contain rounded-md absolute"/>
        <Image source={T_home} className="w-full h-full object-contain rounded-md absolute"/>
        <Image source={T_save} className="w-full h-full object-contain rounded-md absolute"/>
        <Image source={T_travel} className="w-full h-full object-contain rounded-md absolute"/> */}
        
        {<Animated.View style={[{ opacity: opacityCoin, transform: [{ translateY: translateYCoin}] }]} className='w-full h-full items-center mx-auto absolute'><Image source={M_coin} className={`w-10 h-10 object-contain rounded-md absolute`}/></Animated.View>}


        {mascotBody === 'standup' &&<Image source={M_mooStandup} className="w-full h-full object-contain rounded-md absolute"/>}
        
        {mascotBody === 'sitdown' &&<Image source={M_mooSitdown} className="w-full h-full object-contain rounded-md absolute"/>}

        {mascotBody === 'pointer' &&<Image source={M_mooPointer} className="w-full h-full object-contain rounded-md absolute"/>}


        {mascotAccessory.map((item: string) => {
            if (item === 'AS_fullset'){setMascotBody('standup') }
            if (item === 'AS_babyCollar' || item === 'AS_fullset' || item === 'AS_ribbonCollar') {
                const imageSource = {
                    'AS_babyCollar': AS_babyCollar, //
                    'AS_ribbonCollar': AS_ribbonCollar, //
                    'AS_fullset': AS_fullset, //
                }[item];
                return <Image key={item} source={imageSource} className="w-full h-full object-contain rounded-md absolute"/>
            }
            }
        )}

        {mascotBody === 'standup' &&<Image source={M_lineMooStandup} className="w-full h-full object-contain rounded-md absolute"/>}
        
        {mascotBody === 'sitdown' &&<Image source={M_lineMooSitdown} className="w-full h-full object-contain rounded-md absolute"/>}

        {mascotBody === 'pointer' &&<Image source={M_lineMooPointer} className="w-full h-full object-contain rounded-md absolute"/>}


        {mascotAccessory.map((item: string) => {
            if (item === 'AS_necktieCollar' || item === 'AS_bands' || item === 'AS_belt' || item === 'AS_bow') {
                const imageSource = {
                    'AS_bands': AS_bands, //
                    'AS_belt': AS_belt, //
                    'AS_bow': AS_bow, //
                    'AS_necktieCollar': AS_necktieCollar, //
                }[item];
                return <Image key={item} source={imageSource} className="w-full h-full object-contain rounded-md absolute"/>
            }
            }
        )}
        
        

        {(mascotEye === 'E_normal' || mascotEye === 'normal') && <Animated.View style={mascotEye === 'normal' ?[{ opacity: opacityE_normal }]:[]} className='w-full h-full absolute'><Image source={E_normal} className={`w-full h-full object-contain rounded-md absolute`}/></Animated.View>}
        {(mascotEye === 'E_close' || mascotEye === 'normal') && <Animated.View style={mascotEye === 'normal' ?[{ opacity: opacityE_close }]:[]} className='w-full h-full absolute'><Image source={E_close} className={`w-full h-full object-contain rounded-md absolute`}/></Animated.View>}
        {mascotEye === 'E_heart' && <Image source={E_heart} className="w-full h-full object-contain rounded-md absolute"/>}
        {mascotEye === 'E_fire' && <Animated.View style={mascotEye === 'E_fire' ?[{ opacity: opacityE_fire }]:[]} className='w-full h-full absolute'><Image source={E_fire} className={`w-full h-full object-contain rounded-md absolute`}/></Animated.View>}
        {mascotEye === 'E_eyelash' && <Image source={E_eyelash} className="w-full h-full object-contain rounded-md absolute"/>}
        {mascotEye === 'E_cry' && <Image source={E_cry} className="w-full h-full object-contain rounded-md absolute"/>}
        {mascotEye === 'E_angry' && <Image source={E_angry} className="w-full h-full object-contain rounded-md absolute"/>}


        
        {isCheekPink && <Animated.View  style={[{ opacity: opacityF_cheekPink }]} className='w-full h-full'><Image source={F_cheekPink} className="w-full h-full object-contain rounded-md absolute"/></Animated.View>}

        {(mascotEye === 'E_normal' || mascotEye === 'E_eyelash' || mascotEye === 'E_close' || mascotEye === 'normal')
        &&<Image source={F_eyebrow} className="w-full h-full object-contain rounded-md absolute"/>}


        

        {mascotAccessory.map((item: string) => {
            if (fromP === 'setting'){
                if (item === 'AS_babyBlue' || item === 'AS_babyPink' || item === 'AS_necklace') {
                    const imageSource = {
                        'AS_babyBlue': AS_babyBlue,
                        'AS_babyPink': AS_babyPink,
                        'AS_necklace': AS_necklace,
                    }[item];
                    return <Image key={item} source={imageSource} className="w-full h-full object-contain rounded-md absolute"/>
                }
            }else{
                if (item === 'AS_babyBlue' || item === 'AS_babyPink' || item === 'AS_Glasses' || item === 'AS_monocle' || item === 'AS_smallGlasses' || item === 'AS_necklace') {
                const imageSource = {
                    'AS_babyBlue': AS_babyBlue,
                    'AS_babyPink': AS_babyPink,
                    'AS_Glasses': AS_Glasses,
                    'AS_monocle': AS_monocle,
                    'AS_smallGlasses': AS_smallGlasses,
                    'AS_necklace': AS_necklace,
                }[item];
                return <Image key={item} source={imageSource} className="w-full h-full object-contain rounded-md absolute"/>
            }
            }
            }
        )}


        {fromP === 'setting' && <Image source={AS_monocle} className="w-full h-full object-contain rounded-md absolute"/>}
        {fromP === 'finance' && <Image source={AS_degreeHat} className="w-full h-full object-contain rounded-md absolute"/>}
        {fromP === 'noti' && <Image source={AS_mail} className="w-full h-full object-contain rounded-md absolute"/>}

        {<Animated.View style={[{ opacity: opacityEF_hearts, transform: [{ scale: scaleEF_hearts }] }]} className='w-full h-full absolute'><Image source={EF_hearts} className={`w-full h-full object-contain rounded-md absolute`}/></Animated.View>}
        {<Animated.View style={[{ opacity: opacityM_bigHeart, transform: [{ scale: scaleEF_hearts }] }]} className='w-full h-full absolute'><Image source={M_bigHeart} className={`w-full h-full object-contain rounded-md absolute`}/></Animated.View>}



        </TouchableOpacity>
        
    );
  };

export default Mascot;