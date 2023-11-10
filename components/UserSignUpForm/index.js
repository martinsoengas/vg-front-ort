import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { useState } from 'react';

import axios from 'axios';
import apiUrl from '../../config/api';

export default ({ navigation, setRole }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword)
      return alert('Please fill all the fields');
    try {
      const { data } = await axios.post(`${apiUrl}/users/signup`, {
        username,
        email,
        password,
        confirmPassword,
      });

      if (data.failed) {
        return alert(data.failed);
      }

      alert('You have registered successfully, please log in');

      navigation.navigate('LogIn');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Gamer Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
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
