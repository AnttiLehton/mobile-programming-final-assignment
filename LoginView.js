import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; 

export default function LoginView({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Main");
    } catch (error) {
      Alert.alert("Error", error?.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button color="rgb(59, 168, 99)" title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: '#ffe3ef' },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center", fontFamily: 'Merriweather' },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
  link: { color: "#257b33", textAlign: "center", marginTop: 15 },
});
