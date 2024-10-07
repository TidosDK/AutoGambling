import { FlatList } from "react-native";
import UserItem, { UserType } from './UserItem';
import { importDataFromJson } from '../UserDataHandler';
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function UserList() {
  const [users, setUsers] = useState<UserType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const importedUsers = await importDataFromJson();
          setUsers(importedUsers);
        } catch (error) {
          console.error('Failed to import user data:', error);
        }
      };

      fetchData();
    }, [])
  );

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <UserItem
          id={item.id.toString()}
          name={item.name}
          password={item.password}
          tickets={item.tickets}
        />
      )}
    />
  )
}
