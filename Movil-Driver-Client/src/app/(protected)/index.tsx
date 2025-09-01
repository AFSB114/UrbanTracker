import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHome } from '@/hooks/home/useHome';

// --- Datos de ejemplo ---
const vehicleInfo = {
  placas: 'CUM-666',
  numeroInterno: '123-456',
};

const historyData = [
  { id: '1', fecha: '14/03/2025', inicio: '03:00', fin: '19:00' },
  { id: '2', fecha: '15/03/2025', inicio: '03:10', fin: '18:40' },
  { id: '3', fecha: '16/03/2025', inicio: '03:05', fin: '19:15' },
];

export default function Home() {
  const {
    modalVisible,
    asunto,
    descripcion,
    isRecorridoActive,
    startTime,
    endTime,
    isTracking,
    connectionStatus,
    setModalVisible,
    setAsunto,
    setDescripcion,
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

        {/* --- Información del vehículo --- */}
        <Text className="mb-3 text-sm font-bold text-zinc-300">Información del vehículo</Text>
        <View className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <View className="mb-3 border-b border-zinc-700 pb-3">
            <Text className="text-zinc-400">Placas</Text>
            <Text className="text-base font-semibold text-zinc-100">{vehicleInfo.placas}</Text>
          </View>
          <View>
            <Text className="text-zinc-400">Número interno</Text>
            <Text className="text-base font-semibold text-zinc-100">
              {vehicleInfo.numeroInterno}
            </Text>
          </View>
        </View>

        {/* --- Historial de recorridos --- */}
        <Text className="mb-3 text-sm font-bold text-zinc-300">Historial de recorridos</Text>
        <View className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          {historyData.map((item, index) => (
            <View
              key={item.id}
              className={`py-3 ${index < historyData.length - 1 ? 'border-b border-zinc-700' : ''}`}>
              <Text className="font-semibold text-zinc-100">{item.fecha}</Text>
              <Text className="text-zinc-400">
                {item.inicio} - {item.fin}
              </Text>
            </View>
          ))}
        </View>

        {/* --- Botón de Reportes --- */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="mb-6 flex-row items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 py-4">
          <Icon name="message-alert-outline" size={20} color="#f4f4f5" style={{ marginRight: 8 }} />
          <Text className="text-base font-semibold text-zinc-100">Reportes</Text>
        </TouchableOpacity>

        {/* --- Footer --- */}
        <View className="my-8 items-center">
          <Text className="text-zinc-500">UrbanTracker Driver</Text>
          <Text className="text-zinc-500">Versión 1.0.0</Text>
        </View>
      </ScrollView>

      {/* --- MODAL --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="flex-1 items-center justify-center bg-zinc-950/80">
          <View className="w-11/12 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
            <Text className="mb-4 text-xl font-bold text-zinc-100">Crear Reporte</Text>

            <Text className="mb-1 text-zinc-400">Asunto</Text>
            <TextInput
              className="mb-4 rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-zinc-100"
              placeholder="Ej: Falla mecánica, Tráfico inesperado"
              placeholderTextColor="#71717a"
              value={asunto}
              onChangeText={setAsunto}
            />

            <Text className="mb-1 text-zinc-400">Descripción</Text>
            <TextInput
              className="text-top h-24 rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-zinc-100"
              placeholder="Describe la novedad detalladamente..."
              placeholderTextColor="#71717a"
              multiline={true}
              textAlignVertical="top"
              value={descripcion}
              onChangeText={setDescripcion}
            />

            <View className="mt-6 flex-row justify-end">
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setAsunto('');
                  setDescripcion('');
                }}
                className="mr-2 px-4 py-2">
                <Text className="font-semibold text-zinc-400">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleEnviarReporte}
                className="rounded-lg border border-green-500 bg-green-600 px-6 py-2">
                <Text className="font-bold text-zinc-100">Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
