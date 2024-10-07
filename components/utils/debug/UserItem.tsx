import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type UserType = {
  id: string
  name: string;
  password: string;
  tickets: {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
  };
};

export default function UserItem(User: UserType) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.idText}>ID: {User.id.toString()}</Text>
        <Text style={styles.carType}>Name: {User.name.toString()}</Text>
        <Text style={styles.mileage}>Password: {User.password.toString()}</Text>
        <View style={styles.container}>
          <View style={[styles.card, styles.commonCard]}>
            <Text style={styles.cardTitle}>Common</Text>
            <Text style={styles.cardValue}>{User.tickets.common}</Text>
          </View>
          <View style={[styles.card, styles.rareCard]}>
            <Text style={styles.cardTitle}>Rare</Text>
            <Text style={styles.cardValue}>{User.tickets.rare}</Text>
          </View>
          <View style={[styles.card, styles.epicCard]}>
            <Text style={styles.cardTitle}>Epic</Text>
            <Text style={styles.cardValue}>{User.tickets.epic}</Text>
          </View>
          <View style={[styles.card, styles.legendaryCard]}>
            <Text style={styles.cardTitle}>Legendary</Text>
            <Text style={styles.cardValue}>{User.tickets.legendary}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  textContainer: {
    flexDirection: 'column',
  },
  idText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  carType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  mileage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commonCard: {
    backgroundColor: '#D3D3D3', // Light gray for common
  },
  rareCard: {
    backgroundColor: '#ADD8E6', // Light blue for rare
  },
  epicCard: {
    backgroundColor: '#9370DB', // Medium purple for epic
  },
  legendaryCard: {
    backgroundColor: '#FFD700', // Gold for legendary
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
});
