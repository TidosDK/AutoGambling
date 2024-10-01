import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import TicketCard from './TicketCard';


export default function SpinContainer() {
    return (
        <View style={styles.container}>
            <TicketCard/>
            <TicketCard/>
            <TicketCard/>
            <TicketCard/>
            <TicketCard/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#999',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '160%',
        height: '20%',
    },
});