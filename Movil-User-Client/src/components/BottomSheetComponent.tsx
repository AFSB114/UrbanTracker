import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import SearchBar from './ui/SearchBar';

export default function BottomSheetComponent() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleSheetChanges = (index: number) => {
    console.log('Sheet changed to index', index);
    setCurrentIndex(index);
  };

  // Función para renderizar contenido según el índice
  const renderContent = () => {
    if (currentIndex === 1) {
      // Al 25%
      return (
        <BottomSheetView className="flex-1 items-center justify-center px-4 pb-5 pt-2">
          <SearchBar />
          <Text className="mt-2 text-sm text-white">Búsqueda básica - 25%</Text>
        </BottomSheetView>
      );
    } else if (currentIndex === 2) {
      // Al 50%
      return (
        <BottomSheetView className="flex-1 px-4 pb-5 pt-2">
          <SearchBar />
          <Text className="mb-2 mt-4 text-lg text-white">Búsqueda avanzada - 50%</Text>

          <View className="mt-4 space-y-2">
            <Text className="text-sm text-white">🔍 Filtros disponibles</Text>
            <Text className="text-sm text-white">📍 Búsqueda por ubicación</Text>
            <Text className="text-sm text-white">⭐ Filtrar por rating</Text>
            <Text className="text-sm text-white">🏷️ Categorías</Text>
          </View>
        </BottomSheetView>
      );
    }

    // Cuando está cerrado o en transición
    return (
      <BottomSheetView className="flex-1 items-center justify-center px-4 pb-5 pt-2">
        <SearchBar />
      </BottomSheetView>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: '#000' }}
      handleIndicatorStyle={{
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 50,
        height: 5,
      }}>
      {renderContent()}
    </BottomSheet>
  );
}
