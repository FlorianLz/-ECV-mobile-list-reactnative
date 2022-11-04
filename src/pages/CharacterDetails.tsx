import React, { PropsWithChildren } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function CharacterDetails({route}: PropsWithChildren<{route: any}>) {
    const { character } = route.params;
    return <>
        <View>
            <Image style={styles.image} source={{uri: character.image}} />
            <Text style={styles.name}>{character.name}</Text>
        </View>
    </>
}

const styles = StyleSheet.create({
    name: {
      padding: 10,
      fontSize: 22,
      height: 44,
      textAlign: 'center'
    },
    image: {
        width: '100%',
        height: '70%',
        resizeMode: 'cover'
    }
  });