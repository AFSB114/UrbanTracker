import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { API_KEY_GOOGLE_MAPS } from '@/constants';

export default function MapGoogle() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        userInterfaceStyle="dark"
        mapType="standard"
        googleMapId="70f4ae6f87d56577fda98603"
        showsUserLocation
        initialRegion={{
          latitude: 2.9627077041512173,
          longitude: -75.28764721122003,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045,
        }}>
        <MapViewDirections
          origin={{
            latitude: 2.9621740496885867,
            longitude: -75.28601298596917,
          }}
          destination={{
            latitude: 2.9420341493591757,
            longitude: -75.29783658004713,
          }}
          waypoints={[
            {
              latitude: 2.9632596589803635,
              longitude: -75.29622785180605,
            },
          ]}
          apikey={API_KEY_GOOGLE_MAPS}
          strokeWidth={5}
          strokeColor="green"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
