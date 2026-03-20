import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [region, setRegion] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const { coords } = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

document.body.style.backgroundColor = '#FFC9D8'