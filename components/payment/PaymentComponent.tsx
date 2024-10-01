import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TextInputField = () => {
  const [text, onChangeText] = React.useState('Name on card');
  const [selectedValue, setSelectedValue] = React.useState('Denmark');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Picker
      selectedValue={selectedValue}
      style={styles.picker}
      onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        
        <Picker.Item label="Denmark" value="Denmark"/>
        <Picker.Item label="Germany" value="Germany"/>
        <Picker.Item label="Netherlands" value="Netherlands"/>
      </Picker>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  picker: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export default TextInputField;