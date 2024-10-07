import React from "react";
import { Button, View, Text } from "react-native";
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarList from "./CarList";

export default function ProductList() {
    const navigation = useNavigation();

    const productPage = () => {
        navigation.navigate('ProductView');
    }

    return (
        <View style={styles.container}>
            <CarList />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: screen.availWidth,
    },
});