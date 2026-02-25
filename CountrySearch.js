import React, { useState } from 'react';
import { View, TextInput, FlatList, Button, Alert } from 'react-native';

export default function CountrySearch() {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);

    const searchCountries = async () => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${keyword}`
        );
        const data = await response.json();
        setResults(data);
        } catch (error) {
            console.error('Error fetching countries:', error);
            Alert.alert('Error', 'Failed to fetch countries. Please try again.');
        }
    }
};


    return (
        <View style={{ padding: 16 }}>
            <TextInput
            placeholder='Search country'
            value='{keyword}'
            onChangeText={setKeyword}
            style={{ borderWidth: 1, padding: 10, marginBottom: 12 }}
            /> 
            <Button title='Search' onPress={searchCountries} />
            <FlatList
                data={results}
                keyExtractor={(item) => item.cca3}
                renderItem={({ item }) => (
                    <View style= {styles.item}>
                        <image
                            source={{ uri: item.flags.png }}
                            style={{ width: 50, height: 30, marginRight: 10 }}
                        />  
                        <Text>{item.name.common}</Text>
                    </View>
                )}
            />
        </View>
    );


const styles = styleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, padding: 10, marginBottom: 12 },
    item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
});
                
