import User from "./User";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@user_data";
var currentUser = null;

const readDataFromJson = async () => {
  try {
    const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonData != null ? JSON.parse(jsonData) : [];
  } catch (error) {
    console.error("Error reading data from AsyncStorage:", error);
    throw error;
  }
};

export const importDataFromJson = async () => {
  try {
    const storedData = await readDataFromJson();

    if (storedData.length === 0 && !Array.isArray(storedData)) {
      return [];
    }

    const users = storedData.map(
      (user) =>
        new User(user.id, user.name, user.password, user.tickets, user.tokens)
    );

    return users;
  } catch (error) {
    console.error("Error importing data:", error);
    throw error;
  }
};

const writeDataToJson = async (newData) => {
  try {
    const existingData = await readDataFromJson();
    const mergedData = mergeUserData(existingData, newData);
    const jsonData = JSON.stringify(mergedData);

    await AsyncStorage.setItem(STORAGE_KEY, jsonData);
  } catch (error) {
    console.error("Error writing data to AsyncStorage:", error);
    throw error;
  }
};

const mergeUserData = (existingData, newData) => {
  const userMap = new Map();

  existingData.forEach((user) => {
    userMap.set(user.id, user);
  });

  newData.forEach((user) => {
    userMap.set(user.id, { ...userMap.get(user.id), ...user });
  });

  return Array.from(userMap.values());
};

export const updateUserData = async (newUserData) => {
  try {
    await writeDataToJson(newUserData);
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

async function generateNewId() {
  try {
    const users = await importDataFromJson();
    let newId = 1;

    if (users.length === 0) {
      return newId;
    }

    newId = Math.max(...users.map((user) => user.id)) + 1;

    return newId;
  } catch (error) {
    console.error("Error generating new ID:", error);
    throw error;
  }
}

export const createUser = async (name, password) => {
  try {
    const newId = await generateNewId();
    const newUser = new User(
      newId,
      name,
      password,
      {
        common: 0,
        rare: 0,
        epic: 0,
        legendary: 0,
      },
      0 // Tokens
    );

    await updateUserData([newUser]);
    await loginAsUser(name, password);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const loginAsUser = async (name, password) => {
  try {
    const users = await importDataFromJson();
    const user = users.find(
      (user) => user.name === name && user.password === password
    );

    if (user) {
      currentUser = user;
      return currentUser.id;
    } else {
      console.warn("Wrong password attempt");
      return null;
    }
  } catch (error) {
    console.error("Error logging in a user:", error);
    throw error;
  }
};

export function getCurrentUser() {
  if (currentUser == null) {
    return "Not logged in";
  }
  return currentUser;
}

export const clearUserData = async () => {
  try {
    await AsyncStorage.clear();
    currentUser = null;
    console.info("User data was cleared.");
  } catch (error) {
    console.error("Error clearing data:", error);
    throw error;
  }
};
