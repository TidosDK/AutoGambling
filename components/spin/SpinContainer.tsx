import React, {useEffect, useRef} from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import TicketCard from './TicketCard';

const {width: screenWidth} = Dimensions.get('window');

const SpinContainer: React.FC = () => {
    const ticketCount: number = 5;
    const ticketSize: number = screenWidth * 0.18;
    const tickets = Array.from({length: ticketCount}, (_, i) => `TicketCard ${i + 1}`);

    const speedPerPixel: number = 5;

    const animatedValues = useRef<Animated.Value[]>(
        tickets.map(() => new Animated.Value(0))
    ).current;

    useEffect(() => {
        animatedValues.forEach((animatedValue, index) => {
            animateTicket(animatedValue, index);
        });
    });

    const animateTicket = (animatedValue: Animated.Value, index: number) => {
        const initialPosition = screenWidth + index * (ticketSize + 10); // Start position on the right
        const endPosition = -ticketSize; // End position off the left

        const distance = initialPosition - endPosition;

        const duration = distance * speedPerPixel;

        animatedValue.setValue(initialPosition); // Set initial position
        
        Animated.timing(animatedValue, {
            toValue: endPosition,
            duration: duration, // Time for the ticket to travel across the screen
            useNativeDriver: true,
        }).start(() => {
            // After animation ends, reset position to right
            animateTicket(animatedValue, index);
        });
    };

    return (
        <View style={styles.container}>
            {tickets.map((ticket, index) => (
                <TicketCard key={index} rarity={ticket} xPosition={animatedValues[index]} />
        ))}
        </View>
    );
}


/*

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

*/

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#999',
        alignItems: 'center',
        position: 'relative',
        //justifyContent: 'space-evenly',
        flexDirection: 'row',
        width: '160%',
        height: '20%',
    },
});

export default SpinContainer;