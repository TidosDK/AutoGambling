import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Car = {
  id: string
  make: string;
  model: string;
  year: number;
  color: string;
  pricePerDay: number;
  isAvailable: boolean;
};

export default function CarItem(Car: Car) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.idText}>ID: {Car.id.toString()}</Text>
        <Text style={styles.carType}>Make: {Car.make.toString()}</Text>
        <Text style={styles.mileage}>Model: {Car.model.toString()}</Text>
        <Text style={styles.mileage}>Year: {Car.year.toString()}</Text>
        <Text style={styles.mileage}>Color: {Car.color.toString()}</Text>
        <Text style={styles.mileage}>Price Per Day: {Car.pricePerDay.toString()} DKK</Text>
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
});
