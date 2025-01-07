import React from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

const BackBtn: React.FC = () => {
    const router = useRouter();
    return (
        <View className='mx-5 mb-5'>
            <FontAwesome6 name="chevron-left"  size={30} color='black' onPress={() => router.back()} />
        </View>
    );
}

export default BackBtn;