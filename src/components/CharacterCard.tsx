import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, Image, View, Button, TouchableOpacity, Pressable } from "react-native";
type Character = {
    name: string,
    image: string
}
const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    image: {
        width: 100,
        height: 100
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
  });
export default function CharacterCard({character, navigation}: PropsWithChildren<{character: Character, navigation: any}>) {
    return <>
        <Pressable style={styles.card} onPress={() => {
                    navigation.navigate('Details', {
                      character: character
                    });
                  }}>
            <Text style={styles.item}>{character.name}</Text>
            <Image style={styles.image} source={{uri: character.image}} />
        </Pressable>
    </>
}