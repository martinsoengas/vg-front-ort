import { View, Image, Text, StyleSheet } from 'react-native';

export default ({ videogame }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: '100%',
          height: 150,
        }}
        resizeMode="cover"
        source={{
          uri: videogame.image,
        }}
      />

      <Text
        style={[
          styles.averageRating,
          videogame.averageRating >= 7
            ? { color: 'green' }
            : videogame.averageRating < 7 && videogame.averageRating >= 5
            ? { color: 'yellow' }
            : { color: 'red' },
        ]}
      >
        {videogame.averageRating.toFixed(1)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    padding: 10,
  },
  averageRating: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 5,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
