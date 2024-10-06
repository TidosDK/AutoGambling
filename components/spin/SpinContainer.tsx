import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TicketCard from './TicketCard';

const getRandomRarity = () => {
  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];
  const rand: number = Math.random();
  if (rand < 0.6)
    return rarities[0];
  if (rand < 0.85)
    return rarities[1];
  if (rand < 0.95)
    return rarities[2];
  return rarities[3];
};

interface SpinContainerProp {
  speed: number;
  ticketPositions: number[];
  setTicketPositions: React.Dispatch<React.SetStateAction<number[]>>;
  ticketRarities: string[];
  setTicketRarities: React.Dispatch<React.SetStateAction<string[]>>;
}

const SpinContainer: React.FC<SpinContainerProp> = ({ speed, ticketPositions, setTicketPositions, ticketRarities, setTicketRarities }) => {
  const ticketWidth = 100;
  const numTickets = 5;

  useEffect(() => {
    const initialPositions = [];
    const initialRarities = [];

    for (let i = 0; i < numTickets; i++) {
      initialPositions.push(i * (ticketWidth + 10)); // Set even spacing between tickets
      initialRarities.push(getRandomRarity()); // Assign random rarity
    }

    setTicketPositions(initialPositions);
    setTicketRarities(initialRarities);
  }, []);

  // Move tickets continuously
  useEffect(() => {
    const interval = setInterval(() => {
      let someIndex: number | null = null;

      setTicketPositions((prevPositions) => {
        return prevPositions.map((pos, index) => {
          const newPos = pos - speed; // Move left by the speed value

          // Check if the ticket is off screen
          if (newPos < -ticketWidth) {
            someIndex = index;
            const maxPos = Math.max(...prevPositions); // Get the current rightmost position
            return maxPos + ticketWidth + 10; // Place the ticket behind the last one
          }

          return newPos;
        });
      });

      setTicketRarities((prevRarities) => {
        return prevRarities.map((rarity, index) => {
          if (someIndex == index) {
            return getRandomRarity();
          }
          return rarity;
        });
      });

    }, 16); // Move every 16ms (around 60 frames per second)

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, [speed]);

  return (
    <View style={styles.container}>
      {ticketPositions.map((pos, index) => (
        <TicketCard key={index} rarity={ticketRarities[index]} xPosition={pos} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: 140,
    overflow: 'hidden',
    backgroundColor: '#EEE',
    justifyContent: 'center',
  },
});

export default SpinContainer;