import React, { PropsWithChildren, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

export default function CharacterDetails({route}: PropsWithChildren<{route: any}>) {
    const { character } = route.params;
    const [image, setImage] = React.useState(character.image);
    const usersCollection = firestore().collection('likes');
    const [nbLikes, setNbLikes] = React.useState(0);

    function takePicture(): void {
        launchCamera({mediaType: 'photo'}, (response: any) => {
            if(response.didCancel || response.errorCode || response.assets.length == 0) { 
                return;
            }
            setImage(response.assets[0].uri);
        }
        );
    }

    useEffect(() => {
        const subscriber = firestore()
        .collection('likes')
        .doc(character.id.toString())
        .onSnapshot(documentSnapshot => {
            if (documentSnapshot.exists) {
                setNbLikes(documentSnapshot.data()?.likes);
            }else {
                firestore().collection('likes').doc(character.id.toString()).set({likes: 0});
            }
            
        });
        return () => subscriber();
    }, [nbLikes]);

    return <>
        <View>
            <Image style={styles.image} source={{uri: image}} />
            <Text style={styles.name}>{character.name}</Text>
            <Button onPress={()=>takePicture()} title="Modifier la photo" />
            <Text style={styles.name}>{nbLikes} likes</Text>
            <Button onPress={() => {
                usersCollection.doc(character.id.toString()).update({
                    likes: nbLikes + 1
                });
            }} title="J'aime" />
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
