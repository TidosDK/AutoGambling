import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Text} from 'react-native';

const CardComponent = () => {
    const [text, onChangeText] = React.useState('Name on card');
    const [selectedValue, setSelectedValue] = React.useState('Denmark');
  
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
         <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
         <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
  });

  export default CardComponent;