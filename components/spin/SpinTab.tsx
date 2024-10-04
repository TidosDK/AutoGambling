import React, {useState} from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import SpinContainer from './SpinContainer';


export default function SpinTab() {
    const [speed, setSpeed] = useState(2); // Speed at which tickets move
    const [ticketPositions, setTicketPositions] = useState<number[]>([]); // Track the x-positions of each ticket
    const [ticketRarities, setTicketRarities] = useState<string[]>([]); // Track the rarity of each ticket
    const [ticketWon, setTicketWon] = useState<string>();
    const [winningTextVisible, setWinningTextVisible] = useState<boolean>(false);
    const [spinButtonDisable, setSpinButtonDisable] = useState<boolean>(false);
    
    return (
        <View style={styles.container}>
            
            <View style={[{width: '100%', height: 45, justifyContent: 'center', alignItems: 'flex-start', margin: 20, backgroundColor: '#eee', paddingLeft: 15}]}>
                <Text style={[styles.headerText, {fontSize: 28, alignItems: 'flex-start', color: '#333', letterSpacing: 0}]}>Tokens: 175</Text>
            </View>
            
            <View style={[{width: '100%', alignItems: 'flex-start', margin: 20, paddingLeft: 15, paddingRight: 15}]}>
                <Text style={[styles.headerText, {fontSize: 16, alignItems: 'flex-start'}]}>Your tickets</Text>
                <View style={[{width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <View style={[styles.ticketContainer, {backgroundColor: '#b9cde1'}]}>
                        <Text style={[styles.headerText, {fontSize: 12, color: '#333', letterSpacing: 0}]}>Common</Text>
                        <Text style={[styles.headerText, {fontSize: 20, color: '#333', letterSpacing: 0}]}>7</Text>
                    </View>
                    <View style={[styles.ticketContainer, {backgroundColor: '#73dce6'}]}>
                        <Text style={[styles.headerText, {fontSize: 12, color: '#333', letterSpacing: 0}]}>Rare</Text>
                        <Text style={[styles.headerText, {fontSize: 20, color: '#333', letterSpacing: 0}]}>3</Text>
                    </View>
                    <View style={[styles.ticketContainer, {backgroundColor: '#b982e6'}]}>
                        <Text style={[styles.headerText, {fontSize: 12, color: '#333', letterSpacing: 0}]}>Epic</Text>
                        <Text style={[styles.headerText, {fontSize: 20, color: '#333', letterSpacing: 0}]}>1</Text>
                    </View>
                    <View style={[styles.ticketContainer, {backgroundColor: '#f0bf64'}]}>
                        <Text style={[styles.headerText, {fontSize: 12, color: '#333', letterSpacing: 0}]}>Legendary</Text>
                        <Text style={[styles.headerText, {fontSize: 20, color: '#333', letterSpacing: 0}]}>0</Text>
                    </View>
                </View>
            </View>

            <View style={[{height: 25}]}></View>

            <View style={[{width: '100%', alignItems: 'center', justifyContent: 'center'}]}>
                <Text style={styles.headerText}>Try your luck!</Text>
                <View style={styles.arrowContainer}>
                    <Image
                        style={styles.arrow} 
                        source={require('../../assets/arrow-down-filled.png')}
                    />
                    <SpinContainer speed={speed} ticketPositions={ticketPositions} setTicketPositions={setTicketPositions} ticketRarities={ticketRarities} setTicketRarities={setTicketRarities}/>
                </View>
                <View style={[{height: 35, justifyContent: 'center'}]}>
                    {winningTextVisible &&
                        <View style={[{height: 35, justifyContent: 'center'}]}>
                            <Text style={[styles.headerText, {fontSize: 16}]}>You won a {ticketWon} ticket!</Text>
                        </View>}
                </View>
                <View style={[{height: 70, width: '100%', alignItems: 'center'}]}>
                        <TouchableOpacity disabled={spinButtonDisable} style={styles.button} onPress={Spin} activeOpacity={0.7}>
                            <Text style={[styles.headerText, {fontSize: 18}]}>Spin!</Text>
                        </TouchableOpacity>
                        <Text style={[styles.headerText, {fontSize: 10, color: '#999'}]}>Costs 50 tokens</Text>
                </View>
            </View>

            <View style={[{width: '100%', alignItems: 'flex-start', margin: 50, paddingLeft: 15}]}>
                <Text style={[styles.headerText, {fontSize: 10, color: '#777'}]}>Chance distribution:</Text>
                <Text style={[styles.headerText, {fontSize: 10, color: '#777'}]}>- Common: 60%</Text>
                <Text style={[styles.headerText, {fontSize: 10, color: '#777'}]}>- Rare: 25%</Text>
                <Text style={[styles.headerText, {fontSize: 10, color: '#777'}]}>- Epic: 10%</Text>
                <Text style={[styles.headerText, {fontSize: 10, color: '#777'}]}>- Legendary: 5%</Text>
            </View>
        </View>
    )

    function Spin() {
        setSpeed((prevSpeed) => {
            return 40;
        });

        setSpinButtonDisable((prevVisible) => {
            return true;
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
                                setSpinButtonDisable((prevVisible) => {return false;})

                                const cooldownTimer = setTimeout(() => {
                                    setWinningTextVisible((prevVisible) => {return false;})
                                    setSpeed((prevSpeed) => {
                                        if (prevSpeed == 0)
                                            return 2;
                                        return prevSpeed;
                                    })
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
        backgroundColor: '#444',
        alignItems: 'center',
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    button: {
        backgroundColor: '#4A90E2', 
        width: 140,          
        height: 60,
        margin: 5,        
        borderRadius: 25,             
        alignItems: 'center',         
        justifyContent: 'center',    
        shadowColor: '#000',         
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,              
    },
    ticketContainer: {
        width: 80, 
        height: 80, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
        shadowColor: '#000',     
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,  
    }
});