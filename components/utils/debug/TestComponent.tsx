// This component is only for testing when combining the different components developed.

import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { importDataFromJson, createUser, clearUserData, getCurrentUser } from '../UserDataHandler';
import User from "../User";

export default function MyComponent() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userData: User | null = await getCurrentUser();
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error loading current user data:', error);
      }
    };

    loadCurrentUser();
  }, []);

  useEffect(() => {
    importDataFromJson().catch((error) => {
      console.error('Error loading JSON data:', error);
    });
  }, []);

  const handleCreateUser = async () => {
    await createUser("Name" + Math.random(), "Password" + Math.random());
    const userData = await getCurrentUser();
    setCurrentUser(userData);
  };

  const handleClearUsers = async () => {
    await clearUserData();
    setCurrentUser(null);
  };

  return (
    <View style={styles.container}>
      {currentUser ? (
        <View>
          <Text style={styles.text}>User ID: {currentUser.id}</Text>
          <Text style={styles.text}>Name: {currentUser.name}</Text>
          <Text style={styles.text}>Password: {currentUser.password}</Text>
          {currentUser.tickets && (
            <Text style={styles.text}>
              Tickets: Common: {currentUser.tickets.common}, Rare: {currentUser.tickets.rare}, Epic: {currentUser.tickets.epic}, Legendary: {currentUser.tickets.legendary}
            </Text>
          )}
          <Text style={styles.text}>Tokens: {currentUser.tokens}</Text>
        </View>
      ) : (
        <Text style={styles.text}>No user data available</Text>
      )}

      <Button title="Create New User" onPress={handleCreateUser} />
      <Text></Text>
      <Button title="Clear User Data" onPress={handleClearUsers} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
});
