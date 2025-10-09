import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHome } from '@/hooks/home/useHome';

// Los datos ahora vienen del hook useHome

export default function Home() {
  const {
    modalVisible,
    asunto,
    description,
    isRecorridoActive,
    startTime,
    endTime,
    isTracking,
    connectionStatus,
    assignedData,
    tripHistory,
    isLoadingAssigned,
    isLoadingHistory,
    setModalVisible,
    setAsunto,
    setDescription,
    handleToggleTrayecto,
    handleLogout,
    handleEnviarReporte,
  } = useHome();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* --- Header --- */}
      <View className="flex-row items-center justify-between bg-zinc-900 px-4 pb-6 pt-12">
        <Text className="text-2xl font-bold text-zinc-100">Ruta</Text>
        <TouchableOpacity onPress={handleLogout} className="rounded-full bg-zinc-800 p-2">
          <Icon name="close" size={20} color="#f4f4f5" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-zinc-950 px-4">
        {/* --- Tarjeta de Estado de Conexiones --- */}
        <View className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <Text className="mb-3 text-sm font-bold text-zinc-300">ESTADO DE CONEXIONES</Text>
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-zinc-400">MQTT Broker</Text>
            <View className="flex-row items-center">
              <View
                className={`mr-2 h-3 w-3 rounded-full ${
                  connectionStatus === 'Conectado'
                    ? 'bg-green-500'
                    : connectionStatus === 'Reconectando'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
              />
              <Text
                className={`font-semibold ${
                  connectionStatus === 'Conectado'
                    ? 'text-green-400'
                    : connectionStatus === 'Reconectando'
                      ? 'text-yellow-400'
                      : 'text-red-400'
                }`}>
                {connectionStatus}
              </Text>
            </View>
          </View>
          <View className="mb-2 flex-row items-center justify-between">
            <Text className="text-zinc-400">Tracking de Ubicación</Text>
            <View className="flex-row items-center">
              <View
                className={`mr-2 h-3 w-3 rounded-full ${
                  isTracking ? 'bg-green-500' : 'bg-zinc-600'
                }`}
              />
              <Text className={`font-semibold ${isTracking ? 'text-green-400' : 'text-zinc-400'}`}>
                {isTracking ? 'Activo' : 'Inactivo'}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-zinc-400">Estado del Recorrido</Text>
            <View className="flex-row items-center">
              <View
                className={`mr-2 h-3 w-3 rounded-full ${
                  isRecorridoActive ? 'bg-blue-500' : 'bg-zinc-600'
                }`}
              />
              <Text
                className={`font-semibold ${
                  isRecorridoActive ? 'text-blue-400' : 'text-zinc-400'
                }`}>
                {isRecorridoActive ? 'En Recorrido' : 'Detenido'}
              </Text>
            </View>
          </View>
        </View>

        {/* --- Botón Principal Único --- */}
        <TouchableOpacity
          onPress={handleToggleTrayecto}
          className={`mb-6 flex-row items-center justify-center rounded-xl border py-4 ${
            isRecorridoActive ? 'border-red-500 bg-red-600' : 'border-green-500 bg-green-600'
          }`}>
          <Icon name="car" size={24} color="#f4f4f5" style={{ marginRight: 12 }} />
          <Text className="text-lg font-bold text-zinc-100">
            {isRecorridoActive ? 'Finalizar Trayecto' : 'Iniciar Trayecto'}
          </Text>
        </TouchableOpacity>

        {/* --- Tarjeta de Horas --- */}
        <View className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <View className="mb-3 flex-row justify-between">
            <Text className="text-zinc-400">Hora de inicio</Text>
            <Text className="font-semibold text-zinc-100">{startTime || '05:00'}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-zinc-400">Hora final</Text>
            <Text className="font-semibold text-zinc-100">
              {isRecorridoActive ? 'En curso...' : endTime || '00:00'}
            </Text>
          </View>
        </View>

        {/* --- Información del vehículo y ruta asignada --- */}
        <Text className="mb-3 text-sm font-bold text-zinc-300">Información asignada</Text>
        <View className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          {isLoadingAssigned ? (
            <Text className="text-zinc-400">Cargando información asignada...</Text>
          ) : assignedData ? (
            <>
              <View className="mb-3 border-b border-zinc-700 pb-3">
                <Text className="text-zinc-400">Placas del vehículo</Text>
                <Text className="text-base font-semibold text-zinc-100">{assignedData.licencePlate}</Text>
              </View>
              <View>
                <Text className="text-zinc-400">Número de ruta</Text>
                <Text className="text-base font-semibold text-zinc-100">
                  {assignedData.numberRoute}
                </Text>
              </View>
            </>
          ) : (
            <Text className="text-zinc-400">No se pudo cargar la información asignada</Text>
          )}
        </View>

        {/* --- Historial de recorridos --- */}
        <Text className="mb-3 text-sm font-bold text-zinc-300">Historial de recorridos</Text>
        <View className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          {isLoadingHistory ? (
            <Text className="text-zinc-400">Cargando historial de recorridos...</Text>
          ) : tripHistory.length > 0 ? (
            tripHistory.map((item, index) => (
              <View
                key={item.id}
                className={`py-3 ${index < tripHistory.length - 1 ? 'border-b border-zinc-700' : ''}`}>
                <Text className="font-semibold text-zinc-100">{item.fecha}</Text>
                <Text className="text-zinc-400">
                  {item.inicio} - {item.fin}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-zinc-400">No hay recorridos registrados</Text>
          )}
        </View>

        {/* --- Footer --- */}
        <View className="my-8 items-center">
          <Text className="text-zinc-500">UrbanTracker Driver</Text>
          <Text className="text-zinc-500">Versión 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
