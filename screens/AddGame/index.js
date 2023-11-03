import axios from 'axios';
import apiUrl from '../../config/api';

import { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import Navbar from '../../components/Navbar';

import { UserContext } from '../../services/userContext';

export default ({ navigation }) => {
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');

  const handleCreateGame = async () => {
    const newVideogame = {
      title,
      description,
      genre,
      image,
      developerId: user.id,
    };

    try {
      const { data } = await axios.post(
        `${apiUrl}/videogames/create`,
        newVideogame,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      );

      if (data.failed) {
        return alert('Something went wrong, please try again  ');
      }

      alert('Game created successfully');

      navigation.navigate('Home', { videogame: newVideogame });
    } catch (error) {
      console.log(error);
      alert('Something went wrong, please try again  ');
    }
  };

  return (
    <>
      <Navbar showButtons={false} />
      <View style={styles.container}>
        <Text style={styles.title}>Add new game</Text>
        <TextInput
          style={styles.input}
          placeholder="Title *"
          value={title}
          onChangeText={setTitle}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Description *"
          value={description}
          onChangeText={setDescription}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Genre *"
          value={genre}
          onChangeText={setGenre}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL *"
          value={image}
          onChangeText={setImage}
          keyboardType="default"
        />
        <View style={styles.buttonsContainer}>
          <Button title="Add Game" onPress={handleCreateGame} />
          <Button title="Cancel" onPress={() => navigation.navigate('Home')} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
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
