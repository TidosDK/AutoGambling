import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, Image } from "react-native";
import SpinContainer from './SpinContainer';


export default function SpinTab() {
    const [speed, setSpeed] = useState(2); // Speed at which tickets move
    const [ticketPositions, setTicketPositions] = useState<number[]>([]); // Track the x-positions of each ticket
    const [ticketRarities, setTicketRarities] = useState<string[]>([]); // Track the rarity of each ticket
    const [ticketWon, setTicketWon] = useState<string>();
    const [winningTextVisible, setWinningTextVisible] = useState<boolean>(false);
    const [spinButtonVisble, setSpinButtonVisible] = useState<boolean>(true);
    
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Try your luck!</Text>
            { winningTextVisible && <Text style={[styles.headerText, {fontSize: 16}]}>You won a {ticketWon} ticket!</Text> }
            <View style={styles.arrowContainer}>
                <Image
                    style={styles.arrow} 
                    source={require('../../assets/arrow-down-filled.png')}
                />
            </View>
            <SpinContainer speed={speed} ticketPositions={ticketPositions} setTicketPositions={setTicketPositions} ticketRarities={ticketRarities} setTicketRarities={setTicketRarities}/>
            {spinButtonVisble && <Button onPress={Spin} title='Spin!'/>}
        </View>
    )

    function Spin() {
        setSpeed((prevSpeed) => {
            return 40;
        });

        setSpinButtonVisible((prevVisible) => {
            return false;
        })

        const interval = setInterval(() => {
            setSpeed((prevSpeed) => {
                if (prevSpeed < 0) {
                    clearInterval(interval);

                    setTicketPositions((prevPositions) => {
                        setTicketRarities((prevRarities) => {
                            let winningIndex : number = 0;

                            for (let i = 0; i < ticketPositions.length; i++) {
                                if (prevPositions[i] >= 90 && prevPositions[i] <= 200) {
                                    winningIndex = i;
                                }
                            }
                            setTicketWon((prevWon) => {
                                setWinningTextVisible((prevVisible) => {return true;})
                                setSpinButtonVisible((prevVisible) => {return true;})

                                const cooldownTimer = setTimeout(() => {
                                    setWinningTextVisible((prevVisible) => {return false;})
                                }, 5000);

                                return prevRarities[winningIndex];
                            });
                            return prevRarities;
                        })
                        return prevPositions;
                    })
                    return 0;
                }
                return prevSpeed - 0.5;
            });
        }, 60); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowContainer: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#EEE',
    },
    arrow: {
        width: 25,
        height: 35,
        resizeMode: 'stretch',
    },
    headerText: {
        fontSize: 28, // Large font size for the header
        fontWeight: 'bold',
        color: '#fff', // White text color
        textTransform: 'uppercase', // Uppercase letters
        letterSpacing: 2, // Spacing between letters for a modern look
    },
});