import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, Button, Alert, StyleSheet } from 'react-native';

export default function CountrySearch() {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);

    const [regionFilter, setRegionFilter] = useState('');
    const [minPopulation, setMinPopulation] = useState('');


    const searchCountries = async () => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${keyword}`);
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching countries:', error);
            Alert.alert('Error', 'Failed to fetch countries. Please try again.');
        }
    };




const filteredResults = results.filter((item) => {
const matchesRegion =
    regionFilter === '' ||
    item.region.toLowerCase().includes(regionFilter.toLowerCase());

const matchesPopulation =
    minPopulation === '' ||
    item.population >= Number(minPopulation);

return matchesRegion && matchesPopulation;
});


    return (
        <View style={[styles.container, {backgroundColor: '#ffe3ef'}]}>
            <TextInput
                placeholder='Search country'
                value={keyword}
                onChangeText={setKeyword}
                style={styles.input}
            /> 
            <Button color="rgb(59, 168, 99)" title='Search' onPress={searchCountries} />

            <FlatList
                data={filteredResults}
                keyExtractor={(item) => item.cca3}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image
                            source={{ uri: item.flags.png }}
                            style={{ width: 50, height: 30, marginRight: 10 }}
                        />  
                        <Text>{item.name.common}</Text>
                        <Text> {item.region}</Text>
                        <Text>population : {item.population}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    input: { borderWidth: 1, padding: 10, marginBottom: 12 },
    item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
});