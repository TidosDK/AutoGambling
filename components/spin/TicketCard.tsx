import React from 'react';
import { View, Text, StyleSheet } from "react-native";


export default function TicketCard() {
    return (
        <View style={styles.container}>
            <Text>Ticket!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: '80%',
        width: '18%',
    },
});