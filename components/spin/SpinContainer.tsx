import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import TicketCard from './TicketCard';

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width for positioning

// A simple utility to get a random rarity
const getRandomRarity = () => {
  const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  //TODO: Change the probabilities of rarities
  return rarities[Math.floor(Math.random() * rarities.length)];
};

const SpinContainer: React.FC = () => {
  const ticketWidth = 100; // Fixed width of each ticket
  const numTickets = 5; // Number of tickets to display
  const [ticketPositions, setTicketPositions] = useState<number[]>([]); // Track the x-positions of each ticket
  const [ticketRarities, setTicketRarities] = useState<string[]>([]); // Track the rarity of each ticket
  const [speed, setSpeed] = useState(2); // Speed at which tickets move

  // Initialize ticket positions and rarities when the component mounts
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
  }, [speed]); // The effect depends on the speed

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
    height: 100, // The height of the ticket container
    overflow: 'hidden', // Hide the parts of tickets that move off-screen
  },
});

export default SpinContainer;