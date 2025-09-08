import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from './ui/SearchBar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function BottomSheetComponent() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['12%','30%'], []); // varias alturas

  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  const rutas = [
    {
      id: '1',
      nombre: 'Ruta 19',
      distancia: '100m hacia la carrera 7',
      bg: 'bg-zinc-800',
    },
    {
      id: '2',
      nombre: 'Ruta 62',
      distancia: '290m hacia la carrera 2',
      bg: 'bg-zinc-900',
    },
    {
      id: '3',
      nombre: 'Ruta 62',
      distancia: '290m hacia la carrera 2',
      bg: 'bg-zinc-900',
    },
  ];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{ backgroundColor: '#000' }}
      handleIndicatorStyle={{
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 50,
        height: 5,
      }}>
      <BottomSheetScrollView
        className="bg-black px-4">
        {/* Barra de búsqueda (siempre visible arriba) */}

        {/* Si no hay ruta seleccionada */}
        {!selectedRoute && (
          <>
            <SearchBar />
            <View className="mt-4">
              <Text className="mb-3 text-lg text-white">Rutas Cercanas</Text>
              {rutas.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedRoute(item)}
                  className={`flex-row items-center rounded-xl ${item.bg} mb-3 p-4`}>
                  <View className="mr-2 aspect-square items-center justify-center rounded-full bg-green-700 p-3">
                    <FontAwesome6 name="bus" size={20} color="white" />
                  </View>
                  <View>
                    <Text className="font-bold text-white">{item.nombre}</Text>
                    <Text className="text-zinc-300">{item.distancia}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Si hay ruta seleccionada */}
        {selectedRoute && (
          <ScrollView >
            {/* Botón de volver */}
            <TouchableOpacity
              onPress={() => setSelectedRoute(null)}
              className="mb-3 flex-row items-center">
              <FontAwesome6 name="arrow-left" size={18} color="white" />
              <Text className="ml-2 text-white">Atrás</Text>
            </TouchableOpacity>

            <Text className="mb-3 text-lg text-zinc-300">Ruta seleccionada</Text>

            {/* Card principal */}
            <View className="mb-4 rounded-2xl bg-zinc-900 p-4">
              <Text className="mb-1 text-xs text-zinc-400">ID-{selectedRoute.id}</Text>
              <Text className="text-xl font-bold text-white">{selectedRoute.nombre}</Text>
              <Text className="mb-3 text-zinc-400">{selectedRoute.distancia}</Text>

              <View className="mb-4 flex-row justify-between">
                <View className="flex-1 items-center">
                  <Text className="font-bold text-green-500">IDA</Text>
                  <Text className="text-xs text-zinc-300">
                    Inicia el recorrido en la carrera 7 con 90
                  </Text>
                </View>
                <View className="flex-1 items-center">
                  <Text className="font-bold text-red-500">VUELTA</Text>
                  <Text className="text-xs text-zinc-300">Carrera 39</Text>
                </View>
              </View>
            </View>

            {/* Sección Recorrido */}
            <View className="rounded-2xl bg-zinc-900 p-4">
              <Text className="mb-1 text-lg font-bold text-white">Recorrido</Text>
              <Text className="mb-3 text-zinc-400">Lugares por donde pasa</Text>

              <View className="mb-4">
                <Text className="font-bold text-white">Ida</Text>
                <Text className="text-sm text-zinc-300">
                  Sale de la calle 90 toma la carrera 7, barrio Galindo, carrera 26, San Pedro
                  Plaza, Glorieta de la Cruz Roja, el sector 4to Centenario – María Paula.
                </Text>
              </View>

              <View>
                <Text className="font-bold text-white">Vuelta</Text>
                <Text className="text-sm text-zinc-300">
                  Inicia María Paula – 4to Centenario, tomando la Carrera 39, carrera 38 S Sur,
                  calle 31 B Sur Transversal 36 Sur.
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
