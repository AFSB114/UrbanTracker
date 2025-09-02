import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
  editable?: boolean;
}

export default function SearchBar({ 
  placeholder = "Buscar", 
  value, 
  onChangeText, 
  onPress,
  editable = true 
}: SearchBarProps) {
  return (
    <TouchableOpacity 
      className="absolute top-12 left-5 right-5 z-50"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center bg-gray-800 rounded-full px-4 py-3 shadow-lg">
        <Ionicons name="search" size={20} color="#999999" className="mr-2.5" />
        <TextInput
          className="flex-1 text-white text-base py-0"
          placeholder={placeholder}
          placeholderTextColor="#999999"
          value={value}
          onChangeText={onChangeText}
          editable={editable}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText('')} className="ml-2.5">
            <Ionicons name="close-circle" size={20} color="#999999" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
