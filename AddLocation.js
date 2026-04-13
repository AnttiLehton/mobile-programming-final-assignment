import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export default function AddLocation() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  console.log("AddLocation rendered, db:", db);

  const savelocation = async () => {
    try {
      console.log("SAVE PRESSED", { name, description, rating });

      const docRef = await addDoc(collection(db, "locations"), {
        name: name.trim(),
        description: description.trim(),
        rating: Number(rating),
        createdAt: serverTimestamp(),
      });

      console.log("SAVED OK:", docRef.id);
      Alert.alert("Tallennettu", `id: ${docRef.id}`);

      setName("");
      setDescription("");
      setRating("");
    } catch (error) {
      console.log("SAVE ERROR:", error);
      Alert.alert("Virhe", error.message);
    }
  };

  return (
    <View style={{ padding: 16, gap: 12, backgroundColor: '#ffe3ef' }}>
      <TextInput color="rgb(59, 168, 99)" style={{ borderWidth: 1, padding: 10 }} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput color="rgb(59, 168, 99)" style={{ borderWidth: 1, padding: 10 }} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput color="rgb(59, 168, 99)" style={{ borderWidth: 1, padding: 10 }} placeholder="Rating" value={rating} onChangeText={setRating} keyboardType="numeric" />
      <Button color="rgb(59, 168, 99)" title="Save Location" onPress={savelocation} />
    </View>
  );
}
