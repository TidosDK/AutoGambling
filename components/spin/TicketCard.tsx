import React from 'react';
import { View, Text, StyleSheet, Animated } from "react-native";


interface TicketProp {
    rarity: string;
    xPosition: Animated.Value;
}

const TicketCard: React.FC<TicketProp> = ({rarity, xPosition}) => {
    return (
        <Animated.View style={[styles.ticketCard, { transform:[{ translateX: xPosition}] }]}>
            <Text>{rarity}</Text>
        </Animated.View>
    )
}

export default TicketCard;


const styles = StyleSheet.create({
    ticketCard: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        height: '80%',
        width: '18%',
    },
});