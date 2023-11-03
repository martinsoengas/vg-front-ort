import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { useContext, useState } from 'react';
import { UserContext } from '../../services/userContext';

import apiUrl from '../../config/api';

export default ({ navigation, setRole }) => {
  const { user, setUser } = useContext(UserContext);

  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!companyName || !email || !password || !confirmPassword)
      return alert('Please fill all required fields');
    try {
      const { data } = await axios.post(`${apiUrl}/developers/signup`, {
        companyName,
        description,
        country,
        email,
        password,
        confirmPassword,
      });

      if (data.failed) {
        return console.log(data.failed);
      } else {
        alert('You have registered successfully, please log in');
        navigation.navigate('LogIn');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Developer Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Company Name *"
        value={companyName}
        onChangeText={setCompanyName}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email *"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password *"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password *"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <View style={styles.buttonsContainer}>
        <Button title="Sign up" onPress={handleSignUp} />
        <Button title="Cancel" onPress={() => setRole('')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
