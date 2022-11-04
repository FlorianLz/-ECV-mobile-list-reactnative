import React, { useEffect, useState } from "react";
import { FlatList, Image, ListViewComponent, StyleSheet, Text, TextInput, View } from "react-native";
import CharacterCard from "../components/CharacterCard";

export default function Homepage({navigation}: {navigation: any}) {

    type Character = {
        name: string,
        image: string
    }

    const [characters, setCharacters] = useState<Character[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetch("https://rickandmortyapi.com/api/character")
                .then((response) => response.json())
                .then((data) => setCharacters(data.results));
    }

    function handleChange(searchValue: string) {
        fetch(`https://rickandmortyapi.com/api/character/?name=${searchValue}`)
                .then((response) => response.json())
                .then((data) => setCharacters(data.results));
    }

  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Rechercher un personnage" onChangeText={handleChange} />
        <FlatList data={characters} renderItem={({item}) => <>
            <CharacterCard navigation={navigation} character={item} />
        </>}
    />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
  });
