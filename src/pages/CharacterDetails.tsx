import React, { PropsWithChildren } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function CharacterDetails({route}: PropsWithChildren<{route: any}>) {
    const { character } = route.params;
    const [image, setImage] = React.useState(character.image);

    function takePicture(): void {
        launchCamera({mediaType: 'photo'}, (response: any) => {
            if(response.didCancel || response.errorCode || response.assets.length == 0) { 
                return;
            }
            setImage(response.assets[0].uri);
        }
        );
    }

    return <>
        <View>
            <Image style={styles.image} source={{uri: image}} />
            <Text style={styles.name}>{character.name}</Text>
            <Button onPress={()=>takePicture()} title="Modifier la photo" />
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
