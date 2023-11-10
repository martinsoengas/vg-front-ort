import axios from 'axios';
import apiUrl from '../../config/api';

import { useState, useContext, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
      {user && (
        <Text
          style={{
            width: '100%',
            color: 'white',
            textAlign: 'center',
            padding: 10,
            fontSize: 20,
          }}
        >
          Hello {user.companyName ? user.companyName : user?.username || ''}!
        </Text>
      )}
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
