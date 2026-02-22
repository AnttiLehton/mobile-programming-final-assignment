import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import {auth} from "./firebase";

import { signOut } from "firebase/auth";

export default function MainPage({ navigation }) {
    const user = auth.currentUser;

     const handleLogout = async () => {
        await signOut(auth);
        navigation.navigate("Login");
    };
return (
<View style={styles.container}>
    <Text>Welcome, {user?.email}!</Text>
    <Text>Main Page</Text>

     <Button title="Logout" onPress={handleLogout} />
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