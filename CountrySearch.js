import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, FlatList, Button, Alert, StyleSheet } from 'react-native';

export default function CountrySearch() {
    const [keyword, setKeyword] = useState('');
    const [allCountries, setAllCountries] = useState([]);
    const [results, setResults] = useState([]);

    const [regionFilter, setRegionFilter] = useState('');
    const [minPopulation, setMinPopulation] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                const countries = Array.isArray(data) ? data : [];
                setAllCountries(countries);
                setResults([]);
            } catch (error) {
                console.error('Error fetching countries:', error);
                Alert.alert('Error', 'Failed to fetch countries. Please try again.');
            }
        };

        fetchCountries();
    }, []);

    const searchCountries = () => {
        const filtered = allCountries.filter((item) => {
            const matchesKeyword =
                keyword === '' ||
                item.name.common.toLowerCase().includes(keyword.toLowerCase());

            const matchesRegion =
                regionFilter === '' ||
                item.region.toLowerCase().includes(regionFilter.toLowerCase());

            const matchesPopulation =
                minPopulation === '' ||
                item.population >= Number(minPopulation);

            return matchesKeyword && matchesRegion && matchesPopulation;
        });

        setResults(filtered);
    };

    return (
        <View style={[styles.container, { backgroundColor: '#ffe3ef' }]}>
            <TextInput
                placeholder='Search country'
                value={keyword}
                onChangeText={setKeyword}
                style={styles.input}
            />

            <TextInput
                placeholder='Filter by region'
                value={regionFilter}
                onChangeText={setRegionFilter}
                style={styles.input}
            />

            <TextInput
                placeholder='Minimum population'
                value={minPopulation}
                onChangeText={setMinPopulation}
                keyboardType='numeric'
                style={styles.input}
            />

            <Button color="rgb(59, 168, 99)" title='Search' onPress={searchCountries} />

            <FlatList
                data={results}
                keyExtractor={(item) => item.cca3}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image
                            source={{ uri: item.flags.png }}
                            style={{ width: 50, height: 30, marginRight: 10 }}
                        />
                        <View>
                            <Text>{item.name.common}</Text>
                            <Text>{item.region}</Text>
                            <Text>population : {item.population}</Text>
                        </View>
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