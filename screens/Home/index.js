import axios from 'axios';
import apiUrl from '../../config/api';

import { useState, useContext, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import Videogames from '../../components/Videogames';
import Navbar from '../../components/Navbar';

import { UserContext } from '../../services/userContext';

export default ({ navigation, route }) => {
  const { user, setUser } = useContext(UserContext);

  const [videogames, setVideogames] = useState([]);

  const getVideogames = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/videogames`);

      setVideogames(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getVideogames();
    }, [])
  );

  return (
    <View style={styles.bodyContainer}>
      <Navbar user={user} setUser={setUser} navigation={navigation} />
      <Videogames videogames={videogames} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
