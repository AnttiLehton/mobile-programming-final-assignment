import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import * as Location from "expo-location";

export default function AddLocation() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync({});
        setLatitude(coords.latitude.toString());
        setLongitude(coords.longitude.toString());
      }
    })();
  }, []);

  const saveLocation = async () => {
    try {
      await addDoc(collection(db, "locations"), {
        name: name.trim(),
        description: description.trim(),
        latitude: Number(latitude),
        longitude: Number(longitude),
        createdAt: serverTimestamp(),
      });
      Alert.alert("Saved!", "Location added to map");
      setName("");
      setDescription("");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 10 }} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={{ borderWidth: 1, padding: 10 }} />
      <TextInput placeholder="Latitude" value={latitude} editable={false} style={{ borderWidth: 1, padding: 10, color: "#999" }} />
      <TextInput placeholder="Longitude" value={longitude} editable={false} style={{ borderWidth: 1, padding: 10, color: "#999" }} />
      <Button title="Save Location" onPress={saveLocation} />
    </View>
  );
}