import React, { useContext } from "react";   
import { View, Text, StyleSheet, Button } from "react-native";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { UserContext } from "./navigation";

export default function MainPage({ navigation }) {

  const { user } = useContext(UserContext);  

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tervetuloa!</Text>

      <Text>{user ? user : "Guest"}</Text>

      <Button title="Sijainti" onPress={() => navigation.navigate("Location")} />
      <Button title="Kartta" onPress={() => navigation.navigate("Map")} />
      <Button title="Etsi sijainteja" onPress={() => navigation.navigate("AddLocation")} />

      <View style={{ marginTop: 20 }}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});