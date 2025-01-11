import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import TextF from './TextF';

interface NursingHousesCard {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  imageUrl: string;
}

const NursingHomeCard: React.FC<NursingHousesCard> = ({
  id,
  name,
  description,
  price,
  location,
  imageUrl,
}) => {
  return (
    <View 
    id={'NursingHomeCardContainer'+id}
    className="flex flex-row bg-neutral">
      <View className="w-1/2 aspect-video max-w-52">
        <Image
          source={{ uri: imageUrl }}
          className="w-full h-full object-cover rounded-md"
        />
      </View>
      <View className="flex-1 pl-3 justify-between">
        <View className=' h-16'>
          <TextF className="text font-bold text-black">{name}</TextF>
          <TextF className="text-xs text-label pb-2">{description}</TextF>
        </View>
        <TextF className="text-oktext items-center mt-3">{price} บาท/เดือน</TextF>
        <View className="flex-row items-center w-full justify-end">
          <TextF className="text-sm text-label ml-1 ">{location}</TextF>
          <FontAwesome5 name="map-marker-alt" size={12} color="#979797" />
        </View>
      </View>
    </View>
  );
};

export default NursingHomeCard;

