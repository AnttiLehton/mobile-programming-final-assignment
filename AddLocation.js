import React, {useState} from "react";
import { View, TextInput, Button } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export default function AddLocation() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    const savelocation = async () => {
        try {
            await addDoc(collection(db, "locations"), {
                name,
                description,
                rating,
            });
        } catch (error) {
            console.log(error)
        }
    }


 return(
    <View>
        <TextInput placeholder="Name" value={name} onChangeText={setName} />
        <TextInput placeholder="Description" value={description} onChangeText={setDescription} />
         <TextInput placeholder="Rating" value={rating} onChangeText={setRating} keyboardType="numeric" />
        <Button title = "Save Location" onPress={savelocation} />
        </View>
);
    }