import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';

export default ({ ratingState, addRating, alreadyRated, updateRating }) => {
  const { rating, setRating } = ratingState;

  const determineCircleColor = (rating) => {
    if (rating >= 7) {
      return '#4CAF50'; // Verde
    } else if (rating >= 5) {
      return '#FFC107'; // Amarillo
    } else {
      return '#FF0000'; // Rojo
    }
  };

  useEffect(() => {
    determineCircleColor(rating);
  }, [rating]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Score</Text>
      <View style={styles.scoreContainer}>
        <View
          style={[
            styles.circle,
            { backgroundColor: determineCircleColor(rating) },
          ]}
        >
          <Text style={styles.scoreNumber}>{rating}</Text>
        </View>
        {!alreadyRated ? (
          <Pressable onPress={() => addRating()}>
            <Text style={styles.rateButton}>Add Rating</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => updateRating()}>
            <Text style={styles.rateButton}>Update Rating</Text>
          </Pressable>
        )}
      </View>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={rating}
        onValueChange={(value) => setRating(value)}
        thumbTintColor="#FFFFFF"
        maximumTrackTintColor="#E8E8E8"
        minimumTrackTintColor={determineCircleColor(rating)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'white',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  rateButton: {
    color: 'white',
    width: 60,
    textAlign: 'center',
    padding: 5,
    marginLeft: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
});
