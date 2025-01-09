import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  isDarkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'ค้นหา...', onSearch, isDarkMode }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const styles = isDarkMode ? 'bg-dark text-white' : 'bg-light text-black';

  return (
    <View className={`flex flex-row items-center px-4 py-2 rounded-full ${styles} mx-8 bg-neutral2 h-16`}>
      {/* Search Icon */}
      <TouchableOpacity onPress={handleSearch} className="mr-2">
        <Ionicons name="search" size={24} color="#6780D6" />
      </TouchableOpacity>

      {/* Text Input */}
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor="#6780D6"
        className="flex-1 text-lg text-primary2 pl-2"
        onSubmitEditing={handleSearch} // Allow pressing "Enter" to trigger search
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

export default SearchBar;
