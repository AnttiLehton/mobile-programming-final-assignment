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

      <Button color="rgb(59, 168, 99)" title="Sijainti" onPress={() => navigation.navigate("Location")} />
      <Button color="rgb(59, 168, 99)" title="Kartta" onPress={() => navigation.navigate("map")} />
      <Button color="rgb(59, 168, 99)" title="Lisää sijainteja" onPress={() => navigation.navigate("AddLocation")} />
      <Button color="rgb(59, 168, 99)" title="Hae maita" onPress={() => navigation.navigate("CountrySearch")} />

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
    backgroundColor: '#ffe3ef'
  },
});