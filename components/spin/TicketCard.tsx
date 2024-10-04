import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface TicketProps {
  rarity: string;
  xPosition: number;
}

const getBackgroundColor = (rarity: string) => {
  if (rarity == 'Common')
    return '#b9cde1';
  if (rarity == 'Rare')
    return '#73dce6';
  if (rarity == 'Epic')
    return '#b982e6';
  if (rarity == 'Legendary')
    return '#f0bf64';
  return '#b9cde1';
}

const TicketCard: React.FC<TicketProps> = ({ rarity, xPosition }) => {
  const bgColor = getBackgroundColor(rarity);
  
  return (
    <View style={[styles.ticket, { left: xPosition }, {backgroundColor: bgColor}]}>
      {rarity == 'Common' && <Image style={[{height: 60, width: 60}]} source={require('../../assets/car-common.png')}/>}
      {rarity == 'Rare' && <Image style={[{height: 65, width: 65}]} source={require('../../assets/car-rare.png')}/>}
      {rarity == 'Epic' && <Image style={[{height: 70, width: 70}]} source={require('../../assets/car-epic.png')}/>}
      {rarity == 'Legendary' && <Image style={[{height: 80, width: 80}]} source={require('../../assets/car-legendary.png')}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  ticket: {
    position: 'absolute', 
    width: 100, 
    height: 100, 
    backgroundColor: 'skyblue', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 5,
    shadowColor: '#000',        
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,    
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TicketCard;