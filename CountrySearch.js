import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, Button, Alert, StyleSheet } from 'react-native';

export default function CountrySearch() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const searchCountries = async () => {
    if (!keyword.trim()) {
      Alert.alert('Info', 'Please enter a country name.');
      return;
    }

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(keyword)}`);
      const data = await response.json();

    

    }
}

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search country"
        value={keyword}
        onChangeText={setKeyword}
        style={styles.input}
        autoCapitalize="none"
      />

      <Button title="Search" onPress={searchCountries} />

      <FlatList
        data={results}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: item.flags?.png }}
              style={{ width: 50, height: 30, marginRight: 10 }}
              resizeMode="cover"
            />
            <Text>{item.name?.common}</Text>
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