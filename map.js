import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function Map() {
  const [region, setRegion] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [locations, setLocations] = useState([]);

  // Fetch locations from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "locations"), (snapshot) => {
      const locs = [];
      snapshot.forEach((doc) => {
        locs.push({ id: doc.id, ...doc.data() });
      });
      setLocations(locs);
    });
    return unsubscribe;
  }, []);

  // Get user's current location
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
      <MapView style={styles.map} region={region} onRegionChange={setRegion}>
        {locations.map((loc) =>
          loc.latitude && loc.longitude ? (
            <Marker
              key={loc.id}
              coordinate={{
                latitude: loc.latitude,
                longitude: loc.longitude,
              }}
              title={loc.name}
              description={loc.description}
            />
          ) : null
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});