import { Accuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function GetLocation() {
    useEffect(() => {
        requestLocation();
    
        async function requestLocation() {
            console.log('Get location...')

        let {status} = await requestForegroundPermissionsAsync();

        if (status !== "granted") { 
            console.log("Location permission not granted");
            return;
        }
        console.log("Location permission granted");

        const location = await getCurrentPositionAsync({ accuracy: Accuracy.Lowest });

        console.log(location);

    
}
}, []);

    return (
        <View style={styles.container}>
            <Text>Get Location</Text>

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
