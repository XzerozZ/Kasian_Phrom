import React from 'react';
import { View, Text, Image } from 'react-native';
import { FontAwesome6, FontAwesome5 } from '@expo/vector-icons';

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
    <View className="flex flex-row bg-neutral">
      <Image
        source={{ uri: imageUrl }}
        className="w-52 h-32 object-cover"
        resizeMode="cover"
      />
      <View className="flex-1 px-4 justify-between">
        <View>
          <Text className="text font-bold text-black">{name}</Text>
          <Text className="text-xs text-gray-500">{description}</Text>
        </View>
        <View className="flex-row justify-between items-center pt-2">
          <Text className="text-green-600 font-semibold">{price}</Text>
          <View className="flex-row items-center">
            <Text className="text-sm text-gray-400 ml-1">{location}</Text>
            <FontAwesome5 name="map-marker-alt" size={12} color="#888" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default NursingHomeCard;
