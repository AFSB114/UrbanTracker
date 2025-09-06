import { View } from "react-native";
import Header from "./components/ui/Header";
import MapViewComponent from "./components/MapViewComponent";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Header />
      <MapViewComponent />
    </View>
  );
}