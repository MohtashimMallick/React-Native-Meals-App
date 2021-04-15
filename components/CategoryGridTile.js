import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform, TouchableNativeFeedback, ImageBackground } from "react-native";

const CategoryGridTile = (props) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
            <TouchableCmp

                onPress={props.onSelect}
            >
                <View style={{ ...styles.container, backgroundColor: props.color }}>
                    <ImageBackground source={{ uri: props.imageUrl }} style={styles.bgImage}>
                        <Text numberOfLines={2} style={styles.title}>
                            {props.title}
                        </Text>
                    </ImageBackground>
                </View>
            </TouchableCmp>
        </View>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        elevation: 10,
        overflow: Platform.OS === "android" && Platform.Version >= 21 ? "hidden" : "visible"
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        // padding: 15,
        justifyContent: 'flex-end',
        alignItems: "flex-end"
    },
    title: {
        backgroundColor: "rgba(0,0,0,0.5)",
        color:"white",
        paddingHorizontal: 12,
        paddingVertical: 5,
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        textAlign: 'right'
    },
    bgImage: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-end"
    },
})
export default CategoryGridTile;