import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {auth} from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function SignUpScreen ({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("Locations");
      })
      .catch ((error) => {
        Alert.alert("Login Failed", error.message);
        });
    };


return (
    <View style={{ padding: 20 }}>
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />
        <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
            />
        <Button title="Login" onPress={handleLogin} />  

      </View>
    );
}
