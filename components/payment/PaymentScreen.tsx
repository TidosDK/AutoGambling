import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.applePayButton}>
        <Text style={styles.applePayText}> Pay</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <View style={styles.cardLogos}>
        <Image source={require('../../assets/visa.svg')} style={styles.cardLogo} />
        <Image source={require('../../assets/mastercard.svg')} style={styles.cardLogo} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Card number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="MM / YY"
            keyboardType="numeric"
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVC"
            keyboardType="numeric"
            value={cvc}
            onChangeText={setCvc}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name on card"
          value={name}
          onChangeText={setName}
        />
        <Picker
          selectedValue={country}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
          <Picker.Item label="Select Country" value="" />
          <Picker.Item label="USA" value="usa" />
          <Picker.Item label="Canada" value="canada" />
          <Picker.Item label="UK" value="uk" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.proceedButton}>
        <Text style={styles.proceedText}>PROCEED</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  applePayButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  applePayText: {
    color: '#fff',
    fontSize: 18,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  cardLogos: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardLogo: {
    width: 75,
    height: 70,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  proceedButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    width: 100,
  },
  proceedText: {
    fontSize: 18,
    color: '#333',
  },
});

export default PaymentScreen;
