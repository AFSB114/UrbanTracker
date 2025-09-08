import { TextInput, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function SearchBar() {
  return (
    <View className="relative flex w-full flex-row items-center justify-stretch overflow-hidden rounded-lg border border-gray-300 bg-white px-2 my-4">
      <FontAwesome5 name="search-location" size={24} color="gray" />
      <TextInput
        className="text-black text-lg placeholder:font-bold placeholder:text-zinc-600"
        placeholder="Buscar rutas, destinos..."
      />
    </View>
  );
}