import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import TextF from './TextF';

interface NursingHousesCard {
  datahouse : any
}

const NursingHomeCard: React.FC<NursingHousesCard> = ({
  datahouse
}) => {
  return (
    <View 
    id={'NursingHomeCardContainer'+datahouse.nh_id}
    className="flex flex-row bg-neutral">
      <View className="w-1/2 aspect-video max-w-52">
        <Image
          source={{ uri: datahouse.images[0].image_link }}
          className="w-full h-full object-cover rounded-md"
        />
      </View>
      <View className="flex-1 pl-3 justify-between">
        <View className=' h-16'>
          <TextF className="text font-bold text-black">{datahouse.name}</TextF>
        </View>
        <TextF className="text-oktext items-center mt-3">{datahouse.price} บาท/เดือน</TextF>
        <View className="flex-row items-center w-full justify-end">
          <TextF className="text-sm text-label ml-1 ">{datahouse.province}</TextF>
          <FontAwesome5 name="map-marker-alt" size={12} color="#979797" />
        </View>
      </View>
    </View>
  );
};

export default NursingHomeCard;