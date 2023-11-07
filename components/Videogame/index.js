import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import Rating from '../Rating';

import { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import apiUrl from '../../config/api';
import { useFocusEffect } from '@react-navigation/native';

import { UserContext } from '../../services/userContext';

export default ({ navigation, videogame, developer }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [alreadyRated, setAlreadyRated] = useState(false);
  const [ratingId, setRatingId] = useState('');

  const { user } = useContext(UserContext);

  const getRating = async () => {
    const query = `?videogameId=${videogame.id}&developerId=${developer.id}&userId=${user.id}`;

    try {
      const { data } = await axios.get(`${apiUrl}/ratings${query}`);
      if (data.results.length) {
        setAlreadyRated(true);
        setRatingId(data.results[0].id);
        setRating(data.results[0].score);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addRating = async () => {
    const newRating = {
      videogameId: videogame.id,
      userId: user.id,
      score: rating,
      comment,
    };
    try {
      const response = await axios.post(`${apiUrl}/ratings/add`, newRating, {
        headers: { authorization: `Bearer ${user.accessToken}` },
      });
      if (response.status == '201') navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  const updateRating = async () => {
    const updateRating = { score: rating };
    try {
      const response = await axios.post(
        `${apiUrl}/ratings/update/${ratingId}`,
        updateRating,
        {
          headers: { authorization: `Bearer ${user.accessToken}` },
        }
      );
      if (response.status == '200') navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user && !user.companyName) getRating();
    }, [])
  );

  useEffect(() => {}, [rating]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <Image
          style={{ width: '100%', height: 300 }}
          resizeMode="contain"
          source={{
            uri: videogame.image,
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{videogame.title} </Text>
          <Text style={styles.description}>{videogame.description}</Text>
          <Text style={styles.information}>Genre: {videogame.genre} </Text>
          <Text style={styles.information}>
            Developer: {developer.companyName}
          </Text>
          <Text style={styles.information}>Country: {developer.country}</Text>
        </View>
        <Text
          style={[
            styles.rating,
            videogame.averageRating >= 7
              ? { color: 'green' }
              : videogame.averageRating < 7 && videogame.averageRating >= 5
              ? { color: 'yellow' }
              : { color: 'red' },
          ]}
        >
          {videogame.averageRating.toFixed(1)}{' '}
        </Text>
      </View>
      {user && !user.companyName && (
        <View style={styles.rateItContainer}>
          <Text style={styles.rateIt}>Rate it!</Text>
          <Rating
            ratingState={{ rating, setRating }}
            addRating={addRating}
            alreadyRated={alreadyRated}
            updateRating={updateRating}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'white',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
    color: 'white',
    marginBottom: 20,
  },
  information: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: 'white',
  },
  rating: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  rateItContainer: {
    alignItems: 'center',
    width: '100%',
  },
  rateIt: {
    color: 'white',
    fontSize: 20,
  },
});
