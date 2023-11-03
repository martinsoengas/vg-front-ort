import axios from 'axios';

import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useContext, useState } from 'react';
import { UserContext } from '../../services/userContext';

import { Platform } from 'react-native';

import apiUrl from '../../config/api';

export default ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async () => {
    if (!email || !password || !role)
      return alert('Please fill all the fields');
    try {
      const { data } = await axios.post(`${apiUrl}/${role}s/signin`, {
        email,
        password,
      });

      if (data.failed) {
        return alert(data.failed);
      } else {
        setUser(data);

        alert('You have logged in successfully');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Picker
        selectedValue={role}
        onValueChange={(roleValue) => setRole(roleValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select" value="" />
        <Picker.Item label="User" value="user" />
        <Picker.Item label="Developer" value="developer" />
      </Picker>
      {role && (
        <>
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

          <View style={styles.buttonsContainer}>
            <Button title="Log in" onPress={handleLogin} />
            <Button title="Cancel" onPress={() => setRole('')} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    padding: 15,
    backgroundColor: 'white',
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
  picker: {
    top: parseInt(`${Platform.OS === 'ios' ? -40 : 0}`),
    height: parseInt(`${Platform.OS === 'ios' ? 150 : 50}`),
    marginTop: parseInt(`${Platform.OS === 'ios' ? 0 : 0}`),
  },
});
