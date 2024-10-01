import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import SpinContainer from './SpinContainer';


export default function SpinTab() {
    return (
        <View style={styles.container}>
            <Text>Spin Tab!</Text>
            <SpinContainer/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'center',
    },
});