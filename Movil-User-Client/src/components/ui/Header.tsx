import { Image, View } from "react-native";

export default function Header() { 
  return (
    <View
      className="absolute left-0 top-0 z-20 w-screen"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <View className="ml-2 h-16 w-32">
        <Image
          source={require('./../../../assets/Isotipo.png')}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
    </View>
  );
}