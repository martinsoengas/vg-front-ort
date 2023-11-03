import { Text, View, StyleSheet, Platform, ScrollView } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import UserSignUpForm from '../UserSignUpForm';
import DevSignUpForm from '../DevSignUpForm';

import { useState } from 'react';

export default ({ navigation }) => {
  const [role, setRole] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Who are you?</Text>

        <Picker
          selectedValue={role}
          onValueChange={(roleValue) => setRole(roleValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select" value="" />

          <Picker.Item label="User" value="user" />
          <Picker.Item label="Developer" value="dev" />
        </Picker>
      </View>

      {role === 'user' && (
        <UserSignUpForm navigation={navigation} setRole={setRole} />
      )}
      {role === 'dev' && (
        <DevSignUpForm navigation={navigation} setRole={setRole} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  picker: {
    top: parseInt(`${Platform.OS === 'ios' ? -40 : 0}`),
    height: parseInt(`${Platform.OS === 'ios' ? 150 : 50}`),
    marginTop: parseInt(`${Platform.OS === 'ios' ? 0 : 0}`),
  },
});
