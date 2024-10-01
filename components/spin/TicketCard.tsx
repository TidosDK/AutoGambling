import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TicketProps {
  rarity: string; // Rarity or appearance of the ticket
  xPosition: number; // Horizontal position
}

const getBackgroundColor = (rarity: string) => {
  if (rarity == 'Common')
    return '#b9cde1';
  if (rarity == 'Uncommon')
    return '#82f0be';
  if (rarity == 'Rare')
    return '#73dce6';
  if (rarity == 'Epic')
    return '#b982e6';
  if (rarity == 'Legendary')
    return '#f0bf64';
}

const TicketCard: React.FC<TicketProps> = ({ rarity, xPosition }) => {
  const bgColor = getBackgroundColor(rarity);
  
  return (
    <View style={[styles.ticket, { left: xPosition }, {backgroundColor: bgColor}]}>
      <Text style={styles.text}>{rarity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ticket: {
    position: 'absolute', // Allow us to position it freely
    width: 100, // Set width for the ticket
    height: 100, // Set height for the ticket
    backgroundColor: 'skyblue', // Default color
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TicketCard;